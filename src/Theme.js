/* eslint-disable react/prop-types */
import React from 'react';
import {ThemeProvider, createTheme} from '@material-ui/core';

const theme = createTheme({
  gradientBackground: 'linear-gradient(45deg, #8a64c7 30%, #ac9cc7 90%)',
  fontFamily: 'Verdana',
  primaryColor: '#d33232',
  secondaryColor: '#f9ac5e',
  typography: {
    fontFamily: 'Verdana',
  },
});

const Theme = (props) => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
};

export default Theme;
