import {Instance, types} from 'mobx-state-tree';

export const Dog = types
  .model('Dog', {
    id: types.identifier,
    name: types.string,
    age: types.number,
    type: types.string,
  })

export type DogInstance = Instance<typeof Dog>;
