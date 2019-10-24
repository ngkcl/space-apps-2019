from peewee import *
from os import environ

password = environ["SECRET_PASSWORD"]
host = environ["PSQL_POSTGRESQL_SERVICE_HOST"]
port = environ["PSQL_POSTGRESQL_SERVICE_PORT_POSTGRESQL"]
db = PostgresqlDatabase("default", user="admin", password=password, host=host, port=port)

