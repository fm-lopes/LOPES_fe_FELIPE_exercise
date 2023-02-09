import * as React from 'react';

interface Props {
    onChange?: (e: any) => void;
}

const Card = ({
    onChange,
}: Props): JSX.Element => {

    const handleChange = (e: any) => {
        return onChange(e.target.value.toLowerCase());
    };

    return (
        <input type="text" data-testid="input-search" onChange={handleChange} />
    );
};

export default Card;
