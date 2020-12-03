import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { Question } from '@/types/Question';

import { Top } from '@/pages/top';
import { Quiz } from '@/pages/quiz';
import { Ranking } from '@/pages/ranking';
import { Result } from '@/pages/result';
import { Create } from '@/pages/create';

const { useState } = React;

const App = () => {
    const testQuestions = [
        {
            content: 'サランラップは元々何に使われていた？',
            answer: 0,
            answerContents: ['水虫から守る中履き', '    ', '発砲音防止', '  ']
        },
        {
            content: '織田信長は死に際に何と言った？',
            answer: 2,
            answerContents: ['泣かぬなら諭してしまえバラライカ', '泣かぬなら殺してしまえホトトギス', '人生50年', '猿も木から落ちる']
        },
        {
            content: 'しらすは何の魚の稚魚？',
            answer: 3,
            answerContents: ['ホタテ', 'イルカ', 'オードリー若松', 'イワシ']
        },
        {
            content: '4問目です',
            answer: 3,
            answerContents: ['ホタテ', 'イルカ', 'オードリー若松', 'イワシ']
        },
        {
            content: '5問目です',
            answer: 3,
            answerContents: ['ホタテ', 'イルカ', 'オードリー若松', 'イワシ']
        }
    ];
    const [quizzes, setQuizzes] = useState([{content: '', answer: 0, answerContents: [''], key: ''}]);
    const [userAnswers, setUserAnswers] = useState([0]);
    const [results, setResults] = useState([false]);
    const [canResultAccess, setCanResultAccess] = useState(false);

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Top/>
                    </Route>
                    <Route exact path="/quiz">
                        <Quiz
                            quizzes={quizzes}
                            setQuizzes={setQuizzes}
                            setUserAnswers={setUserAnswers}
                            setResults={setResults}
                            setCanResultAccess={setCanResultAccess}
                        />
                    </Route>
                    <Route exact path="/ranking">
                        <Ranking/>
                    </Route>
                    <Route exact path="/result">
                        <Result
                            questions={testQuestions}
                            userAnswers={userAnswers}
                            results={results}
                            canResultAccess={canResultAccess}
                            setCanResultAccess={setCanResultAccess}
                        />
                    </Route>
                    <Route exact path="/create">
                        <Create/>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

const app = document.getElementById('app');

ReactDOM.render(<App/>, app);