import { types } from 'mobx-state-tree';
import DataStore from './data-store';

export const RootStore = types.model('RootStore', {
  dataStore: DataStore,
});

export const stores = RootStore.create({
  dataStore: {},
});
