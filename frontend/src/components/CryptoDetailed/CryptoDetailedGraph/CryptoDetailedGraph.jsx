import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  ChartData,
  ChartOptions,
  registerables
} from 'chart.js';
import { FinancialController, CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

Chart.register(
  ...registerables,
  FinancialController,
  CandlestickController,
  CandlestickElement
);

interface ChartEntry {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

const CryptoDetailedGraph: React.FC = () => {
  const priceCanvasRef = useRef<HTMLCanvasElement>(null);
  const volumeCanvasRef = useRef<HTMLCanvasElement>(null);

  const [coin, setCoin] = useState<string>('bitcoin');
  const [days, setDays] = useState<number>(30);
  const [formattedData, setFormattedData] = useState<ChartEntry[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=${days}`
        );
        const volumeResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
        );

        const ohlc = response.data;
        const volumeData = volumeResponse.data.total_volumes;

        const formatted = ohlc.map((item: number[], i: number) => ({
          x: item[0],
          o: item[1],
          h: item[2],
          l: item[3],
          c: item[4],
          v: volumeData[i] ? volumeData[i][1] : 0
        }));

        setFormattedData(formatted);
      } catch (err) {
        console.error('Data fetch error:', err);
      }
    };

    fetchChartData();
  }, [coin, days]);

  useEffect(() => {
    if (!priceCanvasRef.current || !volumeCanvasRef.current || formattedData.length === 0) return;

    // Destroy previous charts if any
    Chart.getChart(priceCanvasRef.current)?.destroy();
    Chart.getChart(volumeCanvasRef.current)?.destroy();

    const sharedOptions = {
      responsive: true,
      parsing: false,
      scales: {
        x: {
          type: 'time' as const,
          time: {
            unit: 'day',
            tooltipFormat: 'MMM dd',
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            maxRotation: 0,
          },
          grid: {
            display: false,
          },
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index' as const,
          intersect: false,
        },
      },
    };

    // Price Chart
    new Chart(priceCanvasRef.current, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'Price',
          data: formattedData.map(d => ({
            x: d.x,
            o: d.o,
            h: d.h,
            l: d.l,
            c: d.c,
          })),
          color: {
            up: '#0f0',
            down: '#f00',
            unchanged: '#999',
          },
        }],
      },
      options: {
        ...sharedOptions,
        scales: {
          ...sharedOptions.scales,
          y: {
            title: {
              display: true,
              text: 'Price (USD)',
            },
            position: 'left',
            grid: {
              display: true,
              color: '#333',
            },
          },
        },
      } as ChartOptions<'candlestick'>,
    });

    // Volume Chart
    new Chart(volumeCanvasRef.current, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Volume',
          data: formattedData.map(d => ({
            x: d.x,
            y: d.v,
          })),
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
        }],
      },
      options: {
        ...sharedOptions,
        scales: {
          ...sharedOptions.scales,
          y: {
            title: {
              display: true,
              text: 'Volume',
            },
            position: 'right',
            grid: {
              display: false,
            },
          },
        },
      } as ChartOptions<'bar'>,
    });

  }, [formattedData]);

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <h2>{coin.charAt(0).toUpperCase() + coin.slice(1)} Chart</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Select Coin: </label>
        <select value={coin} onChange={(e) => setCoin(e.target.value)}>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="solana">Solana</option>
          <option value="cardano">Cardano</option>
        </select>

        <label style={{ marginLeft: '1rem' }}>Select Timeframe: </label>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>7 Days</option>
          <option value={14}>14 Days</option>
          <option value={30}>30 Days</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '600px' }}>
        <div style={{ flex: 2 }}>
          <canvas ref={priceCanvasRef} />
        </div>
        <div style={{ flex: 1 }}>
          <canvas ref={volumeCanvasRef} />
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailedGraph;