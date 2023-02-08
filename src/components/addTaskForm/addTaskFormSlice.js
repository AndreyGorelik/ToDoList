import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getDatabase, ref, set} from "firebase/database";
import { nanoid } from "nanoid";

const initialState = {
    loading: 'idle'
}

export const fetchSaveTask = createAsyncThunk(
    "fetchSaveTask",
    async ({userId, title, description, activeDate}) => {
        const db = getDatabase();
        const i = nanoid()
        const putTask = await set(ref(db, `users/${userId}/tasks/${activeDate}/${i}`), {
            id: i,
            title,
            description,
            done: false,
            createdAt: new Date().getTime()
        });

        return putTask;
    }
)

const addTaskFormSlice = createSlice({
    name: "addTaskForm",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSaveTask.pending, state => {
                state.loading = 'loading'
            })
            .addCase(fetchSaveTask.fulfilled, state => {
                state.loading = 'idle'
            })
            .addCase(fetchSaveTask.rejected, state => {
                state.loading = 'error'
            })
    }
})

const { reducer, actions } = addTaskFormSlice;
export const { setLoadingStatus, setTaskDone } = actions;
export default reducer;