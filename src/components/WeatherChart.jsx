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
    const theme = document.getElementById("dashboard-main")?.getAttribute("data-theme") || "";
    const isDay = theme.startsWith("day");

    // Theme-aware colors
    const colors = isDay ? {
      legendText: "rgba(110, 78, 30, 0.4)",
      tooltipBg: "rgba(243, 238, 228, 0.95)",
      tooltipTitle: "rgba(50, 35, 15, 0.8)",
      tooltipBody: "rgba(50, 35, 15, 0.65)",
      tooltipBorder: "rgba(180, 95, 30, 0.15)",
      dataLabel: "rgba(50, 35, 15, 0.55)",
      xTick: "rgba(110, 78, 30, 0.3)",
      xGrid: "rgba(110, 78, 30, 0.05)",
      tempTick: "rgba(200, 80, 80, 0.5)",
      tempGrid: "rgba(110, 78, 30, 0.05)",
      precipTick: "rgba(50, 140, 120, 0.4)",
      tempLine: "rgba(200, 90, 90, 0.75)",
      tempFill: "rgba(200, 90, 90, 0.08)",
      precipLine: "rgba(50, 140, 120, 0.65)",
      precipFill: "rgba(50, 140, 120, 0.07)",
      uviLine: "rgba(200, 160, 30, 0.6)",
      uviFill: "rgba(200, 160, 30, 0.06)",
      sunriseLine: "rgba(200, 90, 90, 0.25)",
      sunsetLine: "rgba(50, 140, 120, 0.25)",
    } : {
      legendText: "rgba(210, 215, 240, 0.3)",
      tooltipBg: "rgba(8, 11, 22, 0.95)",
      tooltipTitle: "rgba(210, 215, 240, 0.7)",
      tooltipBody: "rgba(210, 215, 240, 0.6)",
      tooltipBorder: "rgba(120, 160, 230, 0.1)",
      dataLabel: "rgba(210, 215, 240, 0.5)",
      xTick: "rgba(210, 215, 240, 0.2)",
      xGrid: "rgba(120, 160, 230, 0.03)",
      tempTick: "rgba(248, 113, 113, 0.35)",
      tempGrid: "rgba(120, 160, 230, 0.03)",
      precipTick: "rgba(120, 160, 230, 0.25)",
      tempLine: "rgba(248, 113, 113, 0.7)",
      tempFill: "rgba(248, 113, 113, 0.06)",
      precipLine: "rgba(120, 160, 230, 0.6)",
      precipFill: "rgba(120, 160, 230, 0.06)",
      uviLine: "rgba(250, 204, 21, 0.5)",
      uviFill: "rgba(250, 204, 21, 0.04)",
      sunriseLine: "rgba(248, 113, 113, 0.2)",
      sunsetLine: "rgba(120, 160, 230, 0.2)",
    };

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
            borderColor: colors.tempLine,
            backgroundColor: colors.tempFill,
            yAxisID: "y-temp",
            tension: 0.4,
            fill: true,
            pointRadius: 0.75,
            borderWidth: 1.5,
          },
          {
            label: "Regen mm",
            data: precipitationData,
            borderColor: colors.precipLine,
            backgroundColor: colors.precipFill,
            yAxisID: "y-precip",
            tension: 0.4,
            fill: true,
            pointRadius: 0.75,
            borderWidth: 1.5,
          },
          {
            label: "UV",
            data: uviData,
            borderColor: colors.uviLine,
            backgroundColor: colors.uviFill,
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
              color: colors.legendText,
              font: { size: 8, family: "ui-monospace, SFMono-Regular, monospace" },
              boxWidth: 6,
              boxHeight: 6,
              padding: 6,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipTitle,
            bodyColor: colors.tooltipBody,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            titleFont: { size: 9, family: "ui-monospace, monospace" },
            bodyFont: { size: 9, family: "ui-monospace, monospace" },
            padding: 6,
            cornerRadius: 4,
          },
          datalabels: {
            display: "auto",
            color: colors.dataLabel,
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
                borderColor: colors.sunriseLine,
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
                borderColor: colors.sunsetLine,
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
              color: colors.xTick,
              font: { size: 8, family: "ui-monospace, monospace" },
              maxRotation: 0,
              callback: function (val, index) {
                return index % 4 === 0 ? this.getLabelForValue(val) : "";
              },
            },
            grid: {
              color: colors.xGrid,
            },
          },
          "y-temp": {
            type: "linear",
            position: "left",
            ticks: {
              color: colors.tempTick,
              font: { size: 8, family: "ui-monospace, monospace" },
              callback: (v) => v + "°",
              maxTicksLimit: 5,
            },
            grid: {
              color: colors.tempGrid,
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
              color: colors.precipTick,
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
