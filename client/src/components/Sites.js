import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import { RemoveCircleOutline, AddCircleOutline, DesktopWindows } from '@material-ui/icons';
import makeStyles from '@material-ui/styles/makeStyles';
import '../style/components.css';

const useStyles = makeStyles({
  removeButton: {
    color: "#FFFFFF", 
    borderColor: "#29425E", 
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
  const SITES_URL = 'http://localhost:8000/sites';
  
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState('');
  
  const handleChange = (e) => {
    setNewSite(e.target.value);
  };
  
  const handleSubmit = (e) => {
    if (newSite !== '') {
      console.log(newSite);
      axios.post(`${SITES_URL}/create`, {
        url: newSite
      })
      .then(res => {
        console.log(res.data);
        setSites(res.data);
        setNewSite('');
      })
      .catch(err => console.log(err));
    }
  };
  
  const handleClear = (id) => {
    console.log(id);
    axios.post(`${SITES_URL}/delete`, {
      id: id
    })
    .then(res => {
      console.log(res.data);
      setSites(res.data);
    })
    .catch(err => console.log(err));
  };
  
  useEffect(() => {
    axios.get(SITES_URL)
    .then(res => {
      console.log(res.data);
      setSites(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  
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
          {sites.map((site) =>
            <Grid item key={site.id} class="list-item">
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <p>{site.url}</p>
                </Grid>
                <Grid item>
                  <Button size="small" variant="outlined" className={classes.removeButton} startIcon={<RemoveCircleOutline />} onClick={() => handleClear(site.id)}>Clear</Button>
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