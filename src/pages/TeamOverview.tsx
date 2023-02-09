import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const mapArray = (users: UserData[]) => { // @DONE: changed to const
    return users.map(u => {
        const columns = [ // @DONE: changed to const
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

const mapTLead = tlead => { // @DONE: changed to const
    const columns = [ // @DONE: changed to const
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${tlead.id}`} navigationProps={tlead} />;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const getTeamUsers = async () => { // @DONE: changed to const
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);

            // @DONE: Used Promise.all to query all users in parallel
            const promises = [
                getUserData(teamLeadId),
                ...teamMemberIds.map(tm => getUserData(tm)),
            ];

            const [teamLead, ...teamMembers] = await Promise.all(promises);

            setPageData({
                teamLead,
                teamMembers,
            });
            setIsLoading(false);
        };
        getTeamUsers();
    }, [teamId]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && mapTLead(pageData.teamLead)}
            <List items={mapArray(pageData?.teamMembers ?? [])} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
