const { getId } = require('./getid')
const { createServer } = require('./server')
const { username } = require('./config.json')
const { subscribe } = require('./subscribe')
const notifier = require('node-notifier');
const open = require('open');

let startedAt;

createServer();
subscribePath();

async function subscribePath() {
    let id = await getId(username);
    if(!id) return console.log("Failed to get id");
    subscribe('subscribe', `https://api.twitch.tv/helix/streams?user_id=${id}`)
}

function notifyUser(data) {
    notifier.notify({
        title: `${data.user_name} started streaming`,
        message: data.title,
        icon: __dirname + '/twitchicon.png',
        sound: true,
        appID : 'Twitch Streams',
        wait: true
    }, (error, response, metadata) => {
        if(Object.keys(metadata).length === 0) {
            open(`https://twitch.tv/${data.user_name}`)
        }
    })
}

module.exports.getData = (data) => {
    if(data['data'].length === 0) return;
    let started = data['data'][0].started_at;
    if(started === startedAt) return;

    startedAt = started;
    notifyUser(data['data'][0])
}
