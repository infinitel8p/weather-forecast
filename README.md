# weather-forecast

weather-forecast is a simple weather dashboard that retrieves data from OpenWeatherMap.
The project is built for a Raspberry Pi 5" screen. It includes a custom 3d-printed case with stand.

- Optimized for 800x480 resolution.

<table>
  <tr>
    <td><img width="475" alt="setup_light" src="https://github.com/user-attachments/assets/1fe2862a-85eb-4417-91a3-1b02120567cf" /></td>
    <td><img width="475" alt="setup_dark" src="https://github.com/user-attachments/assets/1a4b3baf-39ef-4886-b1cf-1b8da930e47e" /></td>
  </tr>
  <tr>
    <td><img width="475" alt="index_light" src="https://github.com/user-attachments/assets/08da876a-8af8-47a4-b4b0-412e157b6ac3" /></td>
    <td><img width="475" alt="index_dark" src="https://github.com/user-attachments/assets/77fa143b-2bed-4fd9-88ea-e587f65d7dde" /></td>
  </tr>
</table>

#### Contents:
- [weather-forecast](#weather-forecast)
      - [Contents:](#contents)
  - [How to setup:](#how-to-setup)
  - [High-contrast mode](#high-contrast-mode)
  - [3D-printed case](#3d-printed-case)
  - [Hardware](#hardware)

## How to setup:

1.  Clone the repository

```shell
git clone https://github.com/infinitel8p/weather-forecast.git
```
2. Setup the environment variables in `.env` file
   - `OPENWEATHERMAPONECALL_API_KEY` — [One Call API 3.0](https://openweathermap.org/api/one-call-3) key (used for all weather data and geocoding)
3. Install the dependencies

```shell
npm install
```

## High-contrast mode

For small or low-quality screens (like the Raspberry Pi 5" touchscreen), a high-contrast variant of the day theme is available. Append `?hc` to the URL to activate it:

```
http://localhost:4321/?hc
http://localhost:4321/setup?hc
```

This increases text contrast, makes cards more opaque, deepens borders, and strengthens the geometric background elements for better readability. The night theme is unaffected.

## 3D-printed case
![WhatsApp Image 2025-05-21 at 07 21 03](https://github.com/user-attachments/assets/b5b318ca-4eb3-44ab-b2b0-eb1675a0d4fa)

The case is designed to fit a Raspberry Pi 5" screen. The design files are available on MakerWorld.
- [MakerWorld](https://makerworld.com/de/models/1438574-weather-dashboard-raspberry-pi-5-screen#profileId-1496923)

## Hardware

- Raspberry Pi 4
- 5" HDMI screen such as [this one](https://www.amazon.de/Elecrow-Aufl%C3%B6sung-Touchscreen-Monitor-Raspberry/dp/B013JECYF2)
