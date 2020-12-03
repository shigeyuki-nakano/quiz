import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    cursor: pointer;
    padding: 10px 50px;

    &.red {
        background-color: red;
    }
    &.blue {
        background-color: blue;
    }
    &.green {
        background-color: green;
    }
`

interface Props {
    onClick: (e: any) => void;
    color?: string;
    children: string;
}

export const Button: React.FC<Props> = (props) => {
    const { onClick, color, children } = props;

    return (
        <StyledButton
            onClick={onClick}
            className={color? color: ''}
        >{children}</StyledButton>
    )
}