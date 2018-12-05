const messages = [];

// an auto-incrementing message id, seperate from the message index
let id = 0;

const respond = (res, code = 200) => res.status(code).json(messages)

const read = (req, res, next) => res.json(messages)

const create = (req, res, next) => {
    req.body.id = id++;
    messages.push(req.body)
    respond(res, 201)
}

const update = (req, res, next) => {
    const message = messages.find(message => +message.id === +req.params.id)
    if (!message) {
        res.status(400).json({ error: `No message found with id of ${+req.params.id}` })
        return;
    }

    for (let key in req.body) {
        message[key] = req.body[key]
    }

    respond(res)
}

const remove = (req, res, next) => {
    const index = messages.findIndex(message => +message.id === +req.params.id)
    if (index === -1) {
        res.status(400).json({ error: `No message to delete with id of ${+req.params.id}` })
        return;
    }

    messages.splice(index, 1)
    respond(res)
}

module.exports = {
    read,
    create,
    update,
    remove
}
