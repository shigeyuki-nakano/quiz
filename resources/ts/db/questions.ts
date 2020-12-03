import Dexie from 'dexie';
import { Constants } from '@/Constants';
import { getRandom } from '@/functions/getRandom';
import { QuizzesColumns } from '@/types/QuizzesColumns';

const { 
    DB_NAME,
    NUM_OF_QUIZZES
} = Constants;

const DB = new Dexie(DB_NAME);
DB.version(1).stores({quizzes: '++id'});
const quizzes: Dexie.Table<QuizzesColumns, string> = DB.table('quizzes');

export const putQuiz = async (quiz: QuizzesColumns): Promise<void> => {
    await quizzes.put(quiz);
}

export const getQuizs = async (): Promise<QuizzesColumns[]> => {
    return quizzes
        .limit(NUM_OF_QUIZZES)
        .toArray();
}

export const getNumOfQuizRecords = async (): Promise<number> => {
    const totalCount = await quizzes.count();
    return totalCount;
}