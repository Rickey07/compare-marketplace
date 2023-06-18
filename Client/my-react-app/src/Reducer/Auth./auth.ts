import { AuthActions } from "./authActions";
import { userDetails } from "../../models";


export const authReducer = (state:userDetails,action:any) => {
    switch (action.type) {
        case AuthActions.SET_USER_DETAILS:
           return {
            ...action.payload
           }    
        default:
           return state
    }
}