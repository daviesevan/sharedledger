from flask import Blueprint, jsonify
from app.model import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity

userBp = Blueprint('user', __name__)

@userBp.route('/user', methods=['GET'])
@jwt_required()
def user():
    # Get the identity of the currently logged-in user
    user_id = get_jwt_identity()

    # Query the user from the database
    user = User.query.filter_by(id=user_id).first()

    if user:
        # Return the user's name and email
        return jsonify({
            'name': user.username,
            'email': user.email
        }), 200
    else:
        # Return an error if the user is not found
        return jsonify({'message': 'User not found'}), 404
