class VehicleCalculator():
	flight = 254
	car = 171
	bus = 104
	train = 41
	coach = 27
	walking = 0
	maxWalkSpeed = 9.65606
	maxTrainSpeed = 300

	@staticmethod
	def vehicleCalc(distance, time):
		hourtime = time / 3600
		speed = distance/hourtime
		options = []
		if(0 < speed < VehicleCalculator.maxWalkSpeed):
			options.append("Walking")
		elif(VehicleCalculator.maxWalkSpeed <= speed < VehicleCalculator.maxTrainSpeed):
			options.append("Car")
			options.append("Bus")
			options.append("Train")
			options.append("Coach")
		elif(VehicleCalculator.maxTrainSpeed <= speed):
			options.append("Flight")

		return options

	@staticmethod
	def polutionCalc(vehicle, distance):
		return(distance * eval('VehicleCalculator.'+ vehicle.lower()))


