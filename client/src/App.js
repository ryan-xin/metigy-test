import React from 'react';
import Keywords from './components/Keywords';
import Sites from './components/Sites';
import Settings from './components/Settings';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
  mainContainer: {
    margin: "0 auto"
  }
});

const App = () => {
  const classes = useStyles();
  
  return (
    <Grid container xs={11} spacing={3} className={classes.mainContainer}>
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
