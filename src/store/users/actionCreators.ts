import { USERS_ACTION } from "./reducer"

export const logIn = (value:string) => ({
       type: USERS_ACTION.LOG_IN,
       payload:value
});