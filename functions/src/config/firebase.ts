import {getConfig} from './config';
import {initializeApp} from 'firebase-admin/app';
import admin from 'firebase-admin';
import {getFirestore} from 'firebase-admin/firestore';

const serviceAccount:any = getConfig('GOOGLE_APPLICATION_CREDENTIALS');


const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount)
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestoreInstance = getFirestore();
