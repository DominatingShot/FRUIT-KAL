from flask import Blueprint, request, jsonify
from .models import User
from .__init__ import db

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Check if email and password are provided
        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400

        # Check if the user already exists
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({'message': 'User already exists'}), 400

        # Create a new user
        new_user = User(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201
    
    except Exception as e:
        # Catch any unexpected errors and log them
        print(f"Error: {e}")
        return jsonify({'message': 'An error occurred. Please try again.'}), 500


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if the user exists
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
