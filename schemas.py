#/Application/schemas.py
from pydantic import BaseModel
from typing import List

# Task 3 - Code Here
class UserBase(BaseModel):
    email: str
    username: str
    first_name: str
    last_name: str
    gender: str
    country: str
    isActive: bool
# ------------------------------
class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    
    class Config:
        from_attributes = True
# Task 4 - Code Here
# ------------------------------
'''
├── main.py
├── crud.py
├── database.py
├── models.py
├── schemas.py
│
└── static/
    ├── index.html
    ├── styles.css
    └── scripts.js
'''