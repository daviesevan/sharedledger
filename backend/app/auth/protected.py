from flask import Blueprint, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required, 
    get_jwt_identity,
)

protectedBp = Blueprint('protected', __name__)
@protectedBp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(message=f"Access granted for user with ID: {current_user_id}"), 200


@protectedBp.route('/refresh/token', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    return jsonify(access_token=access_token), 200