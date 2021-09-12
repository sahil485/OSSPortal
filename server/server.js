const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const dbURL = "mongodb+srv://sahil_c:pgxtpp5k@userinfo.xywx7.mongodb.net/UserInfo?retryWrites=true&w=majority"

mongoose.connect(dbURL, ({useNewUrlParser:true})).then(console.log("connected to MongoDB")).catch(err => console.log(err))

const submissionSchema = new mongoose.Schema({
    name: String,
    gitLink: {
        type: String,
        default: ""
    },
    vidLink: {
        type: String,
        default: ""
    }
})

const registeredParticipant = mongoose.model('subinfos', submissionSchema)

app.get('/subinfos', (req, res) => {
    registeredParticipant.find().then(info => res.json(info))
})

app.post('/subinfos', (req, res) => {
    const newReg = new registeredParticipant({
        name: req.body.name,
        gitLink: req.body.gitLink,
        vidLink: req.body.vidLink,
    })
    newReg.save().then(info => res.json(info))
})

app.delete('/subinfos/:id', (req, res) => {
    registeredParticipant.findByIdAndDelete(req.params.id).then({remove: true}).catch(err => console.log(err))
})


app.listen(5000, ()=>{console.log("Server is running at port 5000")})