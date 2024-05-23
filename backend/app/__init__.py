from flask import Flask
from config import ApplicationCofiguration
from app.model import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(ApplicationCofiguration)

    db.init_app(app)
    migrate = Migrate(app, db)
    jwt.init_app(app)

    # Enable CORS for all routes
    CORS(app, supports_credentials=True)

    from app.auth.routes import authBp
    from app.auth.protected import protectedBp
    from app.users.routes import userBp

    app.register_blueprint(authBp, url_prefix='/api/auth')
    app.register_blueprint(protectedBp, url_prefix='/api')
    app.register_blueprint(userBp, url_prefix="/api/u/")

    with app.app_context():
        db.create_all()

    return app
