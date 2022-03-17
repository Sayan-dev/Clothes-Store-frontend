const axios = require('axios')
const instance=axios.create({
    baseURL:process.env.REACT_APP_BASE_URL
});

export default instance;