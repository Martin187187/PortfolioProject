from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Replace with your actual frontend Render URL!
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allows only specified origins
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define your endpoints after this
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}