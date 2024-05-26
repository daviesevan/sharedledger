from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.model import db, User, SavingsAccount, AccountOwner
from sqlalchemy.exc import IntegrityError
from datetime import datetime

savings_account_bp = Blueprint('savings_account', __name__, url_prefix='/savings/accounts')

@savings_account_bp.route('/create', methods=['POST'])
@jwt_required()
def create_savings_account():
    data = request.get_json()

    # Validate the request data
    required_fields = ['account_name', 'account_type', 'goal_amount', 'goal_date']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Create a new savings account
        account = SavingsAccount(
            account_name=data['account_name'],
            account_type=data['account_type'],
            goal_amount=data['goal_amount'],
            goal_date=datetime.strptime(data['goal_date'], '%Y-%m-%d').date()
        )
        db.session.add(account)
        db.session.commit()

        # Add the current user as the primary account owner
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            db.session.rollback()
            return jsonify({'error': 'User not found'}), 404

        account_owner = AccountOwner(account_id=account.id, user_id=user.id, ownership_percentage=100.0)
        db.session.add(account_owner)
        db.session.commit()

        return jsonify({'message': 'Savings account created successfully', 'account_id': account.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@savings_account_bp.route('/<account_id>/co-owners', methods=['POST'])
@jwt_required()
def add_co_owner(account_id):
    data = request.get_json()

    # Validate the request data
    if 'co_owner_email' not in data:
        return jsonify({'error': 'Missing co_owner_email field'}), 400

    try:
        # Check if the savings account exists
        account = SavingsAccount.query.get(account_id)
        if not account:
            return jsonify({'error': 'Savings account not found'}), 404

        # Check if the maximum number of account owners has been reached
        if account.account_owners.count() >= 6:
            return jsonify({'error': 'Maximum number of account owners reached'}), 400

        # Check if the co-owner user exists
        co_owner = User.query.filter_by(email=data['co_owner_email']).first()
        if not co_owner:
            return jsonify({'error': 'Co-owner user not found'}), 404

        # Check if the co-owner is already an account owner
        if AccountOwner.query.filter_by(account_id=account_id, user_id=co_owner.id).first():
            return jsonify({'error': 'User is already an account owner'}), 400

        # Calculate new ownership percentages
        current_owners = account.account_owners.count()
        new_ownership_percentage = 100.0 / (current_owners + 1)
        for owner in account.account_owners:
            owner.ownership_percentage = new_ownership_percentage
        db.session.commit()

        # Add the user as a co-owner
        account_owner = AccountOwner(account_id=account_id, user_id=co_owner.id, ownership_percentage=new_ownership_percentage)
        db.session.add(account_owner)
        db.session.commit()

        return jsonify({'message': 'Co-owner added successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@savings_account_bp.route('/<account_id>/deposit', methods=['POST'])
@jwt_required()
def deposit_money(account_id):
    data = request.get_json()

    # Validate the request data
    if 'amount' not in data:
        return jsonify({'error': 'Missing amount field'}), 400

    try:
        # Check if the savings account exists
        account = SavingsAccount.query.get(account_id)
        if not account:
            return jsonify({'error': 'Savings account not found'}), 404

        # Check if the user is an account owner
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        account_owner = AccountOwner.query.filter_by(account_id=account_id, user_id=user_id).first()
        if not account_owner:
            return jsonify({'error': 'User is not an account owner'}), 403

        # Validate the deposit amount
        amount = data['amount']
        if amount <= 0:
            return jsonify({'error': 'Deposit amount must be greater than zero'}), 400

        # Update the savings account balance
        account.current_balance += amount
        db.session.commit()

        return jsonify({
            'message': 'Deposit successful',
            'current_balance': account.current_balance,
            'goal_progress': account.current_balance / account.goal_amount * 100
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
