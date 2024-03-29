import type { NextApiRequest, NextApiResponse } from 'next'
import { S3Client } from '@aws-sdk/client-s3'
import * as dotenv from 'dotenv'
dotenv.config()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const track = req.query.track as string
    const trackName = track.substring(0, track.indexOf(".")) + ".wav";

    // const s3 = new AWS.S3({
    //     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    // })
    const s3 = new S3Client({
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || ""
        }
    })

    const bucketName = 'chefbstudios'
    const keyName = `tracks/${trackName}`
    const params = {
        Bucket: bucketName,
        Key: keyName,
        Range: ""
    }

    // const file = await s3.headObject(params).promise();
    // const rangeHeader = req.headers.range;
    // if (rangeHeader) {
    //     // If there is a range header, send only the requested bytes
    //     const parts = rangeHeader.replace(/bytes=/, '').split('-');
    //     const start = parseInt(parts[0], 10);
    //     const end = parts[1] ? parseInt(parts[1], 10) : (typeof file.ContentLength === 'undefined' ? 1 : file.ContentLength) - 1;
    //     const chunksize = (end - start) + 1;
    //     console.log({ rangeHeader })
    //     console.log({start, end, chunksize})

    //     res.writeHead(206, {
    //         'Content-Range': `bytes ${start}-${end}/${file.ContentLength}`,
    //         'Accept-Ranges': 'bytes',
    //         'Content-Length': chunksize,
    //         'Content-Type': 'audio/wav',
    //     });

        // s3.getObject({...params, Range: `bytes=${start}-${end}`}).createReadStream().pipe(res);
    // }
    
}
