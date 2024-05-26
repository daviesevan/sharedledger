from flask import Blueprint


groupBp = Blueprint('group', __name__)

@groupBp.route('/groups', methods=['POST'])
def groups():
    pass