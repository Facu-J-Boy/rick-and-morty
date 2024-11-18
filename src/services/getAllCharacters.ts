import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./api";

export const getAllCharacters = createAsyncThunk(
    'getAllCharacters',
    async() => {
        try {
            const response = await axiosInstance.get('/character');
            return response.data.results;
        } catch (error) {
            console.error(error);
        }
    }
)