/* eslint-disable require-jsdoc */
import React from 'react';
import {AppBar, Container, Grid, Typography} from '@material-ui/core';

export default function Footer() {
  return (
    <AppBar className='footer' position='static' color='primary'>
      <Container maxWidth='md'>
        <Grid container spacing={3}>
          <Grid item xs={4} style={{textAlign: 'center', marginTop: '50px'}}>
            <Typography color="inherit">© Sean McLaughlan</Typography>
          </Grid>
          <Grid item xs={4} style={{textAlign: 'center', marginTop: '50px'}}>
            <a style={{color: 'white'}} href="https://github.com/smclaughlan/">
              <Typography color="inherit">GitHub</Typography>
            </a>
          </Grid>
          <Grid item xs={4} style={{textAlign: 'center', marginTop: '50px'}}>
            <a style={{color: 'white'}} href="https://smclaughlan.github.io/#four">
              <Typography color="inherit">Contact</Typography>
            </a>
          </Grid>
        </Grid >
      </Container>
    </AppBar>
  );
}
