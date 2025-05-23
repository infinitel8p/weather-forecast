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

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    function roundToNearestHour(timeStr) {
      const [h, m] = timeStr.split(":").map(Number);
      const roundedHour = m >= 30 ? h + 1 : h;
      return String(roundedHour).padStart(2, "0") + ":00";
    }
    

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
          {
            label: "Sonnenaufgang",
            borderColor: "#FF6F61",
            backgroundColor: "rgba(255, 111, 97, 0.2)", 
            yAxisID: "y-uvi",
          },
          {
            label: "Sonnenuntergang",
            borderColor: "#1E90FF",
            backgroundColor: "rgba(30, 144, 255, 0.2)",
            yAxisID: "y-uvi",
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
          annotation: {
            annotations: {
              verticalLine13: {
                type: "line",
                scaleID: 'x',
                value: roundToNearestHour(sunrise),
                borderColor: '#FF6F61',
                borderWidth: 2,
              },
              verticalLine14: {
                type: 'line',
                scaleID: 'x',
                value: roundToNearestHour(sunset),
                borderColor: '#1E90FF',
                borderWidth: 2,
              },
            }
          }
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
                size: 24,
                weight: "bold",
              },
              callback: function (val, index) {
                // Show every second label (0-based index)
                return index % 2 === 0 ? this.getLabelForValue(val) : '';
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
                size: 24,
              },
              callback: function (value) {
                return value + "°C";
              },
            },
            grid: {
              color: "#1d293d",
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
                size: 24,
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
        height: "240px",
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
