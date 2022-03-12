const express = require('express');
const mongo = require('mongodb');
const bcrypt = require('bcryptjs');
const MongoClient = mongo.MongoClient;
const app = express();
const port = 2007;
const mongourl = "mongodb+srv://venky:venky123@cluster0.bxnfz.mongodb.net/venkatesh?retryWrites=true&w=majority";
let db; app.use(express.json());

/**************** SIGNUP ****************/
app.post('/app', (req, res) => {
    var hashpassword = bcrypt.hashSync(req.body.password);
    var email = req.body.email
    db.collection('signupnode').insertOne({ email: email, password: hashpassword }, (err, result) => {
        res.status(200).json({
            status: "success",
            message: "Don't close to anyone",
            data: result
        })
    })
})

/**************** LOGIN ****************/
// const password1 = bcrypt.compare(req.body.password, result.password);
app.post('/app1', (req, res) => {
    const email = req.body.email;

    db.collection('signupnode').findOne({ email: email }, (err, result) => {
        if (err) throw err;
        if (result == null) {
            res.status(404).json({
                status: "failed",
                message: "Please register first"
            })
        }
        else {
            console.log(result);
            const password1 = bcrypt.compareSync(req.body.password, result.password)
            console.log(password1);
            if (!password1) {

                res.status(404).json({
                    status: "password is incorrect"
                })
            }
            else {
                res.status(200).json({
                    status: "success"
                })
            }

        }

    })
})/**************** GET ALL USERS ****************/
app.get('/app', (req, res) => {
    db.collection('signupnode').find().toArray((err, result) => {
        res.status(200).json({
            data: result
        })
    })
})
MongoClient.connect(mongourl, (err, connection) => {
    if (err) throw err;
    db = connection.db('venkatesh'); app.listen(port, () => {
        console.log(`server is running on port number ${port}`);
    })
})