# Blink technical test 

## Features

- The provided JSON is being served by `json-server`. 

- All data is stored via redux. I am sending POST/PATCH requests when a user sends/edits a message, however all actions are optimistic so the store doesn't rely on the responses. Have implemented **very** basic error handling, if any Request rejects I render a fatal error screen.

- Fully Typed

- Bundle splittng - dynamically import `messages` bundle after selecting a conversation.

- Tried to style the UI using Blink colour pallette. I used `styled-components` to implement this. (I remembered you use postcss after doing this! So sorry about that)

- Unit tests using jest, enzyme & redux-mock-store (not full coverage just wanted to demonstrate). Added a custom serializer to capture styles in snapshots.

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
