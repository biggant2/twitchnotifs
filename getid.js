const fetch = require('node-fetch');
require('dotenv').config();

module.exports.getId = async (name) => {
    let response = await fetch(`https://api.twitch.tv/helix/users?login=${name}`, {
        method: "GET",
        headers: {
            "Client-ID": process.env.CLIENT_ID,
            "Authorization": `Bearer ${process.env.AUTH_TOKEN}`,
        }
    })
    let data = await response.json();
    return data['data'][0].id;
}