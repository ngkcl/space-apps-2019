class VehicleCalculator():
	flight = 254
	car = 171
	bus = 104
	train = 41
	coach = 27
	walking = 0
	maxWalkSpeed = 9.65606
	maxTrainSpeed = 300

	def __init__(self, distance, time):
		self.distance = distance
		self.speed = distance/time


	def vehicleCalc(self):
		options = []
		if(0 < self.speed < self.maxWalkSpeed):
			options.append("Walking")
		elif(self.maxWalkSpeed <= self.speed < self.maxTrainSpeed):
			options.append("Car")
			options.append("Bus")
			options.append("Train")
		elif(self.maxTrainSpeed <= self.speed):
			options.append("Flight")

		return options

	def polutionCalc(self, vehicle):
		return(self.distance * eval('self.' + vehicle))


vroom = VehicleCalculator(300, 0.03)
print(vroom.vehicleCalc())
print(vroom.polutionCalc("flight"))

