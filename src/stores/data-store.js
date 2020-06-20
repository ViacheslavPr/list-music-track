import { types } from 'mobx-state-tree';
import dataMusic from '../data.json';

const { model, frozen, optional, string, number, array } = types;

const FilterModel = model({
  singer: optional(string, ''),
  ganre: optional(string, ''),
  year: optional(string, '')
})

const FilterDataModel = model({
  singer: optional(array(string), []),
  ganre: optional(array(string), []),
  year: optional(array(string), []),
});

const DataStore = model('DataStore', {
  userData: frozen({}),
  changeData: frozen({}),
  page: optional(number, 1),
  pages: optional(number, 1),
  size: optional(number, 5),
  order: optional(string, ''),
  filter: optional(FilterModel, {}),
  filterData: optional(FilterDataModel, {}),
})
  .actions(self => ({
    saveUserData: async () => {
      self.userData = dataMusic;
      self.changeData = dataMusic;
      for (let key in self.filterData){
        self.filterData[key] = self.unique(dataMusic.map(value => value[key])).sort((a,b) => {
          if (key === "year") return a - b;
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
      }
      self.setPages(self.size);
    },
    setPages(size){
      self.pages = Math.trunc(self.userData.length/(size)) + (self.userData.length%(size) ? 1 : 0);
    },
    setPage(page){
      self.page = page;
    },
    setSize(size){
      self.size = size;
      self.setPage(1);
      self.setPages(size);
    },
    setOrdering(order){
      const orderLower = order.toLowerCase();
      self.order = self.order === order ? `-${order}` : order;
      self.userData = JSON.parse(JSON.stringify(self.changeData)).sort(function(a, b) {
        if (order === self.order){
          if (order === "Year") return a[orderLower] - b[orderLower];
          if (a[orderLower] > b[orderLower]) return 1;
          if (a[orderLower] < b[orderLower]) return -1;
          return 0;
        }
        if (order === "Year") return b[orderLower] - a[orderLower];
        if (b[orderLower] > a[orderLower]) return 1;
        if (b[orderLower] < a[orderLower]) return -1;
        return 0;
      });
      self.setPage(1);
    },
    setFilter(name, value){
      self.filter[name] = value;
      self.userData = JSON.parse(JSON.stringify(self.changeData)).filter(value => {
        if (
            (!self.filter.year || value.year === self.filter.year) &&
            (!self.filter.ganre || value.ganre === self.filter.ganre) &&
            (!self.filter.singer || value.singer === self.filter.singer)
        ) return true;
        return false;
      })
      self.setPages(self.size);
      self.setPage(1);
    },
  }))
  .views(self => ({
    unique(arr) {
      let result = [];
      for (let str of arr) {
        if (!result.includes(str)) {
          result.push(str);
        }
      }
      return result;
    }
  }));

export default DataStore;
