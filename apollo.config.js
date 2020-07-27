/**
 * Config file for Apollo's VS Code plugin and for the command `yarn codegen`
 * Apollo's GraphQL plugin: https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo
 */
module.exports = {
    client: {
        service: {
            name: 'troup-localhost',
            url: 'http://localhost:4000/graphql',
            skipSSLValidation: true,
        },
        includes: ['./src/components/**/*.tsx', './src/data/**/*.ts'],
    },
};
