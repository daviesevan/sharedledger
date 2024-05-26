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

class SavingsAccount(db.Model):
    id = db.Column(db.String(36), default=generateId, nullable=False, primary_key=True)
    account_name = db.Column(db.String(100), nullable=False)
    account_type = db.Column(db.String(20), nullable=False)  
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)
    goal_amount = db.Column(db.Integer, default=0)  
    goal_date = db.Column(db.Date, nullable=False)
    current_balance = db.Column(db.Integer, default=0)  
    interest_rate = db.Column(db.Integer, default=0)  
    account_owners = db.relationship('AccountOwner', backref='savings_account', lazy='dynamic')

class AccountOwner(db.Model):
    id = db.Column(db.String(36), default=generateId, nullable=False, primary_key=True)
    account_id = db.Column(db.String(36), db.ForeignKey('savings_account.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    ownership_percentage = db.Column(db.Integer, default=100)  # Percentage multiplied by 100
    max_ownership_percentage = db.Column(db.Integer, default=10000)  # 100.00%
    user = db.relationship('User', backref=db.backref('account_ownerships', lazy=True))
    __table_args__ = (
        db.UniqueConstraint('account_id', 'user_id', name='unique_account_owner'),
        db.CheckConstraint(
            "ownership_percentage <= max_ownership_percentage",
            name="ownership_percentage_constraint"
        ),
    )