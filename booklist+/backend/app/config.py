import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or 'postgresql+psycopg2://postgres:tiger7W!@localhost/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS_ORIGINS = os.getenv('CORS_ORIGINS') or '*'

    # SECRET_KEY = os.getenv('SECRET_KEY') or 'your_secret_key_here'