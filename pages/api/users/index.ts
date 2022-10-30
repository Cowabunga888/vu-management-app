import { NextApiRequest, NextApiResponse } from "next";
import { firebaseGetListOfUsers, firebaseAddUser } from '../../../services/firebase/users.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { method, body } = req;

  switch (method) {
    case "GET":
      let users: any[] = await firebaseGetListOfUsers();
      return res.status(200).json({
        data: users,
        page: 1,
        perPage: users?.length,
        total: users?.length
      })

    case "POST":
      let new_user = await firebaseAddUser(body);
      return res.status(200).json({
        data: new_user,
      })


    default:
      res.status(405).end({ message: `Method ${method} not suport!` })
  }

}