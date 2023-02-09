import * as React from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import InputSearch from 'components/InputSearch';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';


const MapT = (teams: TeamsList[]) => { // @DONE: Changed to const
    return teams.map(team => {
        const columns = [ // @DONE: changed to const
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const [teams, setTeams] = React.useState<TeamsList[]>([]); // @DONE changed to type TeamsList[]
    const [filteredTeams, setFilteredTeams] = React.useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true); // @DONE any to boolean

    React.useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();
            setTeams(response);
            setFilteredTeams(response);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    const filterTeams = (normalizedValue: string) => {
        setFilteredTeams(teams.filter(t => t.name.toLowerCase().includes(normalizedValue)));
    };

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <InputSearch onChange={filterTeams} />
            <List items={MapT(filteredTeams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
