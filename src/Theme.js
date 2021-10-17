/* eslint-disable react/prop-types */
import React from 'react';
import {ThemeProvider, createTheme} from '@material-ui/core';

const themeOptions = {
  fontFamily: 'Verdana',
  typography: {
    fontFamily: 'Verdana',
  },
  palette: {
    type: 'light',
    primary: {
      main: '#607d8b',
    },
    secondary: {
      main: '#212121',
    },
    success: {
      main: '#00e676',
    },
  },
};

const theme = createTheme(themeOptions);

const Theme = (props) => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
};

export default Theme;
