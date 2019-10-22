# Footprints

## How am I impacting the environment? Footsteps is an application that seeks to quantify the impact of our daily lifestyle choices on climate change.

![app image](https://sa-2019.s3.amazonaws.com/media/images/Footsteps_VHW0LGd.width-800.jpg)

### Background 

Our project began with the goal to empower people to take steps against climate change in their everyday life. By showing that if enough individuals slightly change their behavior, meaningful differences can be achieved, we hope to dissuade people from losing hope in the face of this immense challenge. 

### What it does 

Our app utilizes inputs from the user and the apps he/she uses daily, to calculate their personal environmental impact. We consider effects such as travel and eating habits to modify a baseline emission level and personalize it for the user, aggregating as much data as possible automatically - for example, by tracking location, it is able to determine if the user entered a food place and ask them about their last meal, or by connecting to your Uber app it can see how often you use the service! It then considers the scenario in which everyone on earth or in your area contributed the same level of emissions and tries to predict the environmental impact. Furthermore, it calculates the year in which global averages will pass the 2 degree Celsius mark, considered to be the critical point for endangerment of humanity. All in all, you get an app that is your go-to hub to answer the question "How am I impacting the environment?" 

### NASA Resources

By utilizing the climate simulations run by NASA at the GISS, we created a statistical model to extrapolate future changes in global temperature based on a given emission level, calculated from applying the users estimated emissions to the world population. The statistical model is based on a discrete integral of the Carbon Dioxide concentration function, which is then compared to similar data sets on which climate simulations were run. It uses this comparison to interpolate temperature predictions from the models run on each data set, producing a final prediction.

### Future Plans

In regards to the future of this project, we want an app that won't only calculate your impact on the environment, but also use machine learning techniques to make a personalized plan on how you can tweak your habits to make an improvement on your carbon footprint and make a daily/weekly report card on all the good/bad things it noticed in your data (this is already available to some capacity in our app), also we would love to add incentive for people to improve such as getting discounts at different places. We hope to upgrade the app to use even more NASA data and consider additional factors from the user when generating a predicted carbon footprint, as well as portraying the data in more intuitive ways. We also look to integrate more and more APIs from popular apps related to travel, eating, and daily life in general, to further automate the collection of data. 

### Built With

The app front-end was developed using React native, due to the ease of use and intuitive user interface potentials. The statistical models were investigated and developed using scientific Python tools, such as Numpy and Scipy, and also Fortran. We therefore decided to create a server-based python back-end using Flask to interface between the app and the final statistical model. Databases for user information were implemented using PeeWee, a lightweight python package for working with MySQL. 

#ClimateChange, #Earth, #ClimateAction, #Python, #ReactNative, #Application, #JavaScript, #React, #Flask, #Fortran, #AI, #ArtificalIntellegence, #GISS, #NASA CO2 data, #Enviornment, #SaveTheEnviornment 