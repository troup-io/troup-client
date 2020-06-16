<p align="center"><img src="https://repository-images.githubusercontent.com/259775937/548b6b00-9a47-11ea-864f-a6d905f657c6" alt="troup-banner" width="300" /></p>

# Troup Client

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/troup) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com) [![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat)](https://www.firsttimersonly.com/)

> ### 📢 We are looking for contributors!
>
> This project is under heavy development and is on the lookout for contributors both technical and ono-technical. If you are interested in understanding the product and contributing, do get in touch at hello@troupapp.com.

The Troup client is the frontend app that helps the user address problems that we aim to solve. The client is built atop wonderful open-source projects with the goal of providing a fluid experience to the user.

**Languages:**

-   [Typescript][typescript]

**Framework:**

-   [Next][next]

**Libraries:**

-   [Apollo Client][apollo-client]

**Design system:**

-   [Styled Components][styled-components]
-   [Primer Components][primer-components]

## Setting up environment variables

You will need to create a `.env` file in the root folder. The instructions on setting those up are available within this example:

-   [Root environment variables](https://github.com/troup-io/troup-client/blob/master/example.env)

## Available scripts

### `yarn dev`

Start the development server and watch for file changes.

### `yarn build`

Build the production-optimised bundle for deployment.

### `yarn start`

Deploy the production-optimised bundle locally to test and simulate the production environment.

### `yarn codegen`

Generate the types from the server. If you have the Apollo plugin for VS Code it should do this automatically, but this generation is an alternate way of generating the code.

### `yarn lint`

Run the linter, catching out any errors or warning that may occur.

[typescript]: https://www.typescriptlang.org/
[next]: https://www.nextjs.org
[apollo-client]: https://www.apollographql.com/docs/react/v3.0-beta
[styled-components]: https://styled-components.com/
[primer-components]: https://primer.style/
