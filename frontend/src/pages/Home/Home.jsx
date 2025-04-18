import React from 'react'
import CryptoDetailed from '../../components/CryptoDetailed/CryptoDetailed';
import TopPanel from "../../components/TopGainersLosers/TopPanel/TopPanel"
import "./Home.scss";

function Home() {
  return (
    <div className='home-page'>
      <CryptoDetailed />
      <TopPanel />
    </div>
  )
}

export default Home
