from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000'])

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

class AnalyticsData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    metric_name = db.Column(db.String(100), nullable=False)
    value = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'metric_name': self.metric_name,
            'value': self.value,
            'timestamp': self.timestamp.isoformat()
        }

# Routes
@app.route('/')
def home():
    return jsonify({
        'message': 'Flask Backend API is running',
        'version': '1.0.0',
        'status': 'active'
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'database': 'connected' if db.engine else 'disconnected'
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or 'username' not in data or 'email' not in data:
        return jsonify({'error': 'Username and email are required'}), 400
    
    user = User(username=data['username'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    
    return jsonify(user.to_dict()), 201

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    analytics = AnalyticsData.query.order_by(AnalyticsData.timestamp.desc()).limit(100).all()
    return jsonify([data.to_dict() for data in analytics])

@app.route('/api/analytics', methods=['POST'])
def create_analytics():
    data = request.get_json()
    
    if not data or 'metric_name' not in data or 'value' not in data:
        return jsonify({'error': 'Metric name and value are required'}), 400
    
    analytics = AnalyticsData(
        metric_name=data['metric_name'],
        value=data['value']
    )
    db.session.add(analytics)
    db.session.commit()
    
    return jsonify(analytics.to_dict()), 201

@app.route('/api/dashboard/stats')
def dashboard_stats():
    total_users = User.query.count()
    total_analytics = AnalyticsData.query.count()
    
    return jsonify({
        'total_users': total_users,
        'total_analytics_points': total_analytics,
        'last_updated': datetime.utcnow().isoformat()
    })

@app.route('/api/recommendations')
def get_recommendations():
    # Sample recommendations - replace with actual logic
    recommendations = [
        {
            'id': 1,
            'title': 'Optimize Database Queries',
            'description': 'Consider adding indexes to frequently queried columns',
            'priority': 'high'
        },
        {
            'id': 2,
            'title': 'Update Dependencies',
            'description': 'Some packages have security updates available',
            'priority': 'medium'
        }
    ]
    return jsonify(recommendations)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
