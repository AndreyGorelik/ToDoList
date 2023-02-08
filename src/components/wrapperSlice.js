import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, child, get, update, remove } from "firebase/database";

const initialState = {
    tasks: {},
    loadingTasks: 'idle'
}

export const getAllTasks = createAsyncThunk(
    "getAllTasks",
    async (id) => {
        try {
            const dbRef = ref(getDatabase());
            let response = await get(child(dbRef, `users/${id}/tasks`))
            let answer = await response.val()
            return answer;
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeTask = createAsyncThunk(
    "removeTask",
    async ({ userId, activeDate, id }) => {
        try {
            const db = getDatabase();
            remove(ref(db, `users/${userId}/tasks/${activeDate}/${id}`))
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateTask = createAsyncThunk(
    "updateTask",
    async ({ userId, activeDate, id, title, description }) => {
        try {
            const db = getDatabase();
            update(ref(db, `users/${userId}/tasks/${activeDate}/${id}`), {
                title: title,
                description: description
            });
        } catch (error) {
            console.log(error)
        }
    }
)

const allTasks = createSlice({
    name: "accInfo",
    initialState,
    reducers: {
        setLoadingStatus(state, action) {
            state.loadingTasks = action.payload;
        },
        setTaskDone(state, action) {
            const { activeDate, id, userId } = action.payload;
            state.tasks[activeDate][id].done = !state.tasks[activeDate][id].done

            const db = getDatabase();
            update(ref(db, `users/${userId}/tasks/${activeDate}/${id}`), {
                done: state.tasks[activeDate][id].done
            });
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.pending, state => {
                state.loadingTasks = "pending";
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                const nowDate = new Date();
                const currentYear = nowDate.getFullYear();
                const currentMonth = nowDate.getMonth();
                const currentDate = nowDate.getDate();

                const dateFormat =
                    "" +
                    currentYear +
                    (currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1) +
                    (currentDate < 10 ? "0" + currentDate : currentDate);

                if (action.payload !== null && action.payload !== undefined) {
                    const filteredDates = Object.fromEntries(Object.entries(action.payload).filter(item => item[0] >= dateFormat))
                    state.tasks = filteredDates;
                    state.loadingTasks = "idle";
                }


            })
            .addCase(getAllTasks.rejected, state => {
                state.loadingTasks = "error";
            })
            .addDefaultCase(() => { })
    }
})


const { reducer, actions } = allTasks;
export const { setLoadingStatus, setTaskDone } = actions;
export default reducer;