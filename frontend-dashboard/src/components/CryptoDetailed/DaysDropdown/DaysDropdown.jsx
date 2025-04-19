import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, MenuItem } from '@mui/material';
import { setSelectedDays } from '../../../store/slices/coinSlice';
import './DaysDropdown.scss';

const options = [7, 14, 30];

const DaysDropdown = () => {
  const dispatch = useDispatch();
  const selectedDays = useSelector((state) => state.coins.selectedDays);

  const handleChange = (e) => {
    dispatch(setSelectedDays(Number(e.target.value)));
  };

  return (
    <div className="days-dropdown-container">
      <TextField
        select
        label="Select Day"
        value={selectedDays}
        onChange={handleChange}
        variant="outlined"
        className="days-dropdown"
        fullWidth
      >
        {options.map((day) => (
          <MenuItem key={day} value={day}>
            Last {day} Days
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default DaysDropdown;