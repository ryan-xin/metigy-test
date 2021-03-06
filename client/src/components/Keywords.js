import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import { RemoveCircleOutline, AddCircleOutline, BookmarkBorder } from '@material-ui/icons';
import makeStyles from '@material-ui/styles/makeStyles';
import '../style/components.css';

// Customize Material UI button style
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
    background: "#0086F9", 
    textTransform: "capitalize",
    "&:hover": {
      background: "#007AE2"
    }
  }
});

const Keywords = () => {
  const KEYWORDS_URL = 'http://localhost:8000/keywords';

  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  
  // Get new keyword from input field
  const handleChange = (e) => {
    setNewKeyword(e.target.value);
  };
  
  // Save new keyword to database
  const handleSubmit = (e) => {
    if (newKeyword !== '') {
      axios.post(KEYWORDS_URL, {
        word: newKeyword
      })
      .then(res => {
        setKeywords(res.data);
        setNewKeyword('');
      })
      .catch(err => console.log(err));
    }
  };
  
  // Remove keyword to database
  const handleClear = (id) => {
    axios.delete(`${KEYWORDS_URL}/${id}`)
    .then(res => {
      setKeywords(res.data);
    })
    .catch(err => console.log(err));
  };
  
  // Get all keywords from backend
  useEffect(() => {
    axios.get(KEYWORDS_URL)
    .then(res => {
      setKeywords(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  
  const classes = useStyles();
  
  return (
    <Grid container direction="column" spacing={2} className="component-container">
      <Grid item className="sub-heading">
        <Grid container spacing={1}>
          <Grid item>
            <BookmarkBorder className="bookmark-icon" />
          </Grid>
          <Grid item>
            <h2>Keywords</h2>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="sub-container">
        <Grid className="input-container">
          <Grid container className="input-container-inner" justify="space-between">
            <Grid item xs={9}>
              <input type="text" name="keywords" placeholder="Enter your keywords here (shoes)" value={newKeyword} onChange={handleChange} className="input-add" />
            </Grid>
            <Grid item>
              <Button size="small" className={classes.addButton} startIcon={<AddCircleOutline />} onClick={handleSubmit}>Add</Button>
            </Grid>
          </Grid>
        </Grid>
        <div className="horizontal-divider"></div>
        <Grid container direction="column" wrap="nowrap" className="list-container">
            {keywords.map((keyword) => 
              <Grid item key={keyword.id} class="list-item">
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <p>{keyword.word}</p>
                  </Grid>
                  <Grid item>
                    <Button size="small" variant="outlined" className={classes.removeButton} startIcon={<RemoveCircleOutline />} onClick={() => handleClear(keyword.id)}>Clear</Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Keywords;