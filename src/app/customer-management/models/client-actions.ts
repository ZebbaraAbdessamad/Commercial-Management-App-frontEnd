import { ClientActionTypes } from "../enums/client-action-types.enum";

export interface ClientActions {
    type:ClientActionTypes,
    payload?:any,
}
