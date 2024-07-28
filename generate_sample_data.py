# generate_sample_data.py

import random
from faker import Faker
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import schemas
import crud

fake = Faker()

db = SessionLocal()

def generate_random_user():
    return schemas.UserCreate(
        email=fake.email(),
        username=fake.user_name(),
        password=fake.password(),
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        gender=random.choice(['Male', 'Female', 'Other']),
        country=fake.country(),
        isActive=random.choice([True, False])
    )

def create_sample_data(num_users=50):
    for _ in range(num_users):
        user = generate_random_user()
        crud.create_user(db, user)
    print(f"{num_users} sample users have been created.")

if __name__ == "__main__":
    models.Base.metadata.create_all(bind=engine)
    create_sample_data()
    db.close()