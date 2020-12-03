// 結果表示画面
import * as React from 'react';
import { Question } from '@/types/Question';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { pushQuiz } from '@/firebase';

const { useEffect, useState } = React;

const Container = styled.div`
    max-width: 800px;
    margin: auto;
`

interface Props {
    userAnswers: number[];
    questions: Question[];
    results: boolean[];
    setCanResultAccess: (canResultAccess: boolean) => void;
    canResultAccess: boolean;
}

export const Result: React.FC<Props> = (props) => {
    const {
        userAnswers,
        questions,
        results,
        setCanResultAccess,
        canResultAccess
    } = props
    const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if( ! canResultAccess) {
            history.push('/');
        }

        let count: number = 0;
        results.forEach((result: boolean) => {
            if(result) {
                count++;
            }
        })
        setCountCorrectAnswer(count);
        // 結果画面にアクセスできないようにする
        setCanResultAccess(false)
    }, [])

    return (
        <Container>
            <button onClick={() => history.push('/')}>トップページへ</button>
            <button onClick={() => history.push('/quiz')}>もう一度やる</button>
            <h2>正解数：{countCorrectAnswer}</h2>
            {questions.map((q: Question, i: number) => (
                <div key={i} style={{borderBottom: '1px solid black',}}>
                    <p>内容：{q.content}</p>
                    <p>正解：{q.answerContents[q.answer]}</p>
                    <p>出した答え：{q.answerContents[userAnswers[i]]}</p>
                    <p>結果：{results[i]? '正解': '不正解'}</p>                                        
                </div>
            ))}

        </Container>
    )
}