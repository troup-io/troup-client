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

export const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            id
            sequence
            name
            createdAt
        }
    }
`;

export const GET_TICKETS = gql`
    query GetTickets($projectSequence: Int!) {
        tickets(projectSequence: $projectSequence) {
            id
            sequence
            createdAt
            title
            author {
                profile {
                    firstName
                    lastName
                }
            }
            labels {
                id
                foreground
                background
                value
            }
        }
    }
`;
