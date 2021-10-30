import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from "react-redux";
import {store} from "./store/store";
import AppWithRedux from "./AppWithRedux";


ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>,document.getElementById('root'));



