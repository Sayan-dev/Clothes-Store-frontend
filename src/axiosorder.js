import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-builder-b6437.firebaseio.com/'
});

export default instance;