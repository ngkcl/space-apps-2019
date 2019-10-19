from peewee import *
from playhouse.sqlite_ext import *
import os

db = SqliteDatabase(os.path.dirname(__file__) + 'user.db')

class User(Model):
    username = TextField()
    password = TextField()
    food_emissions = DoubleField()

    class Meta:
        database = db

class DataPoint(Model):
    gag = DoubleField()
    time = DateField()
    user = ForeignKeyField(User, backref='datapoints', lazy_load=False)

    class Meta:
        database = db



if __name__ == "__main__":
    User.create_table()
    DataPoint.create_table()