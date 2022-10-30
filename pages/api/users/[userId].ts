import { NextApiRequest, NextApiResponse } from "next";
import { firebaseUpdateUserById, firebaseDeleteUserById } from '../../../services/firebase/users.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method, body: payload } = req;

    switch (method) {
        case "PUT":
            const userId = req.query.userId
            //@ts-ignore
            let userUpdate = await firebaseUpdateUserById(`${userId}`, payload);
            return res.status(200).json({
                data: userUpdate,
            })

        case "DELETE":
            const userDocId = req.query.userId
            //@ts-ignore
            let userDelete = await firebaseDeleteUserById(`${userDocId}`);
            return res.status(200).json({
                data: userDelete,
            })

        default:
            res.status(405).end({ message: `Method ${method} not suport!` })
    }

}