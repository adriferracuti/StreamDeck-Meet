# Description

Fork of [StreamDeck-Meet](https://github.com/petele/StreamDeck-Meet) that adds support for:
- Requesting IFTTT web hook for toggling my smart plug when the call starts/ends
- Requesting local running tiny API that launches/kills OBS when the call starts/ends

# Setup

1. Boot a home assistant instance somewhere, generate an API token and copy it
2. Add `HASS_SERVER=<home-assistant-host>` and `HASS_TOKEN=<home-assistant-token>` to `~/.zshenv`
3. Install PHP 8.x (`brew install php`)
4. Install and configure OBS
5. Add `shell-server/start-server` to the start-up (see next paragraph). The server will run on port 6780. 
6. Connect the Elgato Stream Deck
7. Load the extension on Chrome

## Add start-server to start up on Mac

1. Automator -> Application -> "Run Shell Script" `<repo-path>/shell-server/start-server &> /dev/null &`
2. Export to application folder
3. Add app to login items

