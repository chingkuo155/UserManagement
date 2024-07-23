#/Application/main.py

from fastapi import FastAPI
from fastapi.responses import RedirectResponse, FileResponse
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from sqlalchemy.orm import Session
from typing import List
import crud as crudsd
import models as models
import schemas

# Task 5 - Import Here
from database import SessionLocal, engine
# ---------------------------------
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse('static/index.html')

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def docs_redirect():
    response = RedirectResponse(url="/docs")
    return response

# Task 5 - Code here
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# ------------------------------
# Task 6 - Code Here
@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crudsd.get_users(db, skip=skip, limit=limit)
    return users
# ------------------------------
# Task 7 - Code Here
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crudsd.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
# ------------------------------
# Task 8 - Code Here
@app.get("/users/email/{user_email}", response_model=schemas.User)
def read_user_by_email(user_email: str, db: Session = Depends(get_db)):
    db_user = crudsd.get_user_by_email(db, email=user_email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
# ------------------------------
# Task 9 - Code Here
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crudsd.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crudsd.create_user(db=db, user=user)
# ------------------------------
# Task 10 - Code Here
@app.put("/users/", response_model=schemas.User)
def update_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crudsd.get_user_by_email(db, email=user.email)
    if db_user:
        return crudsd.update_user(db=db, user=user)
    raise HTTPException(status_code=400, detail="User not Found")
# ------------------------------
# Task 11 - Code Here
@app.delete("/users/{user_id}", response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crudsd.delete_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
# ------------------------------
@app.get("/users/email/{user_email}", response_model=schemas.User)
def read_user_by_email(user_email: str, db: Session = Depends(get_db)):
    db_user = crudsd.get_user_by_email(db, email=user_email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user