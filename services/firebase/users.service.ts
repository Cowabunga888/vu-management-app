import { fireStoreAdmin } from '../../src/config/firebase-admin-init';
import { DB_NAME } from '../../src/config/firebase.contant';

const { v4: uuidv4 } = require('uuid');
export const firebaseGetListOfUsers = async () => {
    let users: any[] = [];
    let querysnapshot = await fireStoreAdmin.collection(DB_NAME.USERS).get();
    querysnapshot.forEach((doc: any) => {
        users.push({
            id: doc.id,
            ...doc.data()
        })
    });

    return users;
}

export const firebaseUpdateUserById = async (userId: string, payload: any) => {
    return fireStoreAdmin
        .collection(DB_NAME.USERS)
        .doc(userId)
        .update({
            ...payload
        });
}

export const firebaseDeleteUserById = async (userId: string) => {
    return fireStoreAdmin
        .collection(DB_NAME.USERS)
        .doc(userId)
        .delete()
}

export const firebaseAddUser = async (user: any) => {
    const customPayload = {
        username: user.email,
        email: user.email,
        fullname: user.fullname,
        password: '',
        user_avatar_url: `https://avatars.dicebear.com/api/micah/${uuidv4()}.svg?mood[]=happy&background=%23333`,

    }
    return fireStoreAdmin
        .collection(DB_NAME.USERS)
        .add(customPayload)
}