import { configureStore } from "@reduxjs/toolkit";
import charactersReducer, { characterState } from "./reducers/charactersReducer";

export interface storeInterFace {
    characters: characterState;
}

const store = configureStore({
    reducer: {
        characters: charactersReducer,
    }
});

export default store;

export type AppDispatch = typeof store.dispatch;