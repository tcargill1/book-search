database_url = os.getenv("DATABASE_URL")

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
db = SQLAlchemy(app)