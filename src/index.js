import { Application } from "stimulus"

import { ThermostatController } from "./controllers/thermostat_controller"

const application = Application.start()
application.register("thermostat", ThermostatController)
