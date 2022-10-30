import {firebaseGetListOfUsers} from "../../services/firebase/users.service";
import {firebaseGetListOfRooms} from "../../services/firebase/rooms.service";
import {firebaseGetListOfRole} from "../../services/firebase/roles.service";
import {fireStoreAdmin} from "../../src/config/firebase-admin-init";
import {DB_NAME} from "../../src/config/firebase.contant";

export const firestoreGetDataAnalytics = async () => {
  let users = await firebaseGetListOfUsers();
  let rooms = await firebaseGetListOfRooms();
  let roles = await firebaseGetListOfRole();
  let messageMetric = await firestoreGetMessageMetric(rooms);

  let roleGroupBy: any[] = [];
  roles.forEach(r => {
    let listOfUserByRoleId = users.filter(u => u.role?.id === r.id);
    roleGroupBy.push({
      name: r.role_name,
      value: listOfUserByRoleId?.length,
      roleData: r,
      users: listOfUserByRoleId
    })
  })


  return {
    users: users?.length || 0,
    rooms: rooms?.length || 0,
    roles: roles?.length || 0,
    totalMessage: messageMetric?.total,
    meta: {
      roleGroupByUser: roleGroupBy,
      messageGroupByRoom: messageMetric?.rooms
    }
  }

}


const firestoreGetMessageMetric = async (rooms: any[]) => {
  let roomUpdate: any[] = rooms.map(r => {
    return {
      ...r,
      total_message: 0
    }
  })
  let total = 0;
  for await (let r of roomUpdate) {
    const subMessageCollection = await fireStoreAdmin.collection(DB_NAME.ROOMS)
      .doc(r.id)
      .collection(DB_NAME.MESSAGE)
      .get();

    total = total + subMessageCollection?.size;
    r.total_message = subMessageCollection?.size;
  }

  return {
    rooms: roomUpdate,
    total
  }
}