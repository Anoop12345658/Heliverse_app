import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService'; 

const initialState = {
    users: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    filters: { 
        domain: [], 
        gender: [],
        available: null
    },
    searchQuery: '',
    selectedTeam: null
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (params, { getState }) => {
    const { currentPage, filters, searchQuery } = getState().users; 
    return await userService.getUsers(currentPage, filters, searchQuery);
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSelectedTeam: (state, action) => {
            state.selectedTeam = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users; 
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            });
    }
});

export const { setCurrentPage, setFilter, setSearchQuery, setSelectedTeam } = usersSlice.actions;
export default usersSlice.reducer;