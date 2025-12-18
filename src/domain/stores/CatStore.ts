import { Cat, CatInstance } from './Cat';

import NativesRepo from '../../data/StringRepositoryNatives';
import RepositoryFactory from '../interfaces/RepositoryFactory';
import { StringRepository } from '../interfaces/StringRepository';
import TextRepo from '../../data/StringRepositoryText';
import { types } from 'mobx-state-tree';

let theStringKey = 'cats';

const CatStore = types
.model('CatStore', {
    cats: types.array(Cat),
})
.actions(self => ({
    findCats(name: string) : CatInstance[]{
        return self.cats.filter(cat => cat.name === name);
    },
    async readCats() {
        try {
            const catsString = await RepositoryFactory.getStringRepository().readString(theStringKey);
            if (catsString) {
                self.cats = JSON.parse(catsString);
            }
        } catch (error) {
            console.error('Failed to read cats from storage', error);
        }
    },
    async writeCats() {
        try {
            await RepositoryFactory.getStringRepository().writeString(theStringKey, JSON.stringify(self.cats));
        } catch (error) {
            console.error('Failed to write cats to storage', error);
        }
    },
}))
.actions(self => ({
    addCat(name: string) {
        const cat = Cat.create({id: Date.now().toString(), name: name, age: 0, type: 'cat'});
        self.cats.push(cat);
        self.writeCats();
    },
    deleteCat(id: string) {
        const theCat = self.cats.find(cat => cat.id === id);
        if (theCat) {
            self.cats.remove(theCat);
            self.writeCats();
        }
    },
    updateCat(name: string, age: number) {
        self.findCats(name).forEach(cat => cat.age = age);
        self.writeCats();
    },
    afterCreate() {
        self.readCats();
    },
}))
.create();

export default CatStore;
export type CatStoreInstance = typeof CatStore;