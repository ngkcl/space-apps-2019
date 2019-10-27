from peewee import *
from os.path import dirname, abspath


db = SqliteDatabase(dirname(abspath(__file__)) + '/db.db')
