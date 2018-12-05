const express = require("express")
const { json } = require("body-parser")
const controller = require("./controllers/messages_controller")
const app = express()

const PORT = 3001

const URL = "/api/messages"

app.use(json())

app.use(express.static("../public/build/"))

app.get(URL, controller.read)

app.post(URL, controller.create)

app.put(URL +"/:id", controller.update)

app.delete(URL +"/:id", controller.remove)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})