import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice.js";

const store = configureStore({
  reducer: {
    category: categorySlice,
  },
});

export default store;
