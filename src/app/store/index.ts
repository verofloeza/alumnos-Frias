import { reducer, usersFeatureKey, } from "./users/users.reducer";

import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    [usersFeatureKey] : any;
}

export const actionReducerMap: ActionReducerMap<AppState> = {
    [usersFeatureKey]: reducer
}