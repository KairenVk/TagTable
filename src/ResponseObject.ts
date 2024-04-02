import {ItemObject} from "./ItemObject";

export interface ResponseObject {
    has_more: boolean,
    items: Array<ItemObject>,
    quota_max: number,
    quota_remaining: number
}