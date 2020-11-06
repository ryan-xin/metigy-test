import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import DesktopWindows from '@material-ui/icons/DesktopWindows';
import makeStyles from '@material-ui/styles/makeStyles';
import '../style/components.css';

const useStyles = makeStyles({
  removeButton: {
    color: "#FFFFFF", 
    borderColor: "#233952", 
    textTransform: "capitalize",
    "&:hover": {
      borderColor: "#FFFFFF"
    }
  },
  addButton: {
    color: "#FFFFFF", 
    background: "#00A94D", 
    textTransform: "capitalize",
    "&:hover": {
      background: "#009946"
    }
  }
});

const Sites = () => {
  const starterSites = [
    'www.dockers.com',
    'www.adidas.com',
    'www.nike.com',
    'www.underarmour.com',
    'www.newbalance.com',
    'www.puma.com',
    'www.prada.com',
    'www.fredperry.com',
    'www.caterpillar.com',
    'www.gucci.com',
    'www.allenedmonds.com',
    'www.brunomagli.com',
    'www.diesel.com'
  ];

  const [sites, setSites] = useState(starterSites);
  const [newSite, setNewSite] = useState('');
  
  const handleChange = (e) => {
    setNewSite(e.target.value);
  };
  
  const handleSubmit = (e) => {
    if (newSite !== '') {
      setSites([
        ...sites, newSite
      ]);
      setNewSite('');
    }
  };
  
  const handleClear = (index) => {
    let currentSites = [...sites];
    currentSites.splice(index, 1);
    setSites(currentSites);
  };
  
  const classes = useStyles();
  
  return (
    <Grid container direction="column" spacing={2} className="component-container">
      <Grid item className="sub-heading">
        <Grid container spacing={1}>
          <Grid item>
            <DesktopWindows className="desktop-icon" />
          </Grid>
          <Grid item>
            <h2>Sites</h2>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="sub-container">
        <Grid className="input-container">
          <Grid container className="input-container-inner" justify="space-between">
            <Grid item xs={9}>
              <input type="text" name="sites" placeholder="Enter your site here" value={newSite} onChange={handleChange} className="input-add" />
            </Grid>
            <Grid item>
              <Button size="small" className={classes.addButton} startIcon={<AddCircleOutline />} onClick={handleSubmit}>Add</Button>
            </Grid>
          </Grid>
        </Grid>
        <div className="horizontal-divider"></div>
        <Grid container direction="column" wrap="nowrap" className="list-container">
          {sites.map((site, index) =>
            <Grid item key={index} class="list-item">
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <p>{site}</p>
                </Grid>
                <Grid item>
                  <Button size="small" variant="outlined" className={classes.removeButton} startIcon={<RemoveCircleOutline />} onClick={() => handleClear(index)}>Clear</Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Sites;