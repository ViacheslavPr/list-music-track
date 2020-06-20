import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const ListSongs = props => {
  const { dataStore: { userData } } = props;

  return (
    <div style={{padding: '0 5px'}}>
      <table border="1" width="100%" cellPadding="5" style={{border: 'unset'}}>
        <tr>
          <TableHeader>Singer</TableHeader>
          <TableHeader>Song</TableHeader>
          <TableHeader>Ganre</TableHeader>
          <TableHeader>Year</TableHeader>
        </tr>
        {userData.length > 0 && userData.map((value, index) => (
          <TableRow key={index} index={index}>
            <td>{value.singer}</td>
            <td>{value.song}</td>
            <td>{value.ganre}</td>
            <td>{value.year}</td>
          </TableRow>
        ))}
      </table>
    </div>
  );
};

export default inject(stores => {
  return {
    dataStore: stores.dataStore,
  };
})(observer(ListSongs));

const TableHeader = styled.th`
  border: 1px solid white;
  background-color: #efefef;
`;

const TableRow = styled.tr`
  
  td{
    border: 1px solid white;
    background-color: ${({index}) => index % 2 ? '#dedede' : 'white'};
  }
`;
