// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

type Data = {
    albumArtwork: any[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const albumArtworkDir = path.join(process.cwd(), '/public/album-artwork');
    const albumArtwork = await fs.readdir(albumArtworkDir);
    res.status(200).json({ albumArtwork })
}
