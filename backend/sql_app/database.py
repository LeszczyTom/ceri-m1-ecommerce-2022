import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()


DB_USER = os.environ.get("DB_USER")
DB_PWD = os.environ.get("DB_PWD")
DB_HOSTNAME = os.environ.get("DB_HOSTNAME")
DB_PORT = os.environ.get("DB_PORT")
DB_SCHEMA = os.environ.get("DB_SCHEMA")

url = (
    "mysql+pymysql://{}:{}@/{}?unix_socket=/cloudsql/ceri-m1-ecommerce-2022:europe-west1:mysql-primary".format(
        DB_USER, DB_PWD, DB_SCHEMA
    )
)


if os.name == "nt":
    print("os is windows")
    url = "mysql://{}:{}@{}:{}/{}".format(
        DB_USER, DB_PWD, DB_HOSTNAME, DB_PORT, DB_SCHEMA
    )


print("url -> ",url)

engine = create_engine(
    url,
    # "mysql://{}:{}@{}:{}/{}".format(DB_USER, DB_PWD, DB_HOSTNAME, DB_PORT, DB_SCHEMA),
    echo=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
