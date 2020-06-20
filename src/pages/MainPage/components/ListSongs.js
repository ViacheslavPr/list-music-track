import React, {useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const header = ['Singer', 'Song', 'Ganre', 'Year'];

const ListSongs = props => {
  const { dataStore: { userData, setOrdering, size, page } } = props;
  useEffect(() => {}, [page, size])

  return (
    <div style={{padding: '0 5px'}}>
      <table border="1" width="100%" cellPadding="5" style={{border: 'unset'}}>
        <tr>
          {header.map((head, index) =>
            <TableHeader key={index} onClick={() => setOrdering(head)}>{head}</TableHeader>
          )}
        </tr>
        {userData.length > 0 && userData.slice((page-1) * size, page * size).map((value, index) => (
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
  cursor: pointer;
`;

const TableRow = styled.tr`
  
  td{
    border: 1px solid white;
    background-color: ${({index}) => index % 2 ? '#dedede' : 'white'};
  }
`;
