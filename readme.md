# Blink technical test 

I spent more than the recommended 2 hours and the code is still far way from production ready or anything. It's using `react`, `redux`, `typescript`, `jest`, `enzyme`, `styled-components`, `webpack` (see full dependancy list in `package.json`). I hope you like it! 🤞

## Features

- The provided JSON is being served by a mock server (`json-server`, exposes two endpoints `conversations`, `messages`). 

- All data is stored via redux (using thunk middleware). I am sending POST/PATCH requests when a user sends/edits a message, however all actions are optimistic so the store doesn't rely on the responses. Have implemented **very** basic error handling - if any Request rejects I render a fatal error screen.

- TypeScript

- Bundle splittng - dynamically import `messages` bundle only after selecting a conversation. This keeps the main bundle lightweight.

- Tried to style the UI using the Blink colour pallette. I used `styled-components` to implement this. (I remembered you use postcss after doing this! Otherwise I would have used that - sorry about that)

- Unit tests using `jest`, `enzyme` & `redux-mock-store` (not full coverage just wanted to demonstrate). Also added a custom serializer to capture styles in snapshots.

## Improvements

- ARIA

- I am concerned the messages module is a little "crowded", could possibly benefit from further code splitting.

- The UI is not fully responsive.

- Error handling for non fatal errors.

- Full unit test coverage

- Functional tests to cover user journeys (i.e I select a conversation, I should be able to edit message, I should see my edit result in updated UI)

- Though a portion of the styles are captured via snapshots - would like to have implemented visual regression testing.

## Getting started
Run `yarn` to install dependancies

## Tests
Run `yarn test` to run all unit tests

## Mock server
Run `yarn server` to run mock server (in seperate terminal to `yarn start`)

## Development
Run `yarn start` for webpack development mode with hot reloading

## Build
Run `yarn build` to build production bundle (output dir is /dist)
