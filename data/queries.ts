import { gql } from '@apollo/client';

export const GET_TEAM_BY_NAME = gql`
    query GetTeamByName($name: String!) {
        teamDetailsFromName(name: $name) {
            id
            name
            displayName
        }
    }
`;

export const GET_USER_DETAILS = gql`
    query GetUserDetails {
        userDetails {
            id
            email
            profile {
                firstName
                lastName
            }
        }
    }
`;
