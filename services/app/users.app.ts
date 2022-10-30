import { USERS_ENDPOINT } from "../../src/config/endpoint.constant";
import { callAPI } from "../callAPI";

export const getUserList = (filter?: any) => {
    return callAPI(USERS_ENDPOINT.GET_LIST, "GET", null)
}

export const updateUserById = (payloadUpdate: any) => {
    return callAPI(USERS_ENDPOINT.UPDATE +'/'+ payloadUpdate.id, "PUT", payloadUpdate)
}

export const deleteUserById = (payloadDelete: any) => {
    console.log(payloadDelete.id)
    return callAPI(USERS_ENDPOINT.DELETE +'/'+ payloadDelete.id, "DELETE", null)
}

export const createNewUser = (userPayload: any) => {
    return callAPI(USERS_ENDPOINT.CREATE, "POST", userPayload);
}