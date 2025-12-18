import {Instance, types} from 'mobx-state-tree';

export const Cat = types
  .model('Cat', {
    id: types.identifier,
    name: types.string,
    age: types.number,
    type: types.string,
  })

export type CatInstance = Instance<typeof Cat>;
