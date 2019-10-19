import numpy as np
import getData from product
import sys

sys.path.append('../')

from user import avgQuery



class FoodEmission():
    '''
    Figure out food contributions to your emission, vs average

    Note - food is around 17% of average emission
    '''

    foodPercent = 0.17
    UK_avg = 8.46 / 365 * 1000



    def burger():
        return getData('beef')[0][1] * 0.2 + getData('bread')[0][1] * 0.1\
         + getData('lettuce')[0][1] * 0.1 + getData('tomato*loose')[0][1] * 0.1

    def chicken():
        return getData('chicken')[0][1] * 0.3 + getData('bread')[0][1] * 0.05 + getData('egg')[0][1] * 0.05

    def tescoMealDeal():
        return getData('bread')[0][1] * 0.1 + getData('chicken')[0][1] * 0.1 + getData('tomato*l')[0][1] * 0.1


    def calculateSingleEmission(foodItem):
        return this[foodItem]()


    def foodAverage():
        meanEmission = foodPercent * UK_avg

        yourMean =
