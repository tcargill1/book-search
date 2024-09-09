from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Integer, String, Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import inspect
from datetime import datetime
import os

# Get environment variables
load_dotenv("../book-finder/.env")

app = Flask(__name__, static_folder='../book-finder/build', static_url_path='')
app.secret_key = os.getenv('SECRET_KEY_FLASK') # Not sure

# To connect to react
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Gets database url to create database
database_url = os.getenv("DATABASE_URL")

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
db = SQLAlchemy(app)

# Define your models here
class SearchHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    search_query = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# Check if the 'search_history' table exists before creating it
with app.app_context():
    inspector = inspect(db.engine)
    if not inspector.has_table('search_history'):
        db.create_all()

# Saves searches to the database session using post
@app.route('/save-search', methods=['POST'])
def save_search():
    # Gets data as json
    data = request.json
    query = data.get('query')
    if query:
        # Adds new query to database class and commits
        new_search = SearchHistory(search_query=query)
        db.session.add(new_search)
        db.session.commit()
        return jsonify({"message": "Search saved successfully"}), 201
    return jsonify({"error": "Query not provided"}), 400

# Gets search history from axios in react and adds them to a list that is posted to user
@app.route('/get-history', methods=['GET'])
def get_history():
    # Retrieves data in database and stores them in array based on id and query
    searches = SearchHistory.query.order_by(SearchHistory.timestamp.desc()).all()
    search_history = []
    for s in searches:
        search = {"id": s.id, "query": s.search_query, "timestamp": s.timestamp}
        search_history.append(search)
    return jsonify(search_history), 200

@app.route("/favicon.ico")
def favicon():
    return "", 200

if __name__ == '__main__':
    """app.run(debug=True)"""
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))