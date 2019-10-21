from models.users.user import avgQuery


class VehicleCalculator():
	"""note, this is g/km"""
	plane = 254
	car = 171
	bus = 104
	tube = 41
	coach = 27
	walking = 0
	maxWalkSpeed = 9.65606
	maxTrainSpeed = 300
	transportPercent = 0.27
	UK_avg = 8.46 / 365

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

	@staticmethod
	def vehicleAvg(user_id):
		# transport accounts for 27% of per person emissions
		meanEmission = VehicleCalculator.transportPercent * VehicleCalculator.UK_avg
		yourMean = avgQuery(user_id, 'commute')
		return yourMean / 1e6 - meanEmission
