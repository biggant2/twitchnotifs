const fetch = require('node-fetch');
const { callback_ip } = require('./config.json');
require('dotenv').config();

module.exports.subscribe = async (subscribe, topic) => {
    let response = await fetch('https://api.twitch.tv/helix/webhooks/hub', {
        method: "POST",
        headers: {
            "Client-ID": process.env.CLIENT_ID,
            "Authorization": `Bearer ${process.env.AUTH_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "hub.callback": callback_ip,
            "hub.mode": subscribe,
            "hub.topic": topic,
            "hub.lease_seconds": 864000
        })
    })
    return response.status;
}