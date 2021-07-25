const script = require('jest');
const client = require('./slack_client');
const slack_client = new client.SlackClient()
const config = slack_client.config

test(`Sending Message to Slack Channel: ${config.channel_name}`, async() => {
  msg = 'Testing Message'
  const resp = slack_client.send_message(msg)
  await resp.then(res => {
    const res_data = res.data;
    // Checking if response was ok
    expect(res_data.ok).toBe(true);
    // Check if the channel id matches our channel id
    expect(res_data.channel).toBe(config.channel_id);
    // Check if the timestamp is a float
    expect(!isNaN(res_data.ts)).toBe(true);
    // Check if type of message was sent
    expect(res_data.message.type).toBe('message')
    // Check if our messages was sent correctly
    expect(res_data.message.text.includes(msg)).toBe(true)
    })
  })

test(`Sending Message to Slack Channel that does not exist`, async() => {
  slack_client.config.channel_name = `#randomchannel${Math.random()}}`
  msg = 'Testing Message'
  const resp = slack_client.send_message(msg)
  await resp.then(res => {
    const res_data = res.data;
    // Checking if response was ok
    expect(res_data.ok).toBe(false);
    // Checking if response error was 'channel_not_found'
    expect(res_data.error).toBe('channel_not_found')
    })
  })

test(`Schedule to send a message with a future timestamp`, async() => {
  msg = 'Testing Message'
  var date = new Date()
  var ts = Math.floor(date.getTime()/1000.0) + 100000;
  const resp = slack_client.schedule_message(msg, ts)
  await resp.then(res => {
    const res_data = res.data;
    console.log(res_data)
    // Checking if response was ok
    expect(res_data.ok).toBe(true);
    // Check if the channel id matches our channel id
    expect(res_data.channel).toBe(config.channel_id);
    // Checking if message will be post at the timestamp we specified
    expect(res_data.post_at).toBe(ts);
    // Check if our messages was correctly recorded
    expect(res_data.message.text.includes(msg)).toBe(true)
    })
  })

test(`Schedule to send a message with a past timestamp`, async() => {
  msg = 'Testing Message'
  var date = new Date()
  var ts = Math.floor(date.getTime()/1000.0) - 100000;
  const resp = slack_client.schedule_message(msg, ts)
  await resp.then(res => {
    const res_data = res.data;
    console.log(res_data)
    // Checking if response was ok
    expect(res_data.ok).toBe(false);
    // Check if the response error is 'time_in_past'
    expect(res_data.error).toBe('time_in_past')
    })
  })
