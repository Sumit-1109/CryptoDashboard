# CryptoDashboard

A fullstack cryptocurrency dashboard built with React, Material UI, Chart.js Financial, and Node.js, powered by real-time data from the CoinGecko API.

This app displays:

* Interactive candlestick + volume charts for selected coins

* Top gainer and loser of the last 24 hours

* Searchable coin list

* Selectable time frames (7 / 14 / 30 days)

Project Structure:

crypto-dashboard/
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── service/
│   │   ├── redux/
│   │   └── App.jsx
├── README.md

----------------------------------------------------------
Backend Setup

📁 Directory: backend/

-> Features
* Wraps CoinGecko API to serve market data and OHLC

* Caches responses in-memory for 60 seconds to reduce API calls

-> Provides endpoints for:

* Market chart with OHLC

* Top gainer & loser

* Coin list

* Coin search

* Coin details

📦 Requirements
Node.js 18+

CoinGecko API key (optional for higher rate limits)

🔌 Install & Run


cd backend
npm install


Create a .env file with:
COINGECKO_API_KEY=your_api_key_here

Run the server:
npm run dev

📡 API Endpoints

Method	Route	Description
GET	/api/coins/:id/market_chart?vs_currency=usd&days=7	(Get OHLC + volume chart)
GET	/api/top-gainer	(Get top 24h gainer)
GET	/api/top-loser	(Get top 24h loser)
GET	/api/list	(Get all coins)
GET	/api/search?query=btc	(Search coins)
GET	/api/details/:id	(Get coin details)

----------------------------------------------------------
🌐 Frontend Setup
📁 Directory: frontend/

-> Features
* React + Redux for state management

* Chart.js Financial for OHLC + volume graphs

* Polling to update top gainer/loser every minute

* Responsive & styled with SCSS

📦 Requirements
Node.js 18+

A running backend server

🔌 Install & Run

cd frontend
npm install
npm run dev
Make sure the backend is running at http://localhost:PORT or update BASE_URL in service/api.service.js.

⚙️ Configuration
Backend:
In-memory cache TTL: 60 seconds

Axios used for HTTP requests with optional API key headers

Frontend:
redux/coinSlice.js holds selected coin and time period

CryptoDetailedGraph.jsx builds a dual y-axis candlestick + volume chart

TopPanel and TopCard handle gainer/loser display


🔮 Roadmap / Possible Improvements
Add pagination and filtering to coin list

Implement WebSocket for live prices

Add theme toggle (dark/light mode)

Persist user preferences using localStorage

Use Redis or another persistent cache in production

🤝 Contributing
Feel free to fork and open PRs!