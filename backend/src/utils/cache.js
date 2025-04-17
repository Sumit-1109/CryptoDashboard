const cache = {};

function setCache(key, value, time = 60){
    cache[key] = {
        value,
        expiry : Date.now() + time * 1000,
    };
}

function getCache(key) {
    const data = cache[key];

    if(data && Date.now() < data.expiry) {
        return data.value;
    }

    return null;
}

module.exports = {setCache, getCache};