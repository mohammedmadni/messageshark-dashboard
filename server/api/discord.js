import db from "./db/conn.js";
import express from "express"
const router = express.Router();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const clientUrl = process.env.CLIENT_URL;
const redirect = process.env.REDIRECT_URL;

router.get('/logout', (req, res) => {
    res.clearCookie('name');
    res.clearCookie('avatar');
    res.redirect(clientUrl);
});

router.get('/login', (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&scope=identify%20guilds%20connections&redirect_uri=${redirect}`);
});

router.get('/callback', async (req, res) => {
    const data = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirect,
        code: req.query.code,
        scope: ['identify', 'guilds', 'connections'],
    };
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const json = await response.json();

    const fetchDiscordUserInfo = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${json.access_token}`,
        }
    });
    const user = await fetchDiscordUserInfo.json();
    //console.log(user);

    const fetchDiscordGuildInfo = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${json.access_token}`,
        }
    });
    const guilds = await fetchDiscordGuildInfo.json();
    //console.log(guilds);

    /*
    const fetchDiscordConnectionInfo = await fetch('https://discord.com/api/users/@me/connections', {
        headers: {
            Authorization: `Bearer ${json.access_token}`,
        }
    });
    const connections = await fetchDiscordConnectionInfo.json();
    console.log(connections);
    */

    const exist = await db
        .collection("users")
        .countDocuments({ _id: user.id });

    if (exist) {
        db.collection("users").updateOne(
            { _id: user.id },
            {
                $set: {
                    name: user.username,
                    discriminator: user.discriminator,
                    avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
                    guilds: guilds
                },
                $addToSet: {
                    ip: req.headers["cf-connecting-ip"],
                },
            }
        );
    } else {
        db.collection("users").insertOne({
            _id: user.id,
            name: user.username,
            discriminator: user.discriminator,
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
            guilds: guilds,
            ip: [req.headers["cf-connecting-ip"]],
        });
    }

    res.cookie('id', user.id);
    res.cookie('name', user.username);
    res.cookie('discriminator', user.discriminator);
    if (user.avatar == null) {
        res.cookie('avatar', `https://brandlogos.net/wp-content/uploads/2021/11/discord-logo.png`);
    }
    else {
        res.cookie('avatar', `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`);
    }
    res.redirect(clientUrl);
});

router.get('/add', (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`);
});

export default router;