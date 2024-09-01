from flask import Blueprint, request, jsonify
from .models import User, Food
from . import db, bcrypt
from datetime import datetime

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        # Validate input data
        if not name or not email or not password:
            return jsonify({'message': 'Missing required fields'}), 400

        # Check if the user already exists
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({'message': 'User already exists'}), 400

        # Create new user
        new_user = User(name=name, email=email)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created', 'user_id': new_user.id}), 201
    
    except Exception as e:
        print(f"Error during registration: {e}")
        return jsonify({'message': 'An error occurred during registration. Please try again.'}), 500


@auth.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Validate input data
        if not email or not password:
            return jsonify({'message': 'Missing email or password'}), 400

        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({'message': 'An error occurred during login. Please try again.'}), 500


# Add a new food item
@auth.route('/add-food', methods=['POST'])
def add_food():
    try:
        data = request.get_json()
        
        # Validate input data
        required_fields = ['name', 'category', 'calories', 'protein', 'carbs', 'fat', 'date', 'time', 'user_id']
        if not all(field in data for field in required_fields):
            return jsonify({'message': 'Missing required fields'}), 400

        new_food = Food(
            name=data['name'],
            category=data['category'],
            calories=data['calories'],
            protein=data['protein'],
            carbs=data['carbs'],
            fat=data['fat'],
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),  # Ensure proper date format
            time=datetime.strptime(data['time'], '%H:%M').time(),      # Ensure proper time format
            user_id=data['user_id']
        )

        db.session.add(new_food)
        db.session.commit()

        return jsonify({'message': 'Food added successfully', 'food_id': new_food.id}), 201
    
    except Exception as e:
        print(f"Error adding food: {e}")
        return jsonify({'message': 'An error occurred while adding food. Please try again.'}), 500


@auth.route('/get_foods/<int:user_id>', methods=['GET'])
def get_foods(user_id):
    try:
        foods = Food.query.filter_by(user_id=user_id).all()

        if not foods:
            return jsonify({'message': 'No food items found for this user.'}), 404

        food_list = [{
            'name': food.name,
            'category': food.category,
            'calories': food.calories,
            'protein': food.protein,
            'carbs': food.carbs,
            'fat': food.fat,
            'date': food.date.strftime('%Y-%m-%d'),
            'time': food.time.strftime('%H:%M:%S')
        } for food in foods]

        return jsonify(food_list), 200

    except Exception as e:
        print(f"Error fetching foods: {e}")
        return jsonify({'message': 'An error occurred while fetching food items.'}), 500
