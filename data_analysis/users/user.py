from peewee import *
from playhouse.sqlite_ext import *
from os.path import dirname, abspath


db = SqliteDatabase(dirname(abspath(__file__)) + '/user.db')

class User(Model):
    username = TextField(index=True, unique=True)
    password = TextField()

    class Meta:
        database = db

class DataPoint(Model):
    gag = DoubleField()
    category = TextField()
    time = DateField()
    user = ForeignKeyField(User, backref='datapoints', lazy_load=False)

    class Meta:
        database = db


def avgQuery(user_id, type):
    a=(DataPoint
        .select(fn.Sum(DataPoint.gag).alias('emission_avg'))
        .where(DataPoint.time.between("7daysago", "now") and DataPoint.user == user_id and DataPoint.category == type)
        .dicts())

    b = [i['emission_avg'] for i in a][0] / 7

    return b



if __name__ == "__main__":
    sys.path.append('../')

    from co2.food_test import FoodEmission
    import datetime
    fm = FoodEmission()
    User.create_table()
    DataPoint.create_table()

    User.create(username='Feynman',password='password')

    # for i in range(0,10):
    #     DataPoint.create(gag=fm.calculateSingleEmission('burger'), category='food', time=datetime.datetime.now(),user=0)
