import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [ "temperature" ];

  connect() {
    this.showCurrentTemperature();
  }

  showCurrentTemperature() {
    this.temperatureTarget.textContent = this.temperature + "°";
  }

  increase() {
    this.temperature++;
  }

  decrease() {
    this.temperature--;
  }

  get temperature() {
    if (!this.data.has("temperature")) {
      this.temperature = "70";
    }

    return parseInt(this.data.get("temperature"));
  }

  set temperature(value) {
    this.data.set("temperature", value);
    this.showCurrentTemperature();
  }

}
