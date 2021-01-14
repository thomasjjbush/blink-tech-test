# Blink technical test 

## What have I done??

- The provided JSON is being served (and persisted) by `json-server`. **I have slightly tweaked the json so I can hit two seperate endpoints (`conversations` & `messages`) to try and more closely simulate a production scenario (I hope this isnt classed as cheating or anything!!!)**. 

- All data is stored via redux (ui binding via react-redux). Store layout: `{ conversations: Conversations[]; messages: Messages[] }`.

- Bundle splittng - dynamically impoort `messages` bundle after selecting a conversation.

- User can both send and edit messages (if it was "sent" by them).

- Tried to style the UI using Blink colour pallette.

- **Very** basic error handling, if any Promise rejects render a fatal error screen.

- Unit tests (not full coverage just wanted to demonstrate).

## Getting started
Run `yarn` to install dependancies

## Tests
Run `yarn test` to run all unit tests

## Mock server
Run `yarn server` to run `json-sever` (in seperate terminal to `yarn start`)

## Development
Run `yarn start` for webpack development mode with hot reloading

## Build
Run `yarn build` to build production bundle (output dir is /dist)
