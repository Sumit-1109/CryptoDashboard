import React from "react";

const DaysSlider = ({ days, setDays }) => (
  <div>
    <label>Select Days: </label>
    <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
      <option value={7}>7</option>
      <option value={14}>14</option>
      <option value={30}>30</option>
    </select>
  </div>
);

export default DaysSlider;