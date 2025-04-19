export const transformToCandleStick = (ohlcData) => {
    return ohlcData.map(([timestamp, open, high, low, close]) => ({
        x: new Date(timestamp),
        o: open,
        h: high,
        l: low,
        c: close,
    }));
};