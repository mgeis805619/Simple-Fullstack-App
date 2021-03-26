const express = require('express')
const sqlite3 = require('sqlite3')
const app = new express()
const db = new sqlite3.Database('./db/gameReview.db')


app.use(express.static('public'))
app.use(express.json())

app.get('/games', (req,res) => {
    const sql = "SELECT * FROM games;"
    db.all(sql,[],(err, rows) => {
        res.send(rows)
})
})

app.get('/posts', (req,res) => {
    const sql = "SELECT * FROM users;"
    db.all(sql,[],(err, rows) => {
        res.send(rows)
})
})

app.post("/posts", (req,res)=> {
    const post = req.body;
    if (post.text.length >= 5) {
        const sql = "INSERT INTO posts (content, user_id) VALUES (?,?);"
        db.run(sql,[post.text,post.user_id])
        res.send({
            message: "Post successfully saved"
        })
    }
    else {
        res.status(401)
        res.send({
            message: "Post is not long enough."
        })
    }
})

app.post("/login", (req, res) => {
    const user = req.body
    const sql2 = "SELECT id, first_name, last_name FROM users WHERE username = ? AND password = ?"
    db.all(sql2,[user.username, user.password],(err, rows) => {
        if (rows && rows.length > 0) {
            res.send({
                message: "Successful login!",
                user: rows[0]
            })
        }
    


    else {
        if (user.username.length >= 4 && user.password.length >= 4) {
            const sql = "INSERT INTO users (username, password, first_name, last_name) VALUES (?,?,?,?)"
            db.run(sql,[user.username, user.password, user.firstName, user.lastName],(err) => {
                if (err) console.error(err)
                res.send({
                    message: "Your account was successfully created.",
                    userId: this.lastID
                })
            })
        }
        else {
            res.status(401)
            res.send({
                message: "Username or password is invalid."
            })
        }
    }
    })
})

app.listen(3000, () => console.log("Server started"))

