import { StringRepository } from './StringRepository';

class RepositoryFactory {
    private static stringRepository: StringRepository;

    static setStringRepository(repository: StringRepository) {
        this.stringRepository = repository;
    }

    static getStringRepository(): StringRepository {
        if (!this.stringRepository) {
            throw new Error('StringRepository is not set');
        }
        return this.stringRepository;
    }
}

export default RepositoryFactory;