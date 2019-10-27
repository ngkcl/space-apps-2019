
import numpy as np
from models.products.product import getData
import sys

sys.path.append('../')

from models.users.user import avgQuery

class FoodCalculator():
    '''
    Figure out food contributions to your emission, vs average

    Note - food is around 17% of average emission
    '''

    foodPercent = 0.17
    UK_avg = 8.46 / 365 * 1000


    def beef(self):
        return getData('beef')[0][1]

    def burger(self):
        return getData('beef')[0][1] * 0.2 + getData('bread')[0][1] * 0.1\
         + getData('lettuce')[0][1] * 0.1 + getData('tomato*loose')[0][1] * 0.1

    def chicken(self):
        return getData('chicken')[0][1] * 0.3 + getData('bread')[0][1] * 0.05 + getData('egg')[0][1] * 0.05

    def tescoMealDeal(self):
        return getData('bread')[0][1] * 0.1 + getData('chicken')[0][1] * 0.1 + getData('tomato*l')[0][1] * 0.1

    def tomatoes(self):
        return getData('Tomatoes')[0][1]

    @staticmethod
    def calculateSingleEmission(foodItem, mass):
        return mass * eval("self." + foodItem + "()")

    @staticmethod
    def foodAverage(user_id):
        meanEmission = self.foodPercent * self.UK_avg
        yourMean = avgQuery(user_id, 'eat')

        return (yourMean - meanEmission)/ 1000 * 365 # If you're more efficient than the mean, we reduce your avg emission score

if __name__ == "__main__":
    fm = FoodEmission()
    print(fm.foodAverage(0))
