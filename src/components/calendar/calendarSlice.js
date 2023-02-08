import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeDate: null,
    activeMonth: null,
    activeYear: null
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setActiveDate(state, action) {
            state.activeDate = action.payload
        },
        setDaysCount(state, action) {
            state.daysCount = action.payload
        }
    }
});

const { reducer, actions } = calendarSlice;
export const { setActiveDate, setDaysCount } = actions;
export default reducer;