import { fireStoreAdmin } from '../../src/config/firebase-admin-init';
import { DB_NAME } from '../../src/config/firebase.contant';

const { v4: uuidv4 } = require('uuid');
export const firebaseGetListOfRooms = async () => {
    let rooms: any[] = [];
    let querysnapshot = await fireStoreAdmin.collection(DB_NAME.ROOMS).get();
    querysnapshot.forEach((doc: any) => {
        rooms.push({
            id: doc.id,
            ...doc.data()
        })
    });

    return rooms;
}

export const firebaseUpdateRoomById = async (roomId: string, payload: any) => {
    return fireStoreAdmin
    .collection(DB_NAME.ROOMS)
    .doc(roomId)
    .update({
        ...payload
    });
}

export const firebaseDeleteRoomById = async (roomId: string) => {
    return fireStoreAdmin
    .collection(DB_NAME.ROOMS)
    .doc(roomId)
    .delete()
}

export const firebaseCreateRoom = async (room: any) => {
    const d= new Date();
    const customPayload = {
        room_name: room.name,
        content: {
            text: 'This room is created by Admin',
            time_stamp: d.getTime()
        },
        room_img: `https://avatars.dicebear.com/api/bottts/${uuidv4()}.svg?background=%23ffffff`

    }
    return fireStoreAdmin
    .collection(DB_NAME.ROOMS)
    .add(customPayload)
}