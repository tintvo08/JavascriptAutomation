const script = require('jest');
const client = require('./slack_client');
const slack_client = new client.SlackClient()
const config = slack_client.config

test(`Sending Message to Slack Channel "${config.channel_name}" then delete it`, async() => {
  msg = 'Testing Message'
  const resp = slack_client.send_message(msg)
  var msg_resp = await resp.then(res => {
    const res_data = res.data;
    // Checking if response was ok
    expect(res_data.ok).toBe(true);
    return res_data
  })
  const resp2 = slack_client.delete_message(msg_resp.ts)
  await resp2.then( res => {
    const res_data = res.data
    // Checking if delete response was ok
    expect(res_data.ok).toBe(true);
    // Checking if delete response had the correct channel ID
    expect(res_data.channel).toBe(config.channel_id);
    // Checking if response was ok
    expect(res_data.ts).toBe(msg_resp.ts);
  })
})

test(`Delete a message using a timestamp that have no message correlation`, async() => {
  msg = 'Testing Message'
  var date = new Date()
  var ts = Math.floor(date.getTime()/1000.0) + 100000;
  const resp2 = slack_client.delete_message(ts)
  await resp2.then( res => {
    const res_data = res.data
    // Checking if delete response was ok
    expect(res_data.ok).toBe(false);
    // Checking if delete response error was 'message_not_found'
    expect(res_data.error).toBe('message_not_found');
  })
})
