from peewee import *
from playhouse.sqlite_ext import *
from os.path import dirname, abspath



db = SqliteDatabase(dirname(abspath(__file__)) + '/user.db')

class User(Model):
    username = TextField()
    password = TextField()

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


def avgQuery(user_id):
    return (DataPoint
        .select(fn.avg(DataPoint.gag).alias('emission_avg'))
        .where(DataPoint.time.between("7daysago", "now") and DataPoint.user == user_id)
        .dicts()['emission_avg'])
