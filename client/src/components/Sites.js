import React, { useState, useEffect } from 'react';

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
    e.preventDefault();
    setSites([
      ...sites, newSite
    ]);
    setNewSite('');
  };
  
  const handleClear = (index) => {
    let currentSites = [...sites];
    currentSites.splice(index, 1);
    setSites(currentSites);
  };
  
  return (
    <div>
      <h2>Sites</h2>
      <form>
        <input type="text" name="sitess" placeholder="Enter your site here" value={newSite} onChange={handleChange} />
        <input type="submit" value="Add" onClick={handleSubmit} />
      </form>
      <ul>
        {sites.map((site, index) => 
          <li key={index}>
            <p>{site}</p>
            <button onClick={() => handleClear(index)}>Clear</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sites;