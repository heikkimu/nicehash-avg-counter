import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import AvgCounterApp from './modules/AvgCounterApp';

//const loggerMiddleware = createLogger(); // initialize logger
//const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore); // apply logger to redux

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'https://cors.io/?https://api.nicehash.com',
    responseType: 'json'
});

const reducer = combineReducers({
    AvgCounterApp
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) =>
    createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(
            axiosMiddleware(client),
            logger
        )),
        
    );
export default configureStore;