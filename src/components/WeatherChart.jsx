import { useEffect, useRef } from "react";
import {
  Chart,
  registerables
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels);

export default function WeatherChart({ labels, temperatureData, precipitationData, uviData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperatur (°C)",
            data: temperatureData,
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
            data: precipitationData,
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
            data: uviData,
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
              color: "#020618",
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            backgroundColor: "#1e293b",
            titleColor: "#020618",
            bodyColor: "#020618",
            borderColor: "#64748b",
            borderWidth: 1,
          },
          datalabels: {
            color: "#020618",
            font: {
              size: 16,
              weight: 'bold',
            },
            align: "center",
            formatter: (value) => value,
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#020618",
              font: {
                size: 15,
              },
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
        height: "300px",
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
