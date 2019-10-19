import numpy as np
import matplotlib.pyplot as plt


class CMIP5:
    """docstring for cmip5."""

    gasLevels=[] # RCP models
    popConsumption=[] # Per capita country consumption data
    currentCO2=[2019,407] # Current year and CO2 levels (ppm)
    temp = [] # Temperature difference for each RCP model

    # get mass of atmosphere to estimate ppm of CO2
    atmMass = 5.1e15

    # get world population
    pop = 7.7e9 / 3

    def __init__(self):
        rcp2 = np.genfromtxt('rcp2.6.txt')
        rcp4 = np.genfromtxt('rcp4.5.txt')
        rcp6 = np.genfromtxt('rcp6.0.txt')
        rcp8 = np.genfromtxt('rcp8.5.txt')

        self.gasLevels = [rcp2,rcp4,rcp6,rcp8]

        self.temp = np.genfromtxt('temp_increase.txt')
        self.popConsumption = np.genfromtxt('consumption_per_capita.txt', delimiter=',',dtype=np.dtype('a'))


    def estimateDeltaTFxn(self, year, function):
        # The temperature increase will actually be proportional to the integral of the CO2 concentration
        curveIntegral = [0,0,0,0]
        for i, curve in enumerate(self.gasLevels):
            # Note curve[0][0] = 1850
            for j in range(self.currentCO2[0] - 1850, year-1850 + 1):
                curveIntegral[i] += curve[j][1]

        # Now integrate the function
        fxnIntegral = 0
        for i in range(self.currentCO2[0], year + 1):
            fxnIntegral += function(i)

        # Use a linear regression to get a temperature fit
        coeff = np.polyfit(curveIntegral, [np.interp(year, [2000, 2050, 2100, 2200, 2300, 2400, 2500], i) for i in self.temp], 1)
        return np.poly1d(coeff)(fxnIntegral)



    def extrapolateDeltaTFxn(self, year, function):
        return [self.estimateDeltaTFxn(i, function) for i in range(self.currentCO2[0], year + 1)]


    def nationDeltaT(self, nation, year):
        '''
        Returns a 2xN array with years and estimated DeltaT up to 'year' if, per capita, the whole world emitted like nation
        '''
        consumption = 0
        for nationLine in self.popConsumption:
            if (nation.lower()) == (nationLine[0].decode('utf-8').lower()):
                consumption = float(nationLine[2])
                break

        print(consumption)
        return [[i for i in range(self.currentCO2[0],year+1)], [self.estimateDeltaTFxn(i, lambda x : self.pop * consumption / self.atmMass * 1e6 * (x - 2019) + self.currentCO2[1] ) for i in range(self.currentCO2[0], year + 1)]]

    def extrapolateDeltaT(self, emission, year):
        '''
        Returns a 2xN array with years & estimated deltaT for a given per-person 'emission', from present to year
        '''

        return[[i for i in range(self.currentCO2[0],year+1)], self.extrapolateDeltaTFxn(year, lambda x : self.pop * emission / self.atmMass * 1e6 * (x - self.currentCO2[0]) + self.currentCO2[1])]


    def worstCase(self,year):
        '''
        Returns a 2xN array with years and worst case scenario from model (largest DeltaT)
        '''
        return [[i for i in range(self.currentCO2[0],year+1)], [np.interp(i, [2000, 2050, 2100, 2200, 2300, 2400, 2500], self.temp[3]) for i in range(self.currentCO2[0],year+1)]]

    def bestCase(self,year):
        '''
        Returns a 2xN array with years and best case scenario from model (smallest DeltaT)
        '''
        return [[i for i in range(self.currentCO2[0],year+1)], [np.interp(i, [2000, 2050, 2100, 2200, 2300, 2400, 2500], self.temp[0]) for i in range(self.currentCO2[0],year+1)]]


### Test the code


if __name__ == '__main__':

    myModel = CMIP5()
    data = myModel.nationDeltaT('italy',2400)

    plt.plot(data[0],data[1])

    worst = myModel.worstCase(2400)
    plt.plot(worst[0], worst[1], 'r', label='Worst-case (RCP8.5)')

    best = myModel.bestCase(2400)
    plt.plot(best[0], best[1], 'b',label='Best-case (RCP2.6)')

    plt.xlabel('Year')
    plt.ylabel('Abnormal Temperature increase from mean for 1965-2000')
    plt.legend()

    plt.show()