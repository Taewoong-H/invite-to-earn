import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('W1ILN24TP3', 'cf48b00fb24a0df99c1d79856e21cd62');

const TestSearch = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_services">
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
};

export default TestSearch;
