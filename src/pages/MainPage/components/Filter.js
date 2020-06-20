import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const filterNames = [
  {name:'singer', value: 'Singer'},
  {name:'ganre', value: 'Ganre'},
  {name:'year', value: 'Year'}
];

const Filter = props => {
  const { dataStore: { filterData, setFilter } } = props;

  return (
    <FilterWrap>
      {filterNames.map((item,index) =>
        <WrapSelect key={index}>
          <div>{item.value}</div>
          <Select name={item.name} onChange={(e) => setFilter(item.name, e.target.value)}>
            <option value="">All</option>
            {filterData[item.name].map((val, index) => <option value={val} key={index}>{val}</option>)}
          </Select>
        </WrapSelect>
      )}
    </FilterWrap>
  );
};

export default inject(stores => {
  return {
    dataStore: stores.dataStore,
  };
})(observer(Filter));

const WrapSelect = styled.div`
  padding: 5px 10px;
`;

const FilterWrap = styled.div`
  padding: 10px 10px;
`;

const Select = styled.select`
  width: 100%;
  height: 30px;
`;
