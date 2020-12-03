// クイズ作成画面
import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { pushQuiz, firebaseConfig } from '@/firebase';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Error } from '@/components/Error';
import { Question } from '@/types/Question';
import { QuizzesColumns } from '@/types/QuizzesColumns';

const {
    useState,
    useEffect
} = React;

const Container = styled.div`
    max-width: 800px;
    margin: auto;
`

const InputContainer = styled.div`
    padding: 20px;
    margin-bottom: 10px;
    box-sizing: border-box;
    width: 100%;
`

const Label = styled.label`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`

export const Create = () => {
    const { register, errors } = useForm({
        mode: 'onBlur',
    });
    const [contentValue, setContentValue] = useState('');
    const [answerContents, setAnswerContents] = useState({1: '', 2: '', 3: '', 4: ''});
    const [answer, setAnswer] = useState(1);
    const history = useHistory();

    const changeAnswerContents = (key: number, value: string): void => {
        switch(key) {
            case 1:
                setAnswerContents(prev => ({1: value, 2: prev[2], 3: prev[3], 4: prev[4]}));
            break;
            case 2:
                setAnswerContents(prev => ({1: prev[1], 2: value, 3: prev[3], 4: prev[4]}));
            break;
            case 3:
                setAnswerContents(prev => ({1: prev[1], 2: prev[2], 3: value, 4: prev[4]}));
            break;
            case 4:
                setAnswerContents(prev => ({1: prev[1], 2: prev[2], 3: prev[3], 4: value}));
            break;
        }
    }

    const registerQuestion = () => {
        if(Object.values(errors).length !== 0) return;

        pushQuiz({
            content: contentValue,
            // 答えは配列形式になるため、1引く
            answer: answer - 1,
            answerContents: [answerContents[1], answerContents[2], answerContents[3], answerContents[4]],
        }).then(() => {
            const result = window.confirm('続けて登録を行いますか？');
            if( ! result) {
                history.push('/');
            }
        })
    }

    useEffect(() => {
        console.log(errors);
    })

    return (
        <Container>
            <InputContainer>
                <div>
                    <Label htmlFor='content'>問題内容</Label>
                </div>
                <Input
                    required
                    name='content'
                    placeholder='問題内容'
                    value={contentValue}
                    onChange={(value: any) => setContentValue(value)}
                    inputRef={register({
                        required: '必須項目です',
                        minLength: {
                            value: 1,
                            message: "5文字以上指定してください"    
                        },
                        maxLength: {
                            value: 255,
                            message: "255文字以内で指定してください"
                        }
                    })}
                />
                {errors['content'] && (
                    <Error errors={errors['content']}/>
                )}
            </InputContainer>
            <InputContainer>
                <div>
                    <Label htmlFor='answerContent1'>回答1</Label>
                </div>
                <Input
                    required
                    name='answerContent1'
                    placeholder='回答1'
                    value={answerContents[1]}
                    onChange={(value: any) => changeAnswerContents(1, value)}
                    inputRef={register({
                        required: '必須項目です',
                        minLength: {
                            value: 1,
                            message: "5文字以上指定してください"    
                        },
                        maxLength: {
                            value: 255,
                            message: "255文字以内で指定してください"
                        }
                    })}
                />
                {errors['answerContent1'] && (
                    <Error errors={errors['answerContent1']}/>
                )}
            </InputContainer>
            <InputContainer>
                <div>
                    <Label htmlFor='answerContent2'>回答2</Label>
                </div>
                <Input
                    required
                    name='answerContent2'
                    placeholder='回答2'
                    value={answerContents[2]}
                    onChange={(value: any) => changeAnswerContents(2, value)}
                    inputRef={register({
                        required: '必須項目です',
                        minLength: {
                            value: 1,
                            message: "5文字以上指定してください"    
                        },
                        maxLength: {
                            value: 255,
                            message: "255文字以内で指定してください"
                        }
                    })}
                />
                {errors['answerContent2'] && (
                    <Error errors={errors['answerContent2']}/>
                )}
            </InputContainer>
            <InputContainer>
                <div>
                    <Label htmlFor='answerContent3'>回答3</Label>
                </div>
                <Input
                    required
                    name='answerContent3'
                    placeholder='回答3'
                    value={answerContents[3]}
                    onChange={(value: any) => changeAnswerContents(3, value)}
                    inputRef={register({
                        required: '必須項目です',
                        minLength: {
                            value: 1,
                            message: "5文字以上指定してください"    
                        },
                        maxLength: {
                            value: 255,
                            message: "255文字以内で指定してください"
                        }
                    })}
                />
                {errors['answerContent3'] && (
                    <Error errors={errors['answerContent3']}/>
                )}
            </InputContainer>
            <InputContainer>
                <div>
                    <Label htmlFor='answerContent4'>回答4</Label>
                </div>
                <Input
                    required
                    name='answerContent4'
                    placeholder='回答4'
                    value={answerContents[4]}
                    onChange={(value: any) => changeAnswerContents(4, value)}
                    inputRef={register({
                        required: '必須項目です',
                        minLength: {
                            value: 1,
                            message: "5文字以上指定してください"    
                        },
                        maxLength: {
                            value: 255,
                            message: "255文字以内で指定してください"
                        }
                    })}
                />
                {errors['answerContent4'] && (
                    <Error errors={errors['answerContent4']}/>
                )}
            </InputContainer>

            <InputContainer>
                <div>
                    <Label htmlFor="answer">答え</Label>
                </div>
                <select
                    onChange={(e) => setAnswer(parseInt(e.target.value))}
                    name="answer"
                >
                    <option selected={answer === 1? true: false} value={1}>1</option>
                    <option selected={answer === 2? true: false} value={2}>2</option>
                    <option selected={answer === 3? true: false} value={3}>3</option>
                    <option selected={answer === 4? true: false} value={4}>4</option>
                </select>
            </InputContainer>
            <Button onClick={() => registerQuestion()}>登録</Button>
        </Container>
    )
}