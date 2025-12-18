export interface StringRepository {
     readString(key: string): Promise<string>
     writeString(key: string, catsString: string): Promise<void>
}

