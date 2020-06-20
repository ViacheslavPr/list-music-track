import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const pageSize = [5, 10, 25, 50, 100];

const Pagination = props => {
  const { dataStore: { pages, page, size, setPage, setSize } } = props;
  let pageArray = [];
  for (let i = 1; i <= pages; i++){pageArray.push(i);}
  return (
      <div style={{padding: '10px', display: 'flex', justifyContent: 'space-between'}}>
        <PageSize>
          {pageArray.map((val, index) =>
            <PageSpan
                key={index}
                use={page === index + 1}
                onClick={() => setPage(index + 1)}
            >{index + 1}</PageSpan>
          )}
        </PageSize>
        <PageSize>
          {pageSize.map((val, index) =>
            <SizeSpan
                key={index}
                takeSize={val === size}
                onClick={() => setSize(val)}
            >{val}</SizeSpan>
          )}
        </PageSize>
      </div>
  );
};

export default inject(stores => {
  return {
    dataStore: stores.dataStore,
  };
})(observer(Pagination));

const PageSize = styled.div`
  display: inline-block;
  span{
    cursor: pointer;
  }
`;

const SizeSpan = styled.span`
  margin: 0 0 0 10px;
  color: ${({takeSize}) => takeSize ? 'red' : 'black'};
`;

const PageSpan = styled.span`
  margin: 0 10px 0 0;
  color: ${({use}) => use ? 'red' : 'black'};
`;
