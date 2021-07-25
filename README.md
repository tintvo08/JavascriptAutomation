# JavascriptAutomation
This Repo contains practice javascript tests using Jest and testing Slack's API.

## Requirements:
* nodejs: https://nodejs.org/en/
* slack application (user token) or ask me to use my test token

## Breakdown:
* slack_client.js: this class help initialize the configs and make the calls to Slack's API
* slack_config.js: configs that for Slack's API
* slack_send_messages.test.js: Tests that relates to sending messages
* slack_delete_messages.test.js: Tests that relates to deleting messages

## How to run:
1. Open project.
2. Install project packages: npm install.
3. Create .env file in root directory
4. Add your slack user token with the key as slack_user_token (SLACK_USER_TOKEN=xoxp......)
* If you just want to test out the api then ask me for my test user token)
* If you are using your own slack app then also update the slack_config.json file with your slack channel_name and channel_id
6. Now to run the slack.test.js file, enter this command in the terminal:
* run all tests: npm test
* run send messages tests: npm test -- slack_send_messages.test.js
* run delete messages tests: npm test -- slack_delete_messages.test.js
