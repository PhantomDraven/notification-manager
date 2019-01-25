import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Firebase, { FirebaseContext } from './firebase/Firebase';

import App from './App';
import * as serviceWorker from './serviceWorker';

import "antd/dist/antd.css";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
        <div>
            <Route exact path="/" 
                render={() => <App/>}
            />
            <Route 
                path="/login" 
                render={() => <App login={true} register={false}/>}
            />
            <Route 
                path="/register" 
                render={() => <App login={false} register={true}/>}
            />
            <Route
                path="/account"
                render={() => <App account={true}/>}
            />
        </div>
    </Router>
  </FirebaseContext.Provider>
, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
