import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Comments from './comments';
import Home from './home';
import About from './about';

ReactDOM.render(
    <>
        <BrowserRouter>
            <Switch>
            <Route path='/comments/:postId' component={Comments}></Route>
            <Route path='/posts' component={App}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/' component={Home}></Route>
            </Switch>
        </BrowserRouter>
    </>
,document.querySelector('#root'));