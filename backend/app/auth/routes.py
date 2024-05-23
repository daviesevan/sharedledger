from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,

)
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import UnmappedInstanceError
from app.model import db, User
from .utils import *

authBp = Blueprint('auth', __name__)


@authBp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        errors = []

        if not email:
            errors.append('Email is required')

        if not password:
            errors.append('Password is required')

        if errors:
            return jsonify(errors=errors), 400

        user = User.query.filter(User.email == email).first()

        if not user:
            return jsonify(error='Invalid email'), 401

        if not verify_password(password, user.password):
            return jsonify(error='Invalid password'), 401

        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        return jsonify(access_token=access_token, refresh_token=refresh_token), 200

    except IntegrityError as e:
        db.session.rollback()
        return jsonify(error=f'An error occurred {e}'), 500

    except UnmappedInstanceError as e:
        db.session.rollback()
        return jsonify(error='Invalid input data'), 400

    except Exception as e:
        db.session.rollback()
        return jsonify(error=f'An error occurred {e}'), 500


@authBp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        phonenumber = data.get('phonenumber')
        errors = []

        if not username:
            errors.append('Username is required')
        elif not isInputSanitized(username):
            errors.append("Invalid username")

        if not email:
            errors.append("Email is required")
        elif not isEmailValid(email):
            errors.append('Invalid Email')

        if not password:
            errors.append('Password is required')

        if not phonenumber:
            errors.append('Phonenumber is required')
        elif not isPhonenumberValid(phonenumber):
            errors.append("Invalid phonenumber")

        if errors:
            return jsonify(errors=errors), 400

        hashed_password = hash_password(password)
        user = User(username=username, email=email, password=hashed_password, phonenumber=phonenumber)
        db.session.add(user)
        db.session.commit()

        return jsonify(message="User created successfully!"), 201

    except IntegrityError as e:
        db.session.rollback()
        if 'username' in str(e.orig):
            return jsonify(error='Username already exists'), 409
        elif 'email' in str(e.orig):
            return jsonify(error='Email already exists'), 409
        elif 'phonenumber' in str(e.orig):
            return jsonify(error='Phone number already exists'), 409
        else:
            return jsonify(error='An error occurred'), 500

    except UnmappedInstanceError as e:
        db.session.rollback()
        return jsonify(error='Invalid input data'), 400

    except Exception as e:
        db.session.rollback()
        return jsonify(error='An error occurred'), 500


