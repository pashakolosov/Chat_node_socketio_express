const { Router } = require('express');
const fs = require('fs');
const router = Router();

router.use((req, res, next) => {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let data = `${hours}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get('user-agent')}`

    fs.appendFile('server.log', data + '\n', () => console.log(data));
    next();
});

module.exports = router;

