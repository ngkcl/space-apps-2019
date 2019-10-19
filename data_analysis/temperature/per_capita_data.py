import numpy as np
import matplotlib.pyplot as plt

# parse data from rcp models
country_dat = np.genfromtxt('prod-cons-co2-per-capita.csv',delimiter=',',dtype=np.dtype('a'))

for i, line in enumerate(country_dat):
    name = line[0]
    j = i
    if int(line[2]) == b'2019' and float(line[4]) != 0:
        print(line[0], line[2], line[4])
    elif int(line[2]) == 2016 :
        while country_dat[j][0] == name:
            if float(country_dat[j][4]) != 0.0:
                print (country_dat[j][0].decode('utf-8'),',', int(country_dat[j][2]),',', float(country_dat[j][4]))
                break
            j -= 1
