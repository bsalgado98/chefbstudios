import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body
    console.log('form body:', body)
    if (!body.name) {
        return res.status(400).json({ data: 'Name not found!' })
    }

    if (!body.email) {
        return res.status(400).json({ data: 'Email not found!' })
    }

    if (!body.subject) {
        return res.status(400).json({ data: 'Subject not found!' })
    }

    if (!body.message) {
        return res.status(400).json({ data: 'Message not found!' })
    }

    const transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_AWS_SMTP_USER,
            pass: process.env.NEXT_PUBLIC_AWS_SMTP_PWD
        }
    })
    const mailOptions = {
        from: 'brunosalgado98@gmail.com',
        to: 'brunosalgado98@gmail.com',
        subject: body.subject,
        text: body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error(error)
        console.log('nodemailer sent info:', info)
    })

    res.status(200).json({ data: `Name: ${body.name}; Email: ${body.email}; Subject: ${body.subject}; Message: ${body.message};`})
}