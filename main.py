from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS configuration
origins = [
        "http://localhost:5174",
        "http://localhost:",
        "https://myfrontenddomain.com",
        ]

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"], # Allow all HTTP methods (GET, POST, PUT, DELETE)
        allow_headers=["*"], # Allow all headers
        )

# Sample data model
class Item(BaseModel):
    name: str
    price: float

# Dummy database (in-memory)
fake_items_db = []

@app.get("/")
async def read_root():
    return {"message": "Welcome to FastAPI Fullstack"}

@app.post("/items/")
async def create_item(item: Item):
    fake_items_db.append(item)
    return item

@app.get("/items/", response_model=List[Item])
async def get_items():
    return fake_items_db
