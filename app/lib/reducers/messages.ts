import {Message} from "@lib/api/model";

export interface MessagesReducerAction {
    type: 'ADD_MESSAGE' | 'SET_MESSAGES',
    payload: any
}

export function messagesReducer(messages: Message[], action: MessagesReducerAction) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [...messages, action.payload as Message]
        case 'SET_MESSAGES':
            return action.payload as Message[]
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
