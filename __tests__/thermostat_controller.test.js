import {Application} from 'stimulus';
import {ThermostatController} from '../src/controllers/thermostat_controller.js';


describe('ThermostatController', () => {
  let defaultTemperature = 80;
  let thermostatContainer;
  let temperatureDisplay;
  let increaseButton;
  let decreaseButton;

  beforeEach(() => {
    document.body.innerHTML = `
    <div data-controller="thermostat" data-thermostat-temperature="${defaultTemperature}">
      <h1 data-target="thermostat.temperature" class="thermostat-temperature"></h1>
      <button data-action="thermostat#decrease"> Decrease </button>
      <button data-action="thermostat#increase"> Increase </button>
    </div>
  `;

    const application = Application.start();
    application.register("thermostat", ThermostatController);

    thermostatContainer = document.body.querySelector('div[data-controller="thermostat"]');
    temperatureDisplay = thermostatContainer.querySelector('h1[data-target="thermostat.temperature"]');
    increaseButton = thermostatContainer.querySelector('button[data-action="thermostat#increase"]');
    decreaseButton = thermostatContainer.querySelector('button[data-action="thermostat#decrease"]');
  })

  test('renders the default temperature', () => {
    expect(temperatureDisplay.textContent).toBe(`${defaultTemperature}°`)
  })

  test('increases the temperature value when increase button is clicked', () => {
    let initTemperatureValue = parseInt(temperatureDisplay.textContent.slice(0, -1));

    expect(initTemperatureValue).toBe(defaultTemperature);

    increaseButton.click();

    let newTemperatureValue = parseInt(temperatureDisplay.textContent.slice(0, -1));

    expect(newTemperatureValue).toBe(initTemperatureValue + 1);
  })

  test('decreases the temperature value when decrease button is clicked', () => {
    let initTemperatureValue = parseInt(temperatureDisplay.textContent.slice(0, -1));

    expect(initTemperatureValue).toBe(defaultTemperature);

    decreaseButton.click();

    let newTemperatureValue = parseInt(temperatureDisplay.textContent.slice(0, -1));

    expect(newTemperatureValue).toBe(initTemperatureValue - 1);
  })

  describe('style change over thresholds', () => {
    test("when it goes over 90 the 'hot' class is added and beneath it is removed", () => {
      thermostatContainer.setAttribute('data-thermostat-temperature', 90);

      expect(temperatureDisplay.classList.contains('hot')).toBe(false);

      increaseButton.click();
      let newTemperatureValue = parseInt(temperatureDisplay.textContent.slice(0, -1));

      expect(newTemperatureValue).toBe(91);
      expect(temperatureDisplay.classList.contains('hot')).toBe(true);

      decreaseButton.click();
      expect(temperatureDisplay.classList.contains('hot')).toBe(false);
    })

    test("when it goes under 70 the 'cold' class is added and over it is removed", () => {
      thermostatContainer.setAttribute('data-thermostat-temperature', 70);

      expect(temperatureDisplay.classList.contains('cold')).toBe(false);

      decreaseButton.click();
      let newTemperatureValue = parseInt(temperatureDisplay.textContent.slice(0, -1));

      expect(newTemperatureValue).toBe(69);
      expect(temperatureDisplay.classList.contains('cold')).toBe(true);

      increaseButton.click();
      expect(temperatureDisplay.classList.contains('cold')).toBe(false);
    })
  })
})

