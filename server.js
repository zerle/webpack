const express = require('express');
const app = express();

app.get('/user', (req, res) => {
    res.json({name: 'zhanglei'})
});

app.listen(4000);