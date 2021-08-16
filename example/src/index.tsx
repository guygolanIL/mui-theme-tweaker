import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createThemeTweaker} from 'theme-tweaker';
import { createTheme } from '@material-ui/core';
import { Theme, ThemeProvider } from '@material-ui/core';

const Provider = createThemeTweaker(ThemeProvider);
const theme: Theme = createTheme();


ReactDOM.render(
    <Provider theme={theme}>
        <App />
    </Provider>
, document.getElementById('root'))
