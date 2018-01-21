//styles
import 'styles/main.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import actions from './pages/Home/action';
import Cookies from 'js-cookie';

// Init Store
import store from './store';

// Pages
import Home from 'pages/Home';
import Stock from 'pages/Stock';
import Register from 'pages/Register';
import Personal from 'pages/PersonalCenter';
import ForgetPassword from 'pages/ForgetPassword';
import Help from 'pages/Help/Help'

// Global variables
import { init } from 'utils/global';

init();

class App extends Component{
  componentWillMount(){
    const token = Cookies.get('TOKEN');

    if(token){
      store.dispatch(actions.queryCustomerByToken(token));
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Route exact path="/" component={Home}/>
          <Route path="/stock/:tab" component={Stock}/>
          <Route exact path="/register" component={Register}/>
          <Route path="/personal/:tab" component={Personal}/>
          <Route exact path="/forget" component={ForgetPassword} />
          <Route exact path="/help" component={Help} />
        </div>
      </Router>
    );
  }
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
