// トップページ
import * as React from 'react';
import styled from 'styled-components';
import {
    Link,
    useHistory
} from 'react-router-dom';

import { Button } from '@/components/Button';


const Container = styled.div`
    max-width: 800px;
    margin: auto;
    padding-top: 70px;
`

const TitleWrap = styled.div`
    display: block;
    text-align: center;
`

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    jusify-content: space-between;
`

const Header = styled.header`
    width: 100%;
    height: 70px;
    background-color: white;
    border-bottom: 1px solid black;
    position: fixed;
    top: 0;
    left: 0;
`

export const Top = () => {
    const history = useHistory();
    return (
        <>
            <Header>
                <Button onClick={() => history.push('/create')}>問題を作成する</Button>
            </Header>
            <Container>
                <TitleWrap>
                    <Title>quiz</Title>
                </TitleWrap>
                <ButtonContainer>
                    <Button
                        onClick={() => history.push('/quiz')}
                    >ゲームスタート</Button>
                    <Button
                        onClick={() => history.push('/ranking')}    
                    >ランキングを見る</Button>
                </ButtonContainer>
            </Container>
        </>
    )
}