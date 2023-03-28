import { NextApiRequest, NextApiResponse } from "next";

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

    res.status(200).json({ data: `Name: ${body.name}; Email: ${body.email}; Subject: ${body.subject}; Message: ${body.message};`})
}