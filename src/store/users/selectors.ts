// import { UserStore } from "./reducer"
import type { RootStore } from "..";

export const getUserStatus = (store: RootStore) => store.user.isAuth;