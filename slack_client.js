const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const query_string = require('querystring');
dotenv.config();

class SlackClient {
  constructor() {
    this.config = this._get_config()
    this.base_url = this.config['base_url'];
    this.token = process.env.SLACK_USER_TOKEN
  }

  _get_config(){
    const config_path = path.join('slack_config.json');
    const text = fs.readFileSync(config_path, 'utf8');
    return JSON.parse(text);
  }

  send_message(msg){
    const full_url = `${this.base_url}/api/chat.postMessage`

    let body = query_string['stringify']({
      token: this.token,
      channel: this.config['channel_name'],
      text: `${msg} ${Math.random()}`
    })

    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return axios.post(full_url, body, headers)
  }

  delete_message(timestamp){
    const full_url = `${this.base_url}/api/chat.delete`

    let body = query_string['stringify']({
      token: this.token,
      channel: this.config['channel_id'],
      ts: timestamp
    })

    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return axios.post(full_url, body, headers)
  }

  schedule_message(msg, timestamp){
    const full_url = `${this.base_url}/api/chat.scheduleMessage`;
    const future_time = new Date().getTime();

    let body = query_string['stringify']({
      token: this.token,
      channel: this.config['channel_id'],
      post_at: timestamp,
      text: `${msg} ${Math.random()}`
    })

    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return axios.post(full_url, body, headers)
  }
}

exports.SlackClient = SlackClient;
