from datetime import datetime
from . import db, bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    foods = db.relationship('Food', backref='user', lazy=True)  # One-to-Many relationship

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.name}, {self.email}>'

class Food(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # Breakfast, Lunch, or Dinner
    calories = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Float, nullable=False)  # Protein in grams
    carbs = db.Column(db.Float, nullable=False)  # Carbs in grams
    fat = db.Column(db.Float, nullable=False)  # Fat in grams
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow)  # Date food was eaten
    time = db.Column(db.Time, nullable=False, default=datetime.utcnow)  # Time food was eaten
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Foreign key to User

    def __repr__(self):
        return (f'<Food {self.name} ({self.category}) - {self.calories} calories, '
                f'{self.protein}g protein, {self.carbs}g carbs, {self.fat}g fat on '
                f'{self.date} at {self.time}>')
