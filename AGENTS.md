# AGENTS.md

## Project type
Static HTML/JS dashboard. No Node toolchain required.

## Tests
Do **NOT** run tests. There is no test suite for this repo.
Never run `npm test`, `npm install`, `pnpm install`, or similar.

## How to verify changes
Open `index.html` in a browser or serve statically:
`python3 -m http.server` then visit `http://localhost:8000/`.
Confirm the dashboard renders and console has no errors.

## Rules
Treat this as a static site. Do not add build steps or package managers unless explicitly requested.
