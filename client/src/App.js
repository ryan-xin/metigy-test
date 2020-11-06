import React from 'react';
import Keywords from './components/Keywords';
import Sites from './components/Sites';
import Settings from './components/Settings';
import Grid from '@material-ui/core/Grid';
import './style/app.css';

function App() {
  return (
      <Grid container spacing={3} className="main-container">
        <Grid item xs={3}>
          <Keywords />
        </Grid>
        <Grid item xs={3}>
          <Sites />
        </Grid>
        <Grid item xs={6}>
          <Settings />
        </Grid>
      </Grid>
  );
}

export default App;
