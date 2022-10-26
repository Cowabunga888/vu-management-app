import { NextApiRequest, NextApiResponse } from "next";
import { firebaseUpdateRoomById, firebaseDeleteRoomById } from '../../../services/firebase/rooms.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method, body: payload } = req;

    switch (method) {
        case "PUT":
            const roomId = req.query.roomId
            //@ts-ignore
            let roomUpdate = await firebaseUpdateRoomById(`${roomId}`, payload);
            return res.status(200).json({
                data: roomUpdate,
            })

        case "DELETE":
            const roomDocId = req.query.roomId
            //@ts-ignore
            let roomDelete = await firebaseDeleteRoomById(`${roomDocId}`);
            return res.status(200).json({
                data: roomDelete,
            })

        default:
            res.status(405).end({ message: `Method ${method} not suport!` })
    }

}