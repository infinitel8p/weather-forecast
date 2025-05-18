import { useEffect, useRef } from "react";
import {
  Chart,
  registerables
} from "chart.js";

Chart.register(...registerables);

export default function WeatherChart({ labels, temperatureData, precipitationData }) {
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
              color: "#fff",
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            backgroundColor: "#1e293b",
            titleColor: "#fff",
            bodyColor: "#e2e8f0",
            borderColor: "#64748b",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#e2e8f0",
              font: {
                size: 15,
              },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          "y-temp": {
            type: "linear",
            position: "left",
            ticks: {
              color: "#e2e8f0",
              font : {
                size: 20,
              },
              callback: function (value) {
                return value + "°C";
              },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
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
              color: "#e2e8f0",
              font: {
                size: 20,
              },
              callback: function (value) {
                return value + "mm";
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
