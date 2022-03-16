const axios = require('axios')
const instance=axios.create({
    baseURL:process.env.REACT_APP_LOCAL
});

export default instance;