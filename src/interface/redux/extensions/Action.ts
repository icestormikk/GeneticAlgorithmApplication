import {ActionType} from "./enums/ActionType";

export type Action = {
    id: string
    time: { hours: number, minutes: number, seconds: number, ms?: number }
    title: string
    description?: string
    type: ActionType
}
