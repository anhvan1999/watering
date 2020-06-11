import axios from 'axios';
import store from '../redux-store/store';

export default axios.create({
    baseURL: process.env.REACT_APP_API_ROOT
});
