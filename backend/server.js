const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors({
origin: "https://portfolio-rose-delta-62.vercel.app",
methods: ["GET","POST"],
allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* MAIL */
const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
}
});

/* CONTACT FORM */
app.post("/contact", async (req,res)=>{

const {name,email,message} = req.body;

try{

/* =========================
   MAIL TO YOU
========================= */
await transporter.sendMail({
from: process.env.EMAIL_USER,
to: process.env.EMAIL_USER,
subject: `New Message from ${name}`,

html: `
<div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:30px;">

<div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

<div style="background:linear-gradient(135deg,#6d28d9,#9333ea);padding:24px;color:white;">
<h1 style="margin:0;font-size:24px;">Kishor R J Portfolio</h1>
<p style="margin:6px 0 0;">New Contact Message Received</p>
</div>

<div style="padding:24px;color:#222;">

<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>

<div style="margin-top:18px;">
<p style="font-weight:bold;margin-bottom:8px;">Message</p>

<div style="background:#f9fafb;padding:16px;border-radius:12px;line-height:1.6;">
${message}
</div>
</div>

<div style="margin-top:24px;">
<a href="mailto:${email}"
style="display:inline-block;background:#6d28d9;color:white;padding:12px 18px;border-radius:10px;text-decoration:none;">
Reply to ${name}
</a>
</div>

</div>

<div style="padding:18px;background:#f8fafc;color:#666;font-size:13px;text-align:center;">
Sent from your live portfolio website
</div>

</div>
</div>
`
});

/* =========================
   AUTO REPLY TO VISITOR
========================= */
await transporter.sendMail({
from: process.env.EMAIL_USER,
to: email,
subject: "Thank you for contacting Kishor R J",

html: `
<div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:30px;">

<div style="max-width:600px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

<div style="background:linear-gradient(135deg,#6d28d9,#9333ea);padding:24px;color:white;">
<h1 style="margin:0;">Hello ${name} 👋</h1>
<p style="margin:6px 0 0;">Thank you for contacting Kishor R J</p>
</div>

<div style="padding:24px;color:#222;line-height:1.7;">

<p>I have received your message through my portfolio website.</p>

<p>I’ll review it shortly and get back to you as soon as possible.</p>

<div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:12px;">
<strong>Your Message:</strong><br><br>
${message}
</div>

<p style="margin-top:24px;">
Regards,<br>
<strong>Kishor R J</strong><br>
Full Stack Developer
</p>

</div>

<div style="padding:18px;background:#f8fafc;color:#666;font-size:13px;text-align:center;">
This is an automated confirmation email.
</div>

</div>
</div>
`
});

res.json({success:true});

}catch(error){

console.log(error);
res.json({success:false});

}

});

app.get("/", (req,res)=>{
res.send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
console.log("Server Running...");
});