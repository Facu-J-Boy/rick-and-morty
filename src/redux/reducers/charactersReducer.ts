import { character } from '../../interfaces';
import { getAllCharacters } from '../../services/getAllCharacters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCharactersFromLocalStorage } from '../../utils/localStorage';

export interface characterState {
  characters: character[];
  charactersLoading: boolean;
  genders: string[];
  origins: string[];
}

const initialState: characterState = {
  characters: [],
  charactersLoading: false,
  genders: [],
  origins: []
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<character>) => {
      state.characters.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacters.pending, (state) => {
        state.charactersLoading = true;
        state.characters = [];
      })
      .addCase(
        getAllCharacters.fulfilled,
        (state, action: PayloadAction<character[]>) => {
          state.charactersLoading = false;
          const localCharacters = getAllCharactersFromLocalStorage();
          state.characters = [...action.payload, ...localCharacters];
          if (state.characters.length > 0) {
            state.genders = [
              ...new Set(action.payload.map((character) => character.gender))
            ];
            state.origins = [
              ...new Set(
                action.payload.map((character) => character.origin.name)
              )
            ];
          }
        }
      )
      .addCase(getAllCharacters.rejected, (state) => {
        state.charactersLoading = false;
      });
  }
});

export const { addCharacter } = characterSlice.actions;

export default characterSlice.reducer;
