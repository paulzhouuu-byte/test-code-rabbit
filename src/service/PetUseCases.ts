import { CatInstance } from "../domain/stores/Cat";
import CatStore from "../domain/stores/CatStore";
import { DogInstance } from "../domain/stores/Dog";
import DogStore from "../domain/stores/DogStore";

export const findDogsCatsWithSameName = (): [CatInstance[], DogInstance[]] => {
    let dogs: DogInstance[] = [];
    let finalCats: CatInstance[] = [];

    DogStore.dogs.forEach(dog => {
        let cats = CatStore.cats.filter(cat => dog.name === cat.name);

        if (cats.length > 0) {
            finalCats = finalCats.concat(cats);
            dogs.push(dog);
        }
    });

    return [dogs, finalCats];
};