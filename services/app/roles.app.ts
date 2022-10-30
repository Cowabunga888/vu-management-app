import { ROLES_ENDPOINT } from "../../src/config/endpoint.constant";
import { callAPI } from "../callAPI";

export const getRoleList = (filter?: any) => {
    return callAPI(ROLES_ENDPOINT.GET_ROLE, "GET", null)
}

export const updateRoleById = (payloadUpdate: any) => {
    return callAPI(ROLES_ENDPOINT.UPDATE + '/' + payloadUpdate.id, "PUT", payloadUpdate)
}

export const deleteRoleById = (payloadDelete: any) => {
    console.log(payloadDelete.id)
    return callAPI(ROLES_ENDPOINT.DELETE + '/' + payloadDelete.id, "DELETE", null)
}

export const createNewRole = (rolePayload: any) => {
    return callAPI(ROLES_ENDPOINT.CREATE, "POST", rolePayload);
}