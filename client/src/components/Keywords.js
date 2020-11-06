import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
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
    background: "#0086F9", 
    textTransform: "capitalize",
    "&:hover": {
      background: "#007AE2"
    }
  }
});

const Keywords = () => {
  
  const starterKeywords = [
    'Shoes',
    'Shoes carnival',
    'Shoes palace',
    'Shoes stores near me',
    'Shoes for crew',
    'Shoes station',
    'Shoes repair',
    'Shoes store',
    'Shoes for women',
    'Shoes fashion week',
    'Shoes instagram',
    'Shoes stories',
    'Shoes show'
  ];

  const [keywords, setKeywords] = useState(starterKeywords);
  const [newKeyword, setNewKeyword] = useState('');
  
  const handleChange = (e) => {
    setNewKeyword(e.target.value);
  };
  
  const handleSubmit = (e) => {
    if (newKeyword !== '') {
      setKeywords([
        ...keywords, newKeyword
      ]);
      setNewKeyword('');
    }
  };
  
  const handleClear = (index) => {
    let currentKeywords = [...keywords];
    currentKeywords.splice(index, 1);
    setKeywords(currentKeywords);
  };
  
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
            {keywords.map((keyword, index) => 
              <Grid item key={index} class="list-item">
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <p>{keyword}</p>
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

export default Keywords;