import * as React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 5px 20px 5px 20px;
    width: 100%;
    border-radius: 10px;
    box-sizing: border-box;
`

interface Props {
    placeholder?: string;
    name: string;
    onChange: (value: string | number) => void;
    onBlur?: (value: string) => boolean | undefined;
    value: string | number;
    required: boolean;
    inputRef: any;
}

export const Input: React.FC<Props> = ({placeholder, name, onChange, value, required, inputRef}) => {
    return (
        <StyledInput
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            ref={inputRef}
        />
    )
}