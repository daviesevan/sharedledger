from flask_sqlalchemy import SQLAlchemy
from app.utils import generateId
import datetime as datetime

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.String(36), default=generateId, nullable=False, primary_key=True)
    username = db.Column(db.String(36), nullable=False, unique=True)
    email = db.Column(db.String(325), nullable=True, unique=True)
    isEmailVerified = db.Column(db.Boolean, default=False)
    phonenumber = db.Column(db.String(15), nullable=False, unique=True)
    isPhoneNumberVerified = db.Column(db.Boolean, default=False)
    password = db.Column(db.String(325), nullable=False, unique=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)
