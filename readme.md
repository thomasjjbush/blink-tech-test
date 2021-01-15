# Blink technical test 

I spent more than the recommended 2 hours and the code is still far way from productionn ready or anything. However, I think it nicely demonstrates my approach and style. Hope you like it!

## Features

- The provided JSON is being served by a mock server (`json-server`, exposes two endpoints `conversations`, `messages`). 

- All data is stored via redux (with thunk). I am sending POST/PATCH requests when a user sends/edits a message, however all actions are optimistic so the store doesn't rely on the responses. Have implemented **very** basic error handling - if any Request rejects I render a fatal error screen.

- TypeScript

- Bundle splittng - dynamically import `messages` bundle after selecting a conversation. This keeps the main bundle lightweight.

- Tried to style the UI using the Blink colour pallette. I used `styled-components` to implement this. (I remembered you use postcss after doing this! Otherwise I would have used that - sorry about that)

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
