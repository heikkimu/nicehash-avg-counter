import React from 'react';
import { Provider } from 'react-redux';
import AvgCounterAppContainer from './containers/AvgCounterApp';
import configureStore from './redux/configureStore';

const store = configureStore();

export default class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <AvgCounterAppContainer />
      </Provider>
    );
  }
}