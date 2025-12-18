import { StringRepository } from "../domain/interfaces/StringRepository";

const keyStringsMap = new Map<string, string>();

export const StringRepositoryText: StringRepository = {
    async readString(key: string): Promise<string> {
        const value = keyStringsMap.get(key);
        return value || '';
    },
    async writeString(key: string, theString: string): Promise<void> {
        keyStringsMap.set(key, theString);
    },
};

export default StringRepositoryText;