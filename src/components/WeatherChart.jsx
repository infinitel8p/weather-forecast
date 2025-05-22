import { useEffect, useRef } from "react";
import {
  Chart,
  registerables
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, ChartDataLabels, annotationPlugin);

export default function WeatherChart({ labels, temperatureData, precipitationData, uviData, textColor, sunrise, sunset }) {
  const canvasRef = useRef(null);
  

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

let updatedLabels = [...labels, sunrise, sunset];
updatedLabels.sort((a, b) => timeToMinutes(a) - timeToMinutes(b));

function insertPlaceholders(labels, fullLabels, dataArray) {
  return fullLabels.map(label => {
    const index = labels.indexOf(label);
    return index !== -1 ? dataArray[index] : null;
  });
}

const updatedTemperatureData = insertPlaceholders(labels, updatedLabels, temperatureData);
const updatedPrecipitationData = insertPlaceholders(labels, updatedLabels, precipitationData);
const updatedUviData = insertPlaceholders(labels, updatedLabels, uviData);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: updatedLabels,
        datasets: [
          {
            label: "Temperatur (°C)",
            data: updatedTemperatureData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            yAxisID: "y-temp",
            tension: 0.4,
            fill: true,
            pointRadius: 1,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Niederschlag (mm)",
            data: updatedPrecipitationData,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            yAxisID: "y-precip",
            tension: 0.4,
            fill: true,
            pointRadius: 1,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "UV Index",
            data: updatedUviData,
            borderColor: "rgba(255, 205, 86, 1)",
            backgroundColor: "rgba(255, 205, 86, 0.2)",
            yAxisID: "y-uvi",
            tension: 0.4,
            fill: true,
            pointRadius: 1,
            pointBackgroundColor: "rgba(255, 205, 86, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            labels: {
              color: (() => {
                const [hourStr] = labels[0].split(":");
                const hour = parseInt(hourStr, 10);
                return (hour >= 23 || hour < 7) ? "#ffffff" : "#020618";
              })(),
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: "slategray",
            titleColor: "white",
            bodyColor: "white",
            borderColor: "#64748b",
            borderWidth: 1,
          },
          datalabels: {
            color: (() => {
              const [hourStr] = labels[0].split(":");
              const hour = parseInt(hourStr, 10);
              return (hour >= 23 || hour < 7) ? "#ffffff" : "#020618";
            })(),
            font: {
              size: 18,
              weight: 'bold',
            },
            align: "center",
            formatter: (value) => value,
          },
        },
        scales: {
          x: {
            ticks: {
              color: (() => {
                const [hourStr] = labels[0].split(":");
                const hour = parseInt(hourStr, 10);
                return (hour >= 23 || hour < 7) ? "#ffffff" : "#020618";
              })(),
              font: {
                size: 18,
                weight: "bold",
              },
              callback: function (val, index) {
                const label = this.getLabelForValue(val);
                if (label === sunrise) return 'Tag';
                if (label === sunset) return 'Nacht';
                const [h, m] = label.split(":");
                return h % 2 === 0 ? label : "";
              }
            },
            grid: {
              color: "#1d293d",
            },
          },
          "y-temp": {
            type: "linear",
            position: "left",
            ticks: {
              color: "rgba(255, 99, 132, 1)",
              font : {
                size: 20,
              },
              callback: function (value) {
                return value + "°C";
              },
            },
            grid: {
              color: "#1d293d",
            },
          },
          "y-precip": {
            min: 0,
            type: "linear",
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: "rgba(54, 162, 235, 1)",
              font: {
                size: 20,
              },
              callback: function (value) {
                return value + "mm";
              },
            },
          },
          "y-uvi": {
            min: 0,
            type: "linear",
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: "rgba(255, 205, 86, 1)",
              font: {
                size: 20,
              },
              callback: function (value) {
                return value;
              },
            },
          },
        },
      },
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "200px",
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
