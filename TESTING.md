# TESTING

## Unit Tests
Unit tests in `index.test.mjs` for `getUniqLanguages`.

Tests cover:
1. Returns unique languages when multiple users share the same language
2. Returns single language when all users have the same language

How to run: `npm install` then `npm test`

## Manual Testing

**(Input accepts comma-separated list of users)** Entered multiple usernames separated by commas and confirmed fetch runs for each.

**(Submitting fetches data from Codewars API)** Entered valid usernames and confirmed table appears with correct data.

**(Dropdown shows all language rankings plus overall)** Entered users with different languages and confirmed all languages appear in dropdown.

**(Default ranking is overall)** Confirmed table appears on submit without selecting a language.

**(Table shows username, clan and score)** Confirmed all three columns appear for each user.

**(Changing ranking updates the table)** Switched languages in dropdown and confirmed table updates.

**(Table sorted highest to lowest score)** Entered multiple users and confirmed order is correct.

**(Users without ranking in chosen language are not shown)** Selected a language not all users have and confirmed only relevant users appear.

**(Top user is visually highlighted)** Confirmed first row has gold background.

**(Lighthouse accessibility score 100)** Ran Lighthouse in Chrome DevTools — score: 100.

**(Non-existent user shows error message)** Entered invalid username and confirmed error message appears.

**(Fetch error shows error message)** Entered invalid username — confirmed error message appears in UI.