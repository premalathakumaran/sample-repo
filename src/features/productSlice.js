import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: { products: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return products;
});

export default productSlice.reducer;