module.exports = {
    'GET /user': {name: 'zhanglei'},
    'POST /login/account': (req, res) => {
        const {password, username} = req.body;
        if (password === 'admin' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 0,
                token: 'sdfksodfp',
                data: {id: 1, name: 'zhanglei'}
            })
        } else {
            return res.send({status: 'error', code: 403})
        }
    }
}