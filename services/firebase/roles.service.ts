import { fireStoreAdmin } from '../../src/config/firebase-admin-init';
import { DB_NAME } from '../../src/config/firebase.contant';

// const { v4: uuidv4 } = require('uuid');
export const firebaseGetListOfRole = async () => {
    let roles: any[] = [];
    let querysnapshot = await fireStoreAdmin.collection(DB_NAME.ROLES).get();
    querysnapshot.forEach((doc: any) => {
        roles.push({
            id: doc.id,
            ...doc.data()
        })
    });

    return roles;
}

export const firebaseUpdateRoleById = async (roleId: string, payload: any) => {
    return fireStoreAdmin
    .collection(DB_NAME.ROLES)
    .doc(roleId)
    .update({
        ...payload
    });
}

export const firebaseDeleteRoleById = async (roleId: string) => {
    return fireStoreAdmin
    .collection(DB_NAME.ROLES)
    .doc(roleId)
    .delete()
}

export const firebaseCreateRole = async (role: any) => {
    const customPayload = {
        role_name: role.name,
        role_desciption: role.desciption
    }
    return fireStoreAdmin
    .collection(DB_NAME.ROLES)
    .add(customPayload)
}