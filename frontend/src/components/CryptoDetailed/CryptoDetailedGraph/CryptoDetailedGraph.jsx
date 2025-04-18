import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  TimeScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  CategoryScale,
} from 'chart.js';
import {
  CandlestickController,
  CandlestickElement,
} from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import {
  Box,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

Chart.register(
  TimeScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  CategoryScale,
  CandlestickController,
  CandlestickElement
);

const timeFrames = {
  '7D': 7,
  '14D': 14,
  '30D': 30,
};

function CryptoDetailedGraph({ priceData, volumeData }) {
  const [days, setDays] = useState(7);
  const chartRef = useRef(null);

  const handleTimeframeChange = (event, newDays) => {
    if (newDays !== null) setDays(newDays);
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const slicedPrice = priceData.slice(-days * 24);
    const slicedVolume = volumeData.slice(-days * 24);

    const dailyMap = {};
    const volumeMap = {};

    slicedVolume.forEach(([timestamp, volume]) => {
      const day = new Date(timestamp).toISOString().split('T')[0];
      volumeMap[day] = (volumeMap[day] || 0) + volume;
    });

    slicedPrice.forEach(([timestamp, price]) => {
      const date = new Date(timestamp);
      const day = date.toISOString().split('T')[0];
      if (!dailyMap[day]) {
        dailyMap[day] = {
          date,
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
    const volumeDataPoints = [];

    let lastClose = null;
    Object.entries(dailyMap).forEach(([day, entry]) => {
      candleData.push({
        x: entry.date,
        o: entry.open,
        h: entry.high,
        l: entry.low,
        c: entry.close,
      });

      const volumeColor =
        lastClose !== null && entry.close < lastClose
          ? 'rgba(244,67,54,0.6)'
          : 'rgba(76,175,80,0.6)';
      lastClose = entry.close;

      volumeDataPoints.push({
        x: entry.date,
        y: Number((volumeMap[day] || 0) / 1_000_000).toFixed(2),
        backgroundColor: volumeColor,
      });
    });

    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [
          {
            type: 'candlestick',
            label: 'Price',
            data: candleData,
            color: {
              up: '#4caf50',
              down: '#f44336',
              unchanged: '#999',
            },
            yAxisID: 'y',
          },
          {
            type: 'bar',
            label: 'Volume (M)',
            data: volumeDataPoints,
            parsing: false,
            backgroundColor: context =>
              context?.raw?.backgroundColor || 'rgba(150,150,150,0.3)',
            
            yAxisID: 'y1',
            barPercentage: 1.0,
            categoryPercentage: 1.0,
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
            time: { unit: 'day' },
            grid: { display: false },
            ticks: { color: '#aaa', font: { size: 10 } },
          },
          y: {
            position: 'right',
            title: { display: true, text: 'Price', color: '#aaa' },
            grid: { color: 'rgba(200,200,200,0.1)' },
            ticks: { color: '#aaa' },
          },
          y1: {
            position: 'left',
            beginAtZero: true,
            title: { display: true, text: 'Volume (M)', color: '#aaa' },
            grid: { drawOnChartArea: false },
            ticks: { color: '#aaa' },
          },
        },
        plugins: {
          tooltip: {
            mode: 'index',
            callbacks: {
              label: ctx => {
                if (ctx.dataset.type === 'candlestick') {
                  const { o, h, l, c } = ctx.raw;
                  return `O: ${o}, H: ${h}, L: ${l}, C: ${c}`;
                } else {
                  return `Volume: ${ctx.raw.y}M`;
                }
              },
            },
          },
          legend: { display: false },
        },
      },
    });

    return () => chartInstance.destroy();
  }, [priceData, volumeData, days]);

  return (
    <Box className="chart-wrapper" sx={{ width: '100%', height: '500px' }}>
      <Paper
        elevation={4}
        sx={{
          padding: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Candlestick Chart</Typography>
          <ToggleButtonGroup
            value={days}
            exclusive
            onChange={handleTimeframeChange}
            size="small"
          >
            {Object.entries(timeFrames).map(([label, value]) => (
              <ToggleButton key={value} value={value}>
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <canvas ref={chartRef} />
        </Box>
      </Paper>
    </Box>
  );
}

export default CryptoDetailedGraph;
