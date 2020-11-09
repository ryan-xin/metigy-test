import React from 'react';
import Keywords from './components/Keywords';
import Sites from './components/Sites';
import Settings from './components/Settings';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#233952",
    },
    secondary: {
      main: "#233952",
    }
  }
});

const useStyles = makeStyles({
  mainContainer: {
    margin: "0 auto"
  }
});

const App = () => {
  const classes = useStyles();
  
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container xs={11} spacing={3} className={classes.mainContainer}>
        <Grid item lg={3} md={6} sm={12}>
          <Keywords />
        </Grid>
        <Grid item lg={3} md={6} sm={12}>
          <Sites />
        </Grid>
        <Grid item lg={6} md={12} sm={12}>
          <Settings />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
