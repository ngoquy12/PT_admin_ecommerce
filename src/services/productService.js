import jsonAxios from "../apis/instance";

const createProduct = async (product) => {
  const response = await jsonAxios.post("admin/products", product);

  return response;
};

const getAllProduct = async () => {
  const response = await jsonAxios.get("admin/products");

  return response.data;
};

export { createProduct, getAllProduct };
