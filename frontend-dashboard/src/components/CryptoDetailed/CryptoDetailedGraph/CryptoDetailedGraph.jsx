import React, { useEffect, useRef } from "react";
import {
  Chart,
  TimeScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";
import "./CryptoDetailedGraph.scss";

Chart.register(
  TimeScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  CandlestickController,
  CandlestickElement
);

const groupByDay = (data) => {
  const grouped = {};
  data.forEach(([timestamp, ...values]) => {
    const dayKey = new Date(timestamp).toISOString().split("T")[0];
    if (!grouped[dayKey]) grouped[dayKey] = [];
    grouped[dayKey].push([timestamp, ...values]);
  });
  return grouped;
};

const transformToCandleStick = (ohlcData) => {
  const grouped = groupByDay(ohlcData);
  return Object.entries(grouped).map(([day, entries]) => {
    const sorted = entries.sort((a, b) => a[0] - b[0]);
    const open = sorted[0][1];
    const close = sorted[sorted.length - 1][4];
    const high = Math.max(...sorted.map((e) => e[2]));
    const low = Math.min(...sorted.map((e) => e[3]));
    return {
      x: new Date(day),
      o: open,
      h: high,
      l: low,
      c: close,
    };
  });
};

const transformToVolume = (volumeData) => {
  const grouped = groupByDay(volumeData);
  return Object.entries(grouped).map(([day, entries]) => {
    const total = entries.reduce((sum, [, vol]) => sum + vol, 0);
    return {
      x: new Date(day),
      y: total,
    };
  });
};

function CryptoDetailedGraph({ ohlc, volumeData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!ohlc.length || !volumeData.length) return;

    const candleData = transformToCandleStick(ohlc);
    const volumeBarData = transformToVolume(volumeData);

    const allPrices = candleData.flatMap((d) => [d.o, d.h, d.l, d.c]);
    const minPrice = Math.min(...allPrices) * 0.98;
    const maxPrice = Math.max(...allPrices) * 1.02;

    const volumeValues = volumeBarData.map(d => d.y);
    const minVolume = Math.min(...volumeValues) * 0.5;
    const maxVolume = Math.max(...volumeValues) * 4;


    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            id: "price",
            type: "candlestick",
            label: "Price",
            data: candleData,
            xAxisID: "x",
            yAxisID: "yPrice",
            barPercentage: 0.9,
            categoryPercentage: 0.5,
            color: {
              up: "#26a69a",
              down: "#ef5350",
              unchanged: "#999",
            },
          },
          {
            id : "volume",
            type: "bar",
            label: "Volume",
            data: volumeBarData,
            xAxisID: "x",
            yAxisID: "yVolume",
            backgroundColor: "rgba(100,181,246,0.5)",
            barPercentage: 0.9,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        parsing: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
        plugins: {
          tooltip: {
            mode: "nearest",
            intersect: false,
            callbacks: {
              label: (context) => {
                if (context.dataset.type === "candlestick") {
                  const ohlc = context.raw;
                  return `O: ${ohlc.o}, H: ${ohlc.h}, L: ${ohlc.l}, C: ${ohlc.c}`;
                } else {
                  return `Volume: ${context.raw.y}`;
                }
              },
            },
          },
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            type: "time",
            offset: true,
            time: {
              unit: "day",
              tooltipFormat: "PP",
              displayFormats: {
                day: "MMM dd",
              },
            },
            ticks: {
              color: "#444",
              font: { size: 9 },
              padding: 6,
              autoSkip: true,
              maxRotation: 90,
              minRotation: 90,
              display: true,
            },
            grid: {
              color: "#f0f0f0",
            },
          },
          yPrice: {
            min: minPrice,
            max: maxPrice,
            position: "left",
            title: {
              display: true,
              text: "Price (USD)",
            },
            ticks: {
              color: "#26a69a",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          yVolume: {
            min: minVolume,
            max: maxVolume,
            position: "right",
            title: {
              display: true,
              text: "Volume",
            },
            ticks: {
              color: "#90caf9",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
  }, [ohlc, volumeData]);

  return (
    <div className="graph-wrapper">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default CryptoDetailedGraph;
