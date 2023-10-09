require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const ws = require('ws');

const websocket = new ws.Server({ noServer: true });

const fetchCache = {};

const backendList = JSON.parse(fs.readFileSync('config.json').toString()).backend;
for(const backend of backendList) {
    setInterval(async () => {
        try {
            const usageRes = await fetch(`${backend.url}/api/usage`);
            if(usageRes.ok) {
                const usage = await usageRes.json();
                const infoRes = await fetch(`${backend.url}/api/info`);
                if(infoRes.ok) {
                    const info = await infoRes.json();
                    fetchCache[backend.id] = {
                        name: backend.name,
                        online: true,
                        usage,
                        info
                    };
                }
                else fetchCache[backend.id] = {
                    name: backend.name,
                    online: false
                };
                sendMessage({
                    status: 201,
                    event: 'update',
                    channel: 'status:' + backend.id,
                    data: fetchCache[backend.id]
                }, 'status:' + backend.id);
            }
            else fetchCache[backend.id] = {
                name: backend.name,
                online: false
            };
        }
        catch(e) {
            fetchCache[backend.id] = {
                name: backend.name,
                online: false
            };
        }
    }, 1000);
}

setInterval(() => {
    const keys = Object.keys(fetchCache), r = [];
    for(const key of keys) {
        r.push({
            id: key,
            ...fetchCache[key]
        });
    }
    sendMessage({
        status: 201,
        event: 'update',
        channel: 'status:all',
        data: r
    }, 'status:all');
}, 1000);

const app = express();

function replaceSiteConfig(str) {
    const siteConfig = JSON.parse(fs.readFileSync('config.json').toString()).site;
    const keys = Object.keys(siteConfig);
    for(const key of keys) {
        str = str.replace(new RegExp(`{{${key}}}`, 'g'), siteConfig[key]);
    }
    return str;
}

function handleIndex(req, res) {
    res.send(replaceSiteConfig(fs.readFileSync('./public/index.html').toString()));
}

app.get('/', handleIndex);
app.get('/index.html', handleIndex);

app.get('/detail.html', (req, res) => {
    res.send(fs.readFileSync('./public/detail.html').toString());
});

app.use(express.static('public'));

app.get('/api/backend', (req, res) => {
    const keys = Object.keys(fetchCache), r = [];
    for(const key of keys) {
        r.push({
            id: key,
            ...fetchCache[key]
        });
    }
    res.json(r);
})

app.get('/api/backend/:id', (req, res) => {
    if(fetchCache[req.params.id]) res.json(fetchCache[req.params.id]);
    else res.status(404).send('Backend not found');
});

app.use((req, res) => {
    res.redirect('/404.html');
});

const channels = {};

const sendMessage = (message, channel) => {
    if(!channels[channel]) return;
    for(const socket of channels[channel]) {
        socket.send(JSON.stringify(message));
    }
};

websocket.on('connection', (socket, req) => {
    const channel = req.query.channel;
    if(!channel) {
        socket.close();
        return;
    }
    if(!channels[channel]) channels[channel] = [];
    channels[channel].push(socket);
    socket.on('message', (message) => {
        const data = JSON.parse(message);
        if(data.event === 'ping') {
            socket.send(JSON.stringify({
                status: 200,
                channel,
                event: 'pong'
            }));
        }
    });
    socket.on('close', () => {
        channels[channel].splice(channels[channel].indexOf(socket), 1);
    });
});

app.listen(process.env.PORT || 11880, () => {
    console.log('Server started at ' + (process.env.PORT || 11880));
}).on('upgrade', (request, socket, head) => {
    request.path = request.url.split('?')[0];
    request.form = request.url.split('?')[1];
    const formSplit = request.form.split('&');
    request.query = {};
    for(let i = 0; i < formSplit.length; i++) {
        const formSplit2 = formSplit[i].split('=');
        request.query[decodeURIComponent(formSplit2[0])] = decodeURIComponent(formSplit2[1]);
    }
    function sendError(code, message) {
        socket.write(`HTTP/1.1 ${code} ${message}\r\n\r\n`);
        socket.destroy();
    }
    if(!request.query.channel) sendError(400, 'Bad Request');
    else if (request.path !== '/api/socket') sendError(404, 'Not Found');
    else {
        websocket.handleUpgrade(request, socket, head, (socket) => {
            websocket.emit('connection', socket, request);
        });
    }
});
