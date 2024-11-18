import { character } from "../../interfaces";
import { getAllCharacters } from "../../services/getAllCharacters";
import { createSlice } from "@reduxjs/toolkit";

export interface characterState {
    characters:character[] | [];
    charactersLoading: boolean;
}

const initialState: characterState = {
    characters: [],
    charactersLoading: false,
}

const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCharacters.pending, (state) => {
            state.charactersLoading = true;
            state.characters = [];
        })
        .addCase(getAllCharacters.fulfilled, (state, action) => {
            state.charactersLoading = false;
            state.characters = action.payload;
        })
        .addCase(getAllCharacters.rejected, (state) => {
            state.charactersLoading = false;
        });
    }
});

export default characterSlice.reducer;