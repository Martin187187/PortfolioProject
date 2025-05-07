import os
import uuid
import time
import random

import uvicorn

print("Starting server...")
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional, Set

from distant_words.EmbeddingLookup import WordListLoader, EmbeddingLookup

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()
# MongoDB setup
mongo_url = os.getenv("MONGO_URL")

client = MongoClient(mongo_url)
db = client.get_database()
coordinates_collection = db.coordinates
stats_collection = db.stats  # <-- New

# In-memory storage for challenges
challenges = {}

# Constants
CHALLENGE_EXPIRATION_SECONDS = 600  # 10 minutes
word_list_loader = WordListLoader("distant_words/4000-most-common-eng.csv")
embedding_file = os.getenv("EMBEDDING_PATH")
embeddings = EmbeddingLookup(embedding_file, word_list_loader)
# Models
class PaginationResponse(BaseModel):
    words: List[str]
    total: int
    page: int
    page_size: int

class ChallengeResponse(BaseModel):
    id: str
    word1: str
    word2: str
    hint: str

class AnswerRequest(BaseModel):
    id: str
    answer: str

class AnswerResponse(BaseModel):
    correct: bool
    hint: str
    correct_word: Optional[str] = None

class StatsResponse(BaseModel):
    total_challenges_created: int
    total_challenges_solved: int
    average_tries: float

# Utility functions

def get_or_create_stats_doc():
    """Ensure stats document exists."""
    stats = stats_collection.find_one({"_id": "global"})
    if not stats:
        stats_collection.insert_one({
            "_id": "global",
            "total_challenges_created": 0,
            "total_challenges_solved": 0,
            "total_tries": 0
        })
        stats = stats_collection.find_one({"_id": "global"})
    return stats

def generate_hint(word: str, revealed_indexes: Set[int]) -> str:
    hint = []
    for i, c in enumerate(word):
        if i in revealed_indexes:
            hint.append(c)
        else:
            hint.append("_")
    return "".join(hint)

def reveal_random_index(current_revealed: Set[int], word: str) -> Set[int]:
    """Reveals one random index, but max 50% revealed."""
    all_indexes = set(range(len(word)))
    unrevealed = list(all_indexes - current_revealed)
    max_reveals = len(word) // 2  # up to 50% of the letters

    if len(current_revealed) >= max_reveals:
        return current_revealed  # Already at 50%

    if unrevealed:
        new_index = random.choice(unrevealed)
        current_revealed.add(new_index)

    return current_revealed

# Endpoints

@app.get("/words", response_model=PaginationResponse)
def get_words(page: int = 1, page_size: int = 20, filter: Optional[str] = Query(None)):
    all_words = word_list_loader.get_words()
    if filter:
        all_words = [w for w in all_words if filter.lower() in w.lower()]

    total = len(all_words)
    start = (page - 1) * page_size
    end = start + page_size
    words_page = all_words[start:end]

    return PaginationResponse(
        words=words_page,
        total=total,
        page=page,
        page_size=page_size
    )

@app.post("/challenge", response_model=ChallengeResponse)
def create_challenge():
    word1 = word_list_loader.get_random_word()
    word2 = word_list_loader.get_random_word()
    while word1 == word2:
        word2 = word_list_loader.get_random_word()

    challenge_id = str(uuid.uuid4())
    challenges[challenge_id] = {
        "words": (word1, word2),
        "timestamp": time.time(),
        "revealed_indexes": set(),
        "tries": 0
    }

    correct_word = embeddings.get_best_common_word(word1, word2)
    hint = generate_hint(correct_word, set())

    # Increment total challenges created
    get_or_create_stats_doc()
    stats_collection.update_one({"_id": "global"}, {"$inc": {"total_challenges_created": 1}})

    return ChallengeResponse(
        id=challenge_id,
        word1=word1,
        word2=word2,
        hint=hint
    )

@app.post("/answer", response_model=AnswerResponse)
def submit_answer(request: AnswerRequest):
    challenge = challenges.get(request.id)
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge ID not found or expired.")

    if time.time() - challenge['timestamp'] > CHALLENGE_EXPIRATION_SECONDS:
        del challenges[request.id]
        raise HTTPException(status_code=410, detail="Challenge expired.")

    challenge['tries'] += 1

    word1, word2 = challenge['words']
    correct_word = embeddings.get_best_common_word(word1, word2)

    if request.answer.lower() == correct_word.lower():
        tries = challenge['tries']
        del challenges[request.id]

        # Update stats for solved challenge
        get_or_create_stats_doc()
        stats_collection.update_one(
            {"_id": "global"},
            {"$inc": {"total_challenges_solved": 1, "total_tries": tries}}
        )

        return AnswerResponse(
            correct=True,
            hint=correct_word,
            correct_word=correct_word
        )
    else:
        # Wrong answer: reveal one random unrevealed letter
        revealed = challenge['revealed_indexes']
        revealed = reveal_random_index(revealed, correct_word)
        challenge['revealed_indexes'] = revealed
        hint = generate_hint(correct_word, revealed)

        return AnswerResponse(
            correct=False,
            hint=hint
        )

@app.get("/stats", response_model=StatsResponse)
def get_stats():
    stats = get_or_create_stats_doc()
    total_challenges_created = stats.get("total_challenges_created", 0)
    total_challenges_solved = stats.get("total_challenges_solved", 0)
    total_tries = stats.get("total_tries", 0)

    average_tries = (total_tries / total_challenges_solved) if total_challenges_solved > 0 else 0.0

    return StatsResponse(
        total_challenges_created=total_challenges_created,
        total_challenges_solved=total_challenges_solved,
        average_tries=round(average_tries, 2)
    )

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
