import numpy as np
from product import getData
import sys

sys.path.append('../')

from users.user import avgQuery

class FoodEmission():
    '''
    Figure out food contributions to your emission, vs average

    Note - food is around 17% of average emission
    '''

    foodPercent = 0.17
    UK_avg = 8.46 / 365 * 1000



    def burger(self):
        return getData('beef')[0][1] * 0.2 + getData('bread')[0][1] * 0.1\
         + getData('lettuce')[0][1] * 0.1 + getData('tomato*loose')[0][1] * 0.1

    def chicken(self):
        return getData('chicken')[0][1] * 0.3 + getData('bread')[0][1] * 0.05 + getData('egg')[0][1] * 0.05

    def tescoMealDeal(self):
        return getData('bread')[0][1] * 0.1 + getData('chicken')[0][1] * 0.1 + getData('tomato*l')[0][1] * 0.1


    def calculateSingleEmission(self, foodItem):
        return eval('self.'+foodItem+'()')


    def foodAverage(self, user_id):
        meanEmission = self.foodPercent * self.UK_avg
        yourMean = avgQuery(user_id, 'food')

        return (yourMean - meanEmission)/ 1000 * 365 # If you're more efficient than the mean, we reduce your avg emission score

if __name__ == "__main__":
    fm = FoodEmission()
    print(fm.foodAverage(0))
