import { gql } from '@apollo/client';

export const FragmentUserTeamDetails = gql`
    fragment FragmentUserTeamDetails on User {
        ownerTeams {
            id
            name
            displayName
            createdAt
        }
        memberTeams {
            id
            name
            displayName
            createdAt
        }
    }
`;
