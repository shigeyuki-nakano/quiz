import * as React from 'react';
import { isPropertySignature } from 'typescript';
import styled from 'styled-components';

const ErrorContent = styled.div`
    color: red;
`

interface Props {
    errors: any;
}

export const Error: React.FC<Props> = ({errors}) => {
    return (
        <div>
            <ErrorContent>
                {errors.message}
            </ErrorContent>
        </div>
    )
}