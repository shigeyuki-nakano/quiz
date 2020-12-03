// クイズ出題画面
import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { quizzesRef } from '@/firebase';
import { getRandom } from '@/functions/getRandom';

import { QuizzesColumns } from '@/types/QuizzesColumns';
import { QuizzesColumnsWithKey } from '@/types/QuizzesColumnsWithKey';
import { Question } from '@/types/Question';
import { Button } from '@/components/Button';


const {useState, useEffect} = React;

const Container = styled.div`
    max-width: 800px;
    margin: auto;
`

const QuizContainer = styled.div`
    width: 100%;
    border: 1px solid gray;
    padding: 40px 0;
    text-align: center;
`

const QuizContent = styled.p`
    font-size: 35px;
    font-weight: bold;
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const ModalWrap = styled.div`
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &.active {
        display: block;
    }
`

const ModalBg = styled.div`
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    cursor: pointer;
`

const Modal = styled.div`
    background-color: white;
    max-width: 90%;
    width: 800px;
    padding: 40px;
    box-sizing: border-box;
    /* margin: auto; */
    position: absolute;
    border-radius: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`

interface Props {
    quizzes: QuizzesColumnsWithKey[];
    setUserAnswers: (userAnswers: number[]) => void;
    setResults: (results: boolean[]) => void;
    setCanResultAccess: (canResultAccess: boolean) => void;
    setQuizzes: (quizzes: QuizzesColumnsWithKey[]) => void;
}

export const Quiz: React.FC<Props> = (props) => {
    const [quiz, setQuiz] = useState({content: '', answer: 0, answerContents: [''], key: ''});
    const [count, setCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [results, setResults]: [boolean[], any] = useState([]);
    const [userAnswers, setUserAnswers]: [number[], any] = useState([]);
    const history = useHistory();
    const quizLength = 5

    useEffect((): void => {
        if(count === quizLength) {
            console.log('owari');
            // ユーザの答えた番号をセットする
            props.setUserAnswers(userAnswers);
            // 答えた結果をセットする
            props.setResults(results);
            // 結果画面にアクセスできるようにする
            props.setCanResultAccess(true);
            history.push('/result');
        }
        const nextQuiz: QuizzesColumnsWithKey = props.quizzes[count];
        console.log(props.quizzes);
        setQuiz(nextQuiz);
    }, [count]);

    const getAnswer = (userAnswer: number) => {
        let result = userAnswer === quiz.answer;
        setResults([...results, result]);
        setUserAnswers([...userAnswers, userAnswer]);
        setShowModal(true);
    }

    const getNext = () => {
        setShowModal(false);
        setCount(count + 1);
    }

    useEffect(() => {
        quizzesRef
        .on('value', (data) => {
            const arrangedData = new Promise((resolve: (value: QuizzesColumnsWithKey[]) => void) => {
                const quizzesData: {[key: string]: QuizzesColumns} = data.val();
                const entries: Array<[string, QuizzesColumns]> = Object.entries(quizzesData);
                const arrangedQuizzesData: QuizzesColumnsWithKey[] = entries.map((entry, i) => {
                    const [key, quizzesColumns]: [string, QuizzesColumns] = entry;
                    return {key: key, ...quizzesColumns}
                });
                resolve(arrangedQuizzesData)
            })

            arrangedData
            .then((arrangedData) => choiceData(arrangedData))
            .then((choicedData) => setQuizzesData(choicedData));
        });

        const choiceData = (arrangedData: QuizzesColumnsWithKey[]): QuizzesColumnsWithKey[] => {
            let choicedQuizzesData: QuizzesColumnsWithKey[] = [];
            let i: number = 0;
            const registerdIndex: number[] = [];
            while(i < quizLength) {
                const resultNum: number = getRandom(arrangedData.length);
                console.log(resultNum);
                // 問題重複防止
                if(registerdIndex.includes(resultNum)) {
                    continue;
                } else {
                    i++
                    registerdIndex.push(resultNum);
                }
                const targetQuizzesData: QuizzesColumnsWithKey = arrangedData[resultNum];
                const {content, answer, answerContents, key} = targetQuizzesData;
                choicedQuizzesData.push({
                    content: content,
                    answer: answer,
                    answerContents: answerContents,
                    key: key
                });
            }
            return choicedQuizzesData;
        }

        const setQuizzesData = (choicedData: QuizzesColumnsWithKey[]) => {
            props.setQuizzes(choicedData);
            setQuiz(choicedData[0]);
        }
    }, []);
    
    useEffect(() => {
        console.log(props.quizzes);
    }, [props.quizzes])

    return (
        <>
            <Container>
                <QuizContainer>
                    <QuizContent>{count + 1}問目：{quiz.content}</QuizContent>
                </QuizContainer>
                <ButtonContainer>
                    {quiz.answerContents.map((answer: string, i: number) => (
                        <Button
                            key={i}
                            onClick={() => getAnswer(i)}
                        >{answer}</Button>
                    ))}
                </ButtonContainer>
            </Container>
            <ModalWrap
                className={showModal? 'active': ''}
            >
                <ModalBg
                    onClick={() => getNext()}>
                    <Modal>
                        {results[count]? '正解！': '不正解！'}
                        {quiz.answerContents[quiz.answer]}
                    </Modal>
                </ModalBg>
            </ModalWrap>
        </>
    )
}