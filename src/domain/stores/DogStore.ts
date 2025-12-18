import { Dog, DogInstance } from '../stores/Dog';

import Natives from '../../data/StringRepositoryNatives';
import RepositoryFactory from '../interfaces/RepositoryFactory';
import { StringRepository } from '../interfaces/StringRepository';
import { types } from 'mobx-state-tree';

let theStringKey = 'dogs';

const DogStore = types
.model('DogStore', {
    dogs: types.array(Dog),
})
.actions(self => ({
    findDogs(name: string) : DogInstance[]{
        return self.dogs.filter(dog => dog.name === name);
    },
    async readDogs() {
        try {
            const dogsString = await RepositoryFactory.getStringRepository().readString(theStringKey);
            if (dogsString) {
                self.dogs = JSON.parse(dogsString);
            }
        } catch (error) {
            console.error('Failed to read dogs from storage', error);
        }
    },
    async writeDogs() {
        try {
            await RepositoryFactory.getStringRepository().writeString(theStringKey, JSON.stringify(self.dogs));
        } catch (error) {
            console.error('Failed to write dogs to storage', error);
        }
    },
    addDog(name: string, age: number) {
        const dog = Dog.create({id: Date.now().toString(), name: name, age: age, type: 'dog'});
        self.dogs.push(dog);
        this.writeDogs();
    },
    deleteDog(name: string) {
        this.findDogs(name).forEach(dog => self.dogs.remove(dog));
        this.writeDogs();
    },
    updateDog(name: string, age: number) {
        this.findDogs(name).forEach(dog => dog.age = age);
        this.writeDogs();
    },
    afterCreate() {
        //self.readDogs();
    },
}))
.create();

export default DogStore;
export type DogStoreInstance = typeof DogStore;