# JavascriptAutomation
This Repo contains practice javascript tests using Jest and testing Slack's API.

## Requirements:
* nodejs: https://nodejs.org/en/
* slack application (user token) or ask me to use my test token

## How to run:
1. Open project.
2. Install project packages: npm install.
3. Create .env file in root directory
4. Add your slack user token with the key as slack_user_token (slack_user_token=xoxp......) (if you just want to test out the api then ask me for my test user token)
5. If you are using your own slack app then update the slack_config.json file with your slack channel_name and channel_id
6. Now to run the slack.test.js file, enter this command in the terminal:
* run all tests: npm test
* run send messages tests: npm test -- slack_send_messages.test.js
* run delete messages tests: npm test -- slack_delete_messages.test.js
