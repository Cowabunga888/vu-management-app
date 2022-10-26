import { NextApiRequest, NextApiResponse } from "next";
import {firebaseGetListOfRole, firebaseCreateRole} from '../../../services/firebase/roles.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { method, body} = req;

  switch (method) {
    case "GET":
      let rooms: any[] = await firebaseGetListOfRole();
      return res.status(200).json({
        data: rooms,
        page: 1,
        perPage: rooms?.length,
        total: rooms?.length 
      })

    case "POST":
      let new_room = await firebaseCreateRole(body);
      return res.status(200).json({
        data: new_room,
      })

    default:
      res.status(405).end({ message: `Method ${method} not suport!` })
  }

}