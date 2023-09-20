import { BaseRepository } from '../repositories';
import firebase from "firebase/compat/app";
export class BaseService<T extends firebase.firestore.DocumentData> {
    readonly repository: BaseRepository<T>;

    constructor(collectionName: string) {
        this.repository = new BaseRepository(collectionName);
    }
}
