export interface UserStore {
       isAuth: boolean;
       name: string;
}

const initialStore: UserStore = {
       isAuth: false,
       name: "",
}

export enum USERS_ACTION {
       LOG_IN = "LOG_IN"
}

export type LOG_IN = { type: USERS_ACTION.LOG_IN, payload: string }

export const reducer = (store: UserStore = initialStore, action: LOG_IN) => {
       switch (action.type) {
              case (USERS_ACTION.LOG_IN):
                     return { isAuth: true, name: action.payload }
              default: { return store }
       }
}


