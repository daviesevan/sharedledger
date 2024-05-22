from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())

class ApplicationCofiguration:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///sharedledger.db'
    SECRET_KEY = os.getenv('APP_SECRET')
    JWT_SECRET_KEY = os.getenv('APP_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = 900 #15 minutes
    JWT_REFRESH_TOKEN_EXPIRES = 86400 #1 day
