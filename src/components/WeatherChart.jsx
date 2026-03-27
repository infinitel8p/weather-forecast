import { useEffect, useRef } from "react";
import {
  Chart,
  registerables
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, ChartDataLabels, annotationPlugin);

export default function WeatherChart({ labels, temperatureData, precipitationData, uviData, sunrise, sunset }) {
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
            label: "Temp °C",
            data: temperatureData,
            borderColor: "rgba(248, 113, 113, 0.7)",
            backgroundColor: "rgba(248, 113, 113, 0.06)",
            yAxisID: "y-temp",
            tension: 0.4,
            fill: true,
            pointRadius: 0.75,
            borderWidth: 1.5,
          },
          {
            label: "Regen mm",
            data: precipitationData,
            borderColor: "rgba(56, 189, 168, 0.6)",
            backgroundColor: "rgba(56, 189, 168, 0.06)",
            yAxisID: "y-precip",
            tension: 0.4,
            fill: true,
            pointRadius: 0.75,
            borderWidth: 1.5,
          },
          {
            label: "UV",
            data: uviData,
            borderColor: "rgba(250, 204, 21, 0.5)",
            backgroundColor: "rgba(250, 204, 21, 0.04)",
            yAxisID: "y-uvi",
            tension: 0.4,
            fill: true,
            pointRadius: 0.75,
            borderWidth: 1,
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
            display: true,
            position: "top",
            align: "end",
            labels: {
              color: "rgba(204, 251, 241, 0.3)",
              font: { size: 8, family: "ui-monospace, SFMono-Regular, monospace" },
              boxWidth: 6,
              boxHeight: 6,
              padding: 6,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: "rgba(5, 13, 18, 0.95)",
            titleColor: "rgba(204, 251, 241, 0.7)",
            bodyColor: "rgba(204, 251, 241, 0.6)",
            borderColor: "rgba(56, 189, 168, 0.1)",
            borderWidth: 1,
            titleFont: { size: 9, family: "ui-monospace, monospace" },
            bodyFont: { size: 9, family: "ui-monospace, monospace" },
            padding: 6,
            cornerRadius: 4,
          },
          datalabels: {
            display: "auto",
            color: "rgba(204, 251, 241, 0.5)",
            font: { size: 7, weight: "bold", family: "ui-monospace, monospace" },
            align: "top",
            offset: 2,
            padding: 0,
            formatter: (value) => value,
          },
          annotation: {
            annotations: {
              sunrise: {
                type: "line",
                scaleID: "x",
                value: roundToNearestHour(sunrise),
                borderColor: "rgba(248, 113, 113, 0.2)",
                borderWidth: 1,
                borderDash: [2, 3],
                label: {
                  display: true,
                  content: "☀",
                  position: "start",
                  font: { size: 8 },
                  backgroundColor: "transparent",
                },
              },
              sunset: {
                type: "line",
                scaleID: "x",
                value: roundToNearestHour(sunset),
                borderColor: "rgba(56, 189, 168, 0.2)",
                borderWidth: 1,
                borderDash: [2, 3],
                label: {
                  display: true,
                  content: "☾",
                  position: "start",
                  font: { size: 8 },
                  backgroundColor: "transparent",
                },
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(204, 251, 241, 0.2)",
              font: { size: 8, family: "ui-monospace, monospace" },
              maxRotation: 0,
              callback: function (val, index) {
                return index % 4 === 0 ? this.getLabelForValue(val) : "";
              },
            },
            grid: {
              color: "rgba(56, 189, 168, 0.03)",
            },
          },
          "y-temp": {
            type: "linear",
            position: "left",
            ticks: {
              color: "rgba(248, 113, 113, 0.35)",
              font: { size: 8, family: "ui-monospace, monospace" },
              callback: (v) => v + "°",
              maxTicksLimit: 5,
            },
            grid: {
              color: "rgba(56, 189, 168, 0.03)",
            },
          },
          "y-uvi": {
            min: 0,
            type: "linear",
            position: "right",
            display: false,
            grid: { drawOnChartArea: false },
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
              color: "rgba(56, 189, 168, 0.25)",
              font: { size: 8, family: "ui-monospace, monospace" },
              callback: (v) => v + "mm",
              maxTicksLimit: 4,
            },
          },
        },
      },
    });
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
