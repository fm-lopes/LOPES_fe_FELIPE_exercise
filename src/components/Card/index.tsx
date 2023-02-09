import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {Container} from './styles';

interface Column {
    key: string;
    value: string;
}

interface Props {
    id?: string;
    url?: string;
    columns: Array<Column>; // @DONE: extracted to type Column
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
}

const Card = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
}: Props): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={(e: Event) => {
                if (hasNavigation) {
                    navigate(url, {
                        state: navigationProps,
                    });
                }
                e.preventDefault();
            }}
        >
            {columns.map((c: Column) => ( // @DONE: changed to extracted type Column
                <p key={c.key}>
                    <strong>{c.key}</strong>&nbsp;{c.value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
