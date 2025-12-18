import { NativeModules } from 'react-native';
import { StringRepository } from "../domain/interfaces/StringRepository";

const { RNModuleCommon } = NativeModules;
const catFileName = 'cats.txt';

export const StringRepositoryNatives: StringRepository = {
    async readString(key: string): Promise<string> {
        try {
            const value = await RNModuleCommon.readFromEncryptedFile(key);
            return value || '';
        } catch (error) {
            console.error('Failed to read string from native module', error);
            return '';
        }
    },
    async writeString(key: string, catsString: string): Promise<void> {
        try {
            await RNModuleCommon.writeToEncryptedFile(key, catsString);
        } catch (error) {
            console.error('Failed to write string to native module', error);
        }
    },
};

export default StringRepositoryNatives;