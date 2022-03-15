import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new Ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            // This is why redux toolkit is nice ... can get from another state with getState
            const token = thunkAPI.getState().auth.user.token;
            // state.pending... -> state.fulfilled (async)
            console.log(ticketData);
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            // state.rejected
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll',
    async (_, thunkAPI) => {
        try {
            // This is why redux toolkit is nice ... can get from another state with getState
            const token = thunkAPI.getState().auth.user.token;
            // state.pending... -> state.fulfilled (async)
            return await ticketService.getTickets(token);
        } catch (error) {
            // state.rejected
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        // (actions)
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                console.log('rejected');
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                console.log('rejected');
            });
    },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
