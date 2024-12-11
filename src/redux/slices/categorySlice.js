import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsonAxios from "../../apis/instance";

// Gọi API liên quan đến quản lý danh mục (CRUD)
export const fetchAllCategory = createAsyncThunk(
  "category/fetchAllCategory",
  async () => {
    const response = await jsonAxios.get("admin/categories");

    return response.data.content;
  }
);

// Gọi API thêm mới danh mục
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (category) => {
    const response = await jsonAxios.post("admin/categories", category);

    return response.data;
  }
);

// Khi gọi API sẽ có các thông tin cơ bản sau: trạng thái load dữ liệu, data, error
const initialState = {
  status: "idle",
  data: [],
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {}, // Xử lý các tác vụ đồng bộ (trong trường hợp này chưa cần dùng)
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default categorySlice.reducer;
