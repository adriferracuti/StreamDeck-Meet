# Description

Fork of [StreamDeck-Meet](https://github.com/petele/StreamDeck-Meet) that adds support for:
- Requesting IFTTT web hook for toggling my smart plug when the call starts/ends
- Requesting local running tiny API that launches/kills OBS when the call starts/ends

# Setup

## Steps

1. Install PHP 8.x
2. Install and configure OBS
3. Add `shell-server/start-server` to the start up (see next paragraph). The server will run on port 6780.
4. Connect the Elgato Stream Deck
5. Load the extension on Chrome

## Add start-server to start up on Mac

1. Automator -> "Run Shell Script" `<repo-path>/shell-server/start-server &> /dev/null &` (redirection to /dev/null needed, otherwise gets stuck)
2. Export to application folder
3. Add app to login items

