from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy import create_engine, Integer, String, Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Get environment variables
load_dotenv("../book-finder/.env")

app = Flask(__name__, static_folder='../book-finder/build', static_url_path='')
app.secret_key = os.getenv('SECRET_KEY_FLASK') # Not sure

# To connect to react
CORS(app)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Gets database url to create database
database_url = os.environ.get("DATABASE_URL")
engine = create_engine(database_url)
Base = declarative_base()

# Creates a database from database url and base
class SearchHistory(Base):
    __tablename__ = 'search_history'
    id = Column(Integer, primary_key =True)
    query = Column(String, nullable=False)

Base.metadata.create_all(engine)

# Creates session for database
Session = sessionmaker(bind=engine)
session = Session()

# Saves searches to the database session using post
@app.route('/save-search', methods=['POST'])
def save_search():
    # Gets data as json
    data = request.json
    query = data.get('query')
    if query:
        # Adds new query to database class and commits
        new_search = SearchHistory(query=query)
        session.add(new_search)
        session.commit()
        return jsonify({"message": "Search saved successfully"}), 201
    return jsonify({"error": "Query not provided"}), 400

# Gets search history from axios in react and adds them to a list that is posted to user
@app.route('/get-history', methods=['GET'])
def get_history():
    # Retrieves data in database and stores them in array based on id and query
    searches = session.query(SearchHistory).all()
    search_history = []
    for s in searches:
        search = {"id": s.id, "query": s.query}
        search_history.append(search)
    return jsonify(search_history), 200

if __name__ == '__main__':
    app.run(debug=True)