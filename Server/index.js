const express = require("express")
const cors = require("cors")


app = express()

app.use(express.json())
app.use(cors())

require("./Connection/connection")
require("./users/users")

app.post('/', async(req, res) =>{
    let user = new user(req.body)
    let result = await user.save()
    res.send(result)
})

const port = 5000



app.listen(port)