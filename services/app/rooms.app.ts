import { ROOMS_ENDPOINT } from "../../src/config/endpoint.constant";
import { callAPI } from "../callAPI";

export const getRoomList = (filter?: any) => {
    return callAPI(ROOMS_ENDPOINT.GET_LIST, "GET", null)
}

export const updateRoomById = (payloadUpdate: any) => {
    return callAPI(ROOMS_ENDPOINT.UPDATE +'/'+ payloadUpdate.id, "PUT", payloadUpdate)
}
export const deleteRoomById = (payloadDelete: any) => {
    console.log(payloadDelete.id)
    return callAPI(ROOMS_ENDPOINT.DELETE +'/'+ payloadDelete.id, "DELETE", null)
}
export const createNewRoom = (roomPayload: any) => {
    return callAPI(ROOMS_ENDPOINT.CREATE, "POST", roomPayload);
  }