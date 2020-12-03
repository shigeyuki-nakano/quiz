import firebase from 'firebase';
import { QuizzesColumns } from '@/types/QuizzesColumns';

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export const quizzesRef = database.ref('quizzes');

export const pushQuiz = async (data: QuizzesColumns): Promise<void> => {
    const setData = {
        content: data.content,
        answer: data.answer,
        answerContents: data.answerContents
    }
    await quizzesRef.push(setData,
        (error) => {
            if(error) {
                alert('申し訳ございません、内容の登録に失敗しました：' + error);
            } else {
                alert('内容を登録しました');
            }
        }
    );
}