from flask import Blueprint, jsonify
from app.model import SavingsAccount, AccountOwner
from flask_jwt_extended import jwt_required, get_jwt_identity

reportsBp = Blueprint('reports',__name__, url_prefix="/reports")


@reportsBp.route('/summary',methods=['GET'])
@jwt_required()
def summary():
    user_id = get_jwt_identity()
    # Get the user's savings accounts
    user_accounts = SavingsAccount.query.join(AccountOwner, SavingsAccount.id == AccountOwner.account_id).filter(AccountOwner.user_id == user_id).all()

    total_savings = sum(account.current_balance for account in user_accounts)
    total_interest_earned = sum(account.current_balance * (account.interest_rate / 10000) for account in user_accounts)
    goal_progress = []

    for account in user_accounts:
        goal = {
            'account_name': account.account_name,
            'goal_amount': account.goal_amount,
            'current_amount': account.current_balance,
            'progress_percentage': round((account.current_balance / account.goal_amount) * 100, 2)
        }
        goal_progress.append(goal)

    summary = {
        'total_savings': total_savings,
        'total_interest_earned': total_interest_earned,
        'goal_progress': goal_progress
    }

    return jsonify(summary)
