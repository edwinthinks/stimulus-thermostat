import { Controller } from "stimulus";

class ThermostatController extends Controller {
  static targets = [ "temperature" ];

  connect() {
    this.showCurrentTemperature();
  }

  showCurrentTemperature() {
    this.temperatureTarget.textContent = this.temperature + "°";
  }

  updateTemperatureColorDisplay() {
    if (this.temperature > 90) {
      this.temperatureTarget.classList.toggle("hot", true);
      this.temperatureTarget.classList.toggle("cold", false);
    } else if (this.temperature < 70) {
      this.temperatureTarget.classList.toggle("hot", false);
      this.temperatureTarget.classList.toggle("cold", true);
    } else {
      this.temperatureTarget.classList.toggle("hot", false);
      this.temperatureTarget.classList.toggle("cold", false);
    }
  }

  increase() {
    this.temperature++;
  }

  decrease() {
    this.temperature--;
  }

  get temperature() {
    if (!this.data.has("temperature")) {
      this.temperature = this.defaultTemperature;
    }

    return parseInt(this.data.get("temperature"));
  }

  set temperature(value) {
    this.data.set("temperature", value);
    this.showCurrentTemperature();
    this.updateTemperatureColorDisplay();
  }

  get defaultTemperature() {
    return "75";
  }

}

export { ThermostatController }
