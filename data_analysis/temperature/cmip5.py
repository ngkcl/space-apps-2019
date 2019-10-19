import numpy as np
import matplotlib.pyplot as plt

# parse data from rcp models
rcp2 = np.genfromtxt('rcp2.6.txt')
rcp4 = np.genfromtxt('rcp4.5.txt')
rcp6 = np.genfromtxt('rcp6.0.txt')
rcp8 = np.genfromtxt('rcp8.5.txt')

gasLevels = [rcp2,rcp4,rcp6,rcp8]

# get predicted temperatures for 2050, 100, 200, 300, 400, 500
temp = np.genfromtxt('temp_increase.txt')

# get population consumption data

popConsumption = np.genfromtxt('consumption_per_capita.txt', delimiter=',',dtype=np.dtype('a'))


currentCO2 = [2019,407]


# average carbon footprint per person (in tonnes)
singleEmission = 5

# get mass of atmosphere to estimate ppm of CO2

atmMass = 5.1e15

# get polluting world population (rough estimate of total consumer pollution abt. 1/3?)

pop = 7.7e9

yearlyInc = pop * singleEmission / atmMass * 1e6


# Plot CO2 data

def plotCO2():
    for i in gasLevels:
        plt.plot([j[0] for j in i], [j[1] for j in i])

    plt.plot(currentCO2[0],currentCO2[1],'kx')

    # Plot estimated increase from current conditions
    plt.plot([currentCO2[0], 2100],[currentCO2[1], currentCO2[1] + yearlyInc * (2100 - currentCO2[0])], 'k--')


# given a certain year & CO2 emission curve, what is the expected temperature increase?

def estimateDeltaT(year, function):
    # The temperature increase will actually be proportional to the integral of the CO2 concentration
    curveIntegral = [0,0,0,0]
    for i, curve in enumerate(gasLevels):
        # Note curve[0][0] = 1850
        for j in range(currentCO2[0] - 1850, year-1850 + 1):
            curveIntegral[i] += curve[j][1]

    # Now integrate the function
    fxnIntegral = 0
    for i in range(currentCO2[0], year + 1):
        #print(function(i))
        fxnIntegral += function(i)

    # Now, use a polynomial regression to fit the data - we lerp between the two closest temperatures
    # print(fxnIntegral)
    # print(curveIntegral)
    # print([np.interp(year, [2050, 2100, 2200, 2300, 2400, 2500], i) for i in temp])

    coeff = np.polyfit(curveIntegral, [np.interp(year, [2000, 2050, 2100, 2200, 2300, 2400, 2500], i) for i in temp], 1)
    return np.poly1d(coeff)(fxnIntegral)

    #return np.interp(fxnIntegral,curveIntegral,[np.interp(year, [2050, 2100, 2200, 2300, 2400, 2500], i) for i in temp])

#estimateDeltaT(2019, lambda x : pop * 10 / atmMass * 1e6 * (x - 2019) + currentCO2[1])
#plt.plot([i for i in range(0,20)], [estimateDeltaT(2140, lambda x : pop * i / atmMass * 1e6 * (x - 2019) + currentCO2[1]) for i in range(0,20)])

def extrapolateDeltaT(year, function):
    return [estimateDeltaT(i, function) for i in range(currentCO2[0], year + 1)]


def nationDeltaT(nation, year):
    consumption = 0
    for nationLine in popConsumption:
        if (nation.lower()) == (nationLine[0].decode('utf-8').lower()):
            consumption = float(nationLine[2])
            break

    print(consumption)
    return [estimateDeltaT(i, lambda x : pop * consumption / atmMass * 1e6 * (x - 2019) + currentCO2[1] ) for i in range(currentCO2[0], year + 1)]


yearlyInc = 2.3

#plt.plot([i for i in range(2019,2401)], extrapolateDeltaT(2400, lambda x : yearlyInc * (x - 2019) + currentCO2[1]), 'k', label='Prediction for given footprint')

plt.plot([i for i in range(2019,2401)], nationDeltaT('bulgaria',2400), 'k', label='Prediction for given footprint')


plt.plot([2000, 2050, 2100, 2200, 2300, 2400, 2500], temp[3], 'r', label='Worst-case (RCP8.5)')
plt.plot([2000, 2050, 2100, 2200, 2300, 2400, 2500], temp[0], 'b',label='Best-case (RCP2.6)')

plt.xlabel('Year')
plt.ylabel('Abnormal Temperature increase from mean for 1965-2000')
plt.legend()

plt.show()
