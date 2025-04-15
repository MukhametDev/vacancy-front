import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import API from "../../api/api.config.ts";
import {VacancyInterface} from "../../types/interfaces/Vacancy.ts";

interface VacancyState {
    items: VacancyInterface[];
    loading: boolean;
}

const initialState: VacancyState = {
    items: [],
    loading: false,
};

export const fetchVacancies = createAsyncThunk<VacancyInterface[], void>('vacancies/fetchAll', async () => {
    const res = await API.get('/vacancies');
    return res.data;
});

export const createVacancy = createAsyncThunk<VacancyInterface, Partial<VacancyInterface>>('vacancies/create', async (data) => {
    const res = await API.post('/vacancies', data);
    return res.data;
});

export const updateVacancy = createAsyncThunk<
    VacancyInterface,
    { id: number; data: Partial<VacancyInterface> }
>('vacancies/update', async ({ id, data }) => {
    const res = await API.put(`/vacancies/${id}`, data);
    return res.data;
});

export const deleteVacancy = createAsyncThunk<number, number>('vacancies/delete', async (id) => {
    await API.delete(`/vacancies/${id}`);
    return id;
});

const vacancySlice = createSlice({
    name: 'vacancies',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacancies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVacancies.fulfilled, (state, action: PayloadAction<VacancyInterface[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(createVacancy.fulfilled, (state, action: PayloadAction<VacancyInterface>) => {
                state.items.unshift(action.payload);
            })
            .addCase(updateVacancy.fulfilled, (state, action: PayloadAction<VacancyInterface>) => {
                const index = state.items.findIndex(v => v.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteVacancy.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(v => v.id !== action.payload);
            });
    },
});

export default vacancySlice.reducer;
