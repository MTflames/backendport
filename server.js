const express = require("express");
const app = express();
const session = require("express-session");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT|| 5000

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('public')); 
app.use(express.json());
// app.use(requestIp.mw());

app.get('/index', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})

app.post ('/index',async (req, res)=>{
    // const ipAdress = req.socket.remoteAddress;
    // const ipAddress = req.clientIp;
    // if (typeof ipAddress !== 'string') {
    //     ipAddress = ipAddress.toString()
    // }
    // console.log(req.body)
    // console.log(ipAddress)

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user: 'mattflames07@gmail.com',
            pass: 'ifaz vbrw wlow btzv'
        }
    })

    const mailOptions = {
        from : req.body.clientEmail,
        to: 'mattflames07@gmail.com',
        subject: `Message from ${req.body.clientName}`,
        text: `Client Name:${req.body.clientName}\n Client Email:${req.body.clientEmail}\n Client Message:${req.body.clientMessage}`
    }

    
        transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                res.send('error');
                console.log(error);
            }else{
                console.log('Email sent' + info.response)
                res.send('success')
            }
        })
})