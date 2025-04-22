import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Replace with your actual frontend Render URL!
origins = [
    "http://localhost:3000",  # Add your React app URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allows only specified origins
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/mdb")  # default for local development
client = MongoClient(mongo_url)
db = client.get_database()
coordinates_collection = db.coordinates

class Coordinate(BaseModel):
    lat: float
    lng: float
    number: int

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

@app.post("/coordinates")
def add_coordinate(coordinate: Coordinate):
    coordinates_collection.insert_one(coordinate.dict())  # Insert the coordinate into MongoDB
    return {"message": "Coordinate added successfully!"}

@app.get("/coordinates", response_model=List[Coordinate])
def get_coordinates():
    coordinates = list(coordinates_collection.find())  # Retrieve all coordinates from MongoDB
    return [Coordinate(**coordinate) for coordinate in coordinates]  # Convert MongoDB documents to Pydantic models
