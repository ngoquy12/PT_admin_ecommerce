import jsonAxios from "../apis/instance";

const createProduct = async (product) => {
  const response = await jsonAxios.post("admin/products", product);

  return response;
};

const upadteProduct = async (id, product) => {
  const response = await jsonAxios.put(`admin/products/${id}`, product);

  return response;
};

const getAllProduct = async (search, currentPage = 0, pageSize = 5) => {
  const response = await jsonAxios.get(
    `admin/products?search=${search}&page=${currentPage}&size=${pageSize}`
  );

  return response.data;
};

const removeProduct = async (id) => {
  const response = await jsonAxios.delete(`admin/products/${id}`);

  return response;
};

export { createProduct, getAllProduct, removeProduct, upadteProduct };
