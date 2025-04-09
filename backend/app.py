from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Input(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"hello": "world"}

@app.post("/api/predict")
def predict(data: Input):
    return {"response": f"You said: {data.message}"}