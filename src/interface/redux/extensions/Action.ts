import {ActionType} from "./enums/ActionType";

export type Action = {
    id: string
    timestamp: number,
    title: string
    description?: string
    type: ActionType
}
