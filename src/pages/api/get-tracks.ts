import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { createReadStream, promises as fs } from 'fs';
import { statSync } from 'fs';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const range = req.headers.range
    const track = req.query.track as string
    const trackName = track.substring(0, track.indexOf(".")) + ".wav";
    const tracksDir = path.join(process.cwd(), '/public/tracks');
    const trackPath = path.resolve(`${tracksDir}/${trackName}`);

    const stat = statSync(trackPath)
    const fileSize = stat.size

    const chunkSize = 10 ** 6 // 1MB
    const start = Number(range?.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, fileSize - 1)

    const file = createReadStream(trackPath, { start, end })
    const headers = {
        'Content-Type': 'audio/wav',
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Range': 'bytes',
        'Content-Length': end - start + 1
    }

    res.writeHead(206, headers)
    file.pipe(res)
}
