import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  
  // const starterKeywords = [
  //   'Shoes',
  //   'Shoes carnival',
  //   'Shoes palace',
  //   'Shoes stores near me',
  //   'Shoes for crew',
  //   'Shoes station',
  //   'Shoes repair',
  //   'Shoes store',
  //   'Shoes for women',
  //   'Shoes fashion week',
  //   'Shoes instagram',
  //   'Shoes stories',
  //   'Shoes show'
  // ];

  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  
  const handleChange = (e) => {
    setNewKeyword(e.target.value);
  };
  
  const handleSubmit = (e) => {
    // if (newKeyword !== '') {
    //   setKeywords([
    //     ...keywords, newKeyword
    //   ]);
    //   setNewKeyword('');
    // }
    console.log(newKeyword);
    axios.post(KEYWORDS_URL, {
      data: newKeyword
    })
    .then(res => {
      console.log(res.data.keywords);
      setKeywords(res.data.keywords);
      setNewKeyword('');
    })
    .catch(err => console.log(err));
  };
  
  const handleClear = (id) => {
    // let currentKeywords = [...keywords];
    // currentKeywords.splice(index, 1);
    // setKeywords(currentKeywords);
    console.log(id);
    axios.post(KEYWORDS_URL, {
      keyword_id: id
    })
    .then(res => {
      console.log(res.data.keywords);
      setKeywords(res.data.keywords);
    })
    .catch(err => console.log(err));
  };
  
  useEffect(() => {
    axios.get(KEYWORDS_URL)
    .then(res => {
      console.log(res.data.keywords);
      setKeywords(res.data.keywords);
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
              <Grid item key={keyword.keyword_id} class="list-item">
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <p>{keyword.data}</p>
                  </Grid>
                  <Grid item>
                    <Button size="small" variant="outlined" className={classes.removeButton} startIcon={<RemoveCircleOutline />} onClick={() => handleClear(keyword.keyword_id)}>Clear</Button>
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