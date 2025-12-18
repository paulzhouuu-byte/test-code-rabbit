import AsyncStorage from '@react-native-async-storage/async-storage';
import { StringRepository } from "../domain/interfaces/StringRepository";

const theStringKey = 'the';

export const StringRepositoryAsyncStorage: StringRepository = {
    async readString() {
        try {
            const value = await AsyncStorage.getItem(theStringKey);
            return value || '';
        } catch (error) {
            console.error('Failed to read string from AsyncStorage', error);
            return '';
        }
    },
    async writeString(catsString: string) {
        try {
            await AsyncStorage.setItem(theStringKey, catsString);
        } catch (error) {
            console.error('Failed to write string to AsyncStorage', error);
        }
    },
};

export default StringRepositoryAsyncStorage;