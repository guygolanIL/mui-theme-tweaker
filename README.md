# mui-theme-tweaker

> A Theme Tweaker wrapper for Material UI

[![NPM](https://img.shields.io/npm/v/mui-theme-tweaker.svg)](https://www.npmjs.com/package/mui-theme-tweaker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mui-theme-tweaker
```

## Usage
Wrap your App with a Theme Provider
```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {theme} from './theme/theme';
import MuiProvider from '@material-ui/styles/ThemeProvider';
import { createThemeTweaker } from './theme/themeTweaker/themeTweaker';

const isDev = process.env.REACT_APP_ENV === "development";

const ThemeProvider = isDev ? createThemeTweaker(MuiProvider) : MuiProvider;

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
,
  document.getElementById('root')
);
```
<br>
The MuiTweaker will connect to your theme object and create some ui to tweak it.


```tsx
import React from 'react'

import {MuiTweaker} from 'mui-theme-tweaker';
const App = () => {
  return <MuiTweaker/>
}

export default App
```

#### Note: You can create your own Tweaker component using the theme-tweaker package.
<hr>
<br>

### Dependencies:
Relying on React 16 and above

## License

MIT © [guygolanIL](https://github.com/guygolanIL)
