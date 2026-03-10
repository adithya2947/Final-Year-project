import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({
        'message': 'Backend API is running on Vercel',
        'status': 'active'
    })

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': '2024-01-01T00:00:00Z'
    })

@app.route('/api/users')
def get_users():
    return jsonify([
        {'id': 1, 'username': 'testuser', 'email': 'test@example.com'},
        {'id': 2, 'username': 'demo', 'email': 'demo@example.com'}
    ])

@app.route('/api/analytics')
def get_analytics():
    return jsonify([
        {'metric_name': 'page_views', 'value': 150, 'timestamp': '2024-01-01T00:00:00Z'},
        {'metric_name': 'users', 'value': 25, 'timestamp': '2024-01-01T00:00:00Z'}
    ])

@app.route('/api/dashboard/stats')
def dashboard_stats():
    return jsonify({
        'total_users': 2,
        'total_analytics_points': 2,
        'last_updated': '2024-01-01T00:00:00Z'
    })

@app.route('/api/recommendations')
def recommendations():
    return jsonify([
        {
            'id': 1,
            'title': 'Optimize Database Queries',
            'description': 'Consider adding indexes to frequently queried columns',
            'priority': 'high'
        }
    ])

# Vercel serverless function handler
def handler(request):
    return app(request.environ, lambda status, headers: None)

if __name__ == '__main__':
    app.run(debug=True)
