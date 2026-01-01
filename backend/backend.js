const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
app.use(express.json())
app.use('/public/', express.static(path.join(__dirname, '../frontend/public')))
app.use(cookieParser())


app.get('/', async (req, res) => {
    const token = req.cookies.token
    if(token){
        const payload = await jwt.verify(token,'.....')
        if(payload) {
            res.sendFile(path.join(__dirname, '../frontend/loggedHome.html'))
        }else{
            res.sendFile(path.join(__dirname, '../frontend/unloggedHome.html'))
        }
    }else{
        res.sendFile(path.join(__dirname, '../frontend/unloggedHome.html'))
    }
})

app.get('/login', async (req, res) => {
    const token = req.cookies.token
    if(token){
        const payload = await jwt.verify(token,'.....')
        if(payload) {
            res.sendFile(path.join(__dirname, '../frontend/loggedHome.html'))
        }else{
            res.sendFile(path.join(__dirname, '../frontend/unloggedHome.html'))
        }
    }else{
        res.sendFile(path.join(__dirname, '../frontend/auth.html'))
    }
})

app.get('/signup', async (req, res) => {
    const token = req.cookies.token
    if(token){
        const payload = await jwt.verify(token,'.....')
        if(payload) {
            res.sendFile(path.join(__dirname, '../frontend/loggedHome.html'))
        }else{
            res.sendFile(path.join(__dirname, '../frontend/unloggedHome.html'))
        }
    }else{
        res.sendFile(path.join(__dirname, '../frontend/auth.html'))
    }
})

app.post('/c/ask', async (req, res) => {
    const token = req.cookies.token
    const question = req.body.question
    if (!token) {
        console.log(req.body.conversation)
        const response = await fetch('http://localhost:8003/c/generate', {
            method: 'Post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ question: question, conversation: req.body.conversation})
        })
        const result = await response.json()
        console.log(result.reply)
        res.json({cloverResponse: result.reply})
    }
})
app.listen(7020, '0.0.0.0', () => {
    console.log('listening on port 7020')
})