import { NextApiRequest, NextApiResponse } from "next";
import { firebaseUpdateRoleById, firebaseDeleteRoleById, firebaseGetListOfRole } from '../../../services/firebase/roles.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method, body: payload } = req;

    switch (method) {
        case "GET":
            let roles: any[] = await firebaseGetListOfRole();
            return res.status(200).json({
                data: roles
            })

        case "PUT":
            const roleId = req.query.roleId
            //@ts-ignore
            let roleUpdate = await firebaseUpdateRoleById(`${roleId}`, payload);
            return res.status(200).json({
                data: roleUpdate,
            })

        case "DELETE":
            const roomDocId = req.query.roleId
            //@ts-ignore
            let roleDelete = await firebaseDeleteRoleById(`${roomDocId}`);
            return res.status(200).json({
                data: roleDelete,
            })

        default:
            res.status(405).end({ message: `Method ${method} not suport!` })
    }

}