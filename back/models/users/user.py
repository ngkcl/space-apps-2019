from peewee import *
from playhouse.sqlite_ext import *
from os.path import dirname, abspath
from datetime import date, timedelta
from os import environ

db_type = environ.get("DB", "sqlite")
if db_type == "sqlite":
    from db.sqlite import db
elif db_type == "postgres":
    from db.postgres import db

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


def avgQuery(user_id, category):
    sql = (DataPoint
        .select(fn.Sum(DataPoint.gag).alias('emission_avg'))
        .where(DataPoint.time.between(date.today() - timedelta(days=1), date.today()) & (DataPoint.user == user_id) & (DataPoint.category == category))
        .namedtuples())

    print(sql)
    dataPoints = list(sql)

    print(dataPoints)

    

    return (dataPoints[0].emission_avg or 0) / 7



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
