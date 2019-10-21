from peewee import *
from playhouse.sqlite_ext import *
import os

productDb = SqliteDatabase(os.path.dirname(__file__) + '/product.db')

class ProductFTS(FTSModel):
    name = TextField()
    class Meta:
        database = productDb

class Product(Model):
    cost = FloatField()

    @staticmethod
    def query(name):
        return (Product.select(Product, ProductFTS)
            .join(ProductFTS, on=(Product.id == ProductFTS.docid))
            .where(ProductFTS.match(name)).dicts())

    @staticmethod
    def getData(name):
        q = (Product.select(Product.cost, ProductFTS.name)
            .join(ProductFTS, on=(Product.id == ProductFTS.docid))
            .where(ProductFTS.match('*' + name.replace(' ', '*') + '*')))

        return list(q.dicts())


    class Meta:
        database = productDb

# Product.create_table()
# ProductFTS.create_table()

def query(name):
    return (Product.select(Product, ProductFTS)
        .join(ProductFTS, on=(Product.id == ProductFTS.docid))
        .where(ProductFTS.match(name)).dicts())

def getData(name):
    return [[i['name'], i['cost']] for i in query('*' + name.replace(' ', '*') + '*')]
