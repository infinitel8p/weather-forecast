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
  console.log("sunrise:", sunrise);  // e.g., "06:00"
  console.log("sunset:", sunset);    // e.g., "20:15"


  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const getTimePositionIndex = (timeStr) => {
      const [targetHour, targetMin] = timeStr.split(":").map(Number);

      for (let i = 0; i < labels.length - 1; i++) {
        const [currHour] = labels[i].split(":").map(Number);
        const [nextHour] = labels[i + 1].split(":").map(Number);

        if (targetHour >= currHour && targetHour < nextHour) {
          const fraction = (targetHour + targetMin / 60 - currHour) / (nextHour - currHour);
          return i + fraction;
        }
      }
      return labels.length - 1; // fallback if not found
    };
    

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
                size: 18,
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
        annotation: {
          annotations: {
            sunrise: {
              type: 'line',
              xMin: getTimePositionIndex(sunrise),
              xMax: getTimePositionIndex(sunrise),
              borderColor: 'orange',
              borderWidth: 2,
              label: {
                content: '🌅 Sunrise',
                enabled: true,
                position: 'start',
                color: 'orange',
                backgroundColor: 'transparent',
                font: {
                  size: 12,
                  weight: 'bold',
                }
              }
            },
            sunset: {
              type: 'line',
              xMin: getTimePositionIndex(sunset),
              xMax: getTimePositionIndex(sunset),
              borderColor: 'purple',
              borderWidth: 2,
              label: {
                content: '🌇 Sunset',
                enabled: true,
                position: 'start',
                color: 'purple',
                backgroundColor: 'black',
                font: {
                  size: 12,
                  weight: 'bold',
                }
              }
            }
          }
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
