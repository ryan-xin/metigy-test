import React, { useState, useEffect } from 'react';

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
    e.preventDefault();
    setKeywords([
      ...keywords, newKeyword
    ]);
    setNewKeyword('');
  };
  
  const handleClear = (index) => {
    // TODO:
    let currentKeywords = [...keywords];
    currentKeywords.splice(index, 1);
    setKeywords(currentKeywords);
  };
  
  return (
    <div>
      <h2>Keywords</h2>
      <form>
        <input type="text" name="keywords" placeholder="Enter your keywords here (shoes)" value={newKeyword} onChange={handleChange} />
        <input type="submit" value="Add" onClick={handleSubmit} />
      </form>
      <ul>
        {keywords.map((keyword, index) => 
          <li key={index}>
            <p>{keyword}</p>
            {/* TODO: */}
            <button onClick={() => handleClear(index)}>Clear</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Keywords;