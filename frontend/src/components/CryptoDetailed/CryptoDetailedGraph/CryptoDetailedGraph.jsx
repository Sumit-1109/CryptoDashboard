import React, { useEffect, useRef } from 'react';
import { Chart, TimeScale, LinearScale, BarController, BarElement, Tooltip } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { Box, Paper, Typography } from '@mui/material';
import './CryptoDetailedGraph.scss';

Chart.register(
  TimeScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  CandlestickController,
  CandlestickElement
);

function CryptoDetailedGraph({ priceData, volumeData }) {
  const chartRef = useRef(null);
  const volumeChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    const volumeCtx = volumeChartRef.current?.getContext('2d');

    if (!ctx || !volumeCtx) {
      console.error('Chart canvas context is null!');
      return;
    }

    const dailyMap = {};
    const volumeMap = {};

    volumeData.forEach(([timestamp, volume]) => {
      const day = new Date(timestamp).toISOString().slice(0, 10);
      volumeMap[day] = (volumeMap[day] || 0) + volume;
    });

    priceData.forEach(([timestamp, price]) => {
      const day = new Date(timestamp).toISOString().slice(0, 10);
      if (!dailyMap[day]) {
        dailyMap[day] = {
          date: new Date(timestamp),
          open: price,
          high: price,
          low: price,
          close: price,
        };
      } else {
        dailyMap[day].high = Math.max(dailyMap[day].high, price);
        dailyMap[day].low = Math.min(dailyMap[day].low, price);
        dailyMap[day].close = price;
      }
    });

    const candleData = [];
    const volumeBarData = [];

    Object.entries(dailyMap).forEach(([day, entry]) => {
      candleData.push({
        x: entry.date,
        o: entry.open,
        h: entry.high,
        l: entry.low,
        c: entry.close,
      });
      volumeBarData.push({
        x: entry.date,
        y: parseFloat((volumeMap[day] || 0) / 1_000_000).toFixed(2),
      });
    });

    const chartWidth = ctx.canvas.clientWidth;
    const candleCount = candleData.length;
    const candleWidth = Math.max(2, Math.floor(chartWidth / candleCount) - 2);

    const priceChart = new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [
          {
            label: 'Price Candlestick',
            data: candleData,
            barThickness: candleWidth,
            borderColor: '#6c757d',
            color: {
              up: '#4caf50',
              down: '#f44336',
              unchanged: '#999',
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            grid: {
              display: true,
              color: 'rgba(200, 200, 200, 0.1)',
            },
            ticks: {
              display: true,
              maxRotation: 0,
              font: {
                size: 10,
              },
            },
          },
          y: {
            position: 'left',
            title: {
              display: true,
              text: 'Price',
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const { o, h, l, c } = ctx.raw;
                return `O: ${o}, H: ${h}, L: ${l}, C: ${c}`;
              },
            },
          },
        },
      },
    });

    const volumeChart = new Chart(volumeCtx, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Volume (M)',
            data: volumeBarData,
            backgroundColor: 'rgba(33, 150, 243, 0.4)',
            barThickness: candleWidth,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            grid: {
              display: false,
            },
            ticks: {
              display: true,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Volume (M)',
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => `Volume: ${ctx.raw.y}M`,
            },
          },
        },
      },
    });

    return () => {
      priceChart.destroy();
      volumeChart.destroy();
    };
  }, [priceData, volumeData]);

  return (
    <Box className="chart-container">
      <Paper elevation={3} className="chart-paper">
        <Typography variant="h6" className="chart-title">Candlestick Chart</Typography>
        <canvas ref={chartRef} className="canvas-candle" />
        <Typography variant="h6" className="chart-title">Volume Chart</Typography>
        <canvas ref={volumeChartRef} className="canvas-volume" />
      </Paper>
    </Box>
  );
}

export default CryptoDetailedGraph;
