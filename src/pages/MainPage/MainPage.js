import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import ListSongs from './components/ListSongs';
import Pagination from './components/Pagination';
import Filter from './components/Filter';

const MainPage = props => {
  const { dataStore: { saveUserData } } = props;
  useEffect(() => {saveUserData()}, [])
  return (
      <div style={{backgroundColor: '#dedede', minHeight: 50, padding: 5}}>
        <div style={{display: 'flex'}}>
          <div style={{
            display: 'inline-block',
            minHeight: 40,
            width: '70%',
            backgroundColor: 'white',
            textAlign: 'left'
          }}>
            <ListSongs/>
          </div>
          <div style={{
            display: 'inline-block',
            minHeight: 40,
            width: '30%',
            backgroundColor: 'white'
          }}>
            <Filter/>
          </div>
        </div>
        <div>
          <Pagination/>
        </div>
      </div>
  );
};

export default inject(stores => {
  return {
    dataStore: stores.dataStore,
  };
})(observer(MainPage));