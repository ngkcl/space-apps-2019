import * as express from "express"

let app = express()
const port = 8080

app.get("/", (req, res) => {
    res.send("Hello master")
})

app.listen(port, () => {
    console.log(`App started on: ${port}`)
})
