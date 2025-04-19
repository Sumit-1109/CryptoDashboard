import React, { useEffect } from 'react';
import { fetchCoinList } from '../../../service/api.service';
import { useDispatch, useSelector } from 'react-redux';
import { setCoinList, setSelectedCoin } from '../../../store/slices/coinSlice';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import './SelectCoin.scss';

function SelectCoin() {
  const dispatch = useDispatch();
  const coinList = useSelector((state) => state.coins.coinList);
  const selectedCoin = useSelector((state) => state.coins.selectedCoin);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const getCoinList = async () => {
      setLoading(true);
      try {
        const res = await fetchCoinList();
        if (res.ok) {
          const data = await res.json();
          dispatch(setCoinList(data));
        }
      } catch (err) {
        alert('Failed to fetch coins list');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (coinList.length === 0) {
      getCoinList();
    }
  }, [dispatch, coinList.length]);

  const handleChange = (event, value) => {
    dispatch(setSelectedCoin(value ? value.id : ''));
  };

  return (
    <div className="coin-dropdown-container">
      <Autocomplete
        options={coinList}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => `${option.name} (${option.symbol})`}
        value={coinList.find((coin) => coin.id === selectedCoin) || null}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a coin"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        className="coin-dropdown"
        disableClearable
      />
    </div>
  );
}

export default SelectCoin;