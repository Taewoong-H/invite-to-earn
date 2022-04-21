import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('W1ILN24TP3', 'cf48b00fb24a0df99c1d79856e21cd62');

const TestSearch = () => {
  const [isHit, setIsHit] = useState(false);
  const startSearch = (event) => {
    event.preventDefault();
    setIsHit(true);
    console.log(isHit);
  };
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_services">
      <SearchBox onSubmit={startSearch} />
      {isHit ? <Hits /> : 'dd'}
      {/* <Hits /> */}
    </InstantSearch>
  );
};

export default TestSearch;
