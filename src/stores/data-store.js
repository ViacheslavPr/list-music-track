import { getRoot, types } from 'mobx-state-tree';
import dataMusic from '../data.json';

const { model, frozen, optional, string, number } = types;

const FilterModel = model({
  singer: optional(string, ''),
  ganre: optional(string, ''),
  year: optional(string, '')
})

const DataStore = model('DataStore', {
  userData: frozen({}),
  page: optional(number, 1),
  pages: optional(number, 1),
  size: optional(number, 5),
  sort: optional(string, ''),
  filter: optional(FilterModel, {}),
})
  .actions(self => ({
    saveUserData: async () => {
      self.userData = dataMusic;
      self.setPages();
    },
    setPages(){
      self.pages = Math.trunc(self.userData.length/(self.size)) + (self.userData.length%(self.size) ? 1 : 0);
    },
    setPage(page){
      self.page = page;
    },
    setSize(size){
      self.size = size;
      self.setPage(1);
      self.setPages();
    },
  }))
  .views(self => ({}));

export default DataStore;
