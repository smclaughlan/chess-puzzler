/* eslint-disable require-jsdoc */
import React from 'react';
import {AppBar, Typography} from '@material-ui/core';

export default function TopBar(props) {
  return (
    <AppBar>
      <Typography variant='h6' align='center'>Chess Puzzler</Typography>
    </AppBar>
  );
}
