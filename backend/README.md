# run local mongo db

docker run --name mongodb -d -p 27017:27017 mongo

# run local backend

uvicorn app:app