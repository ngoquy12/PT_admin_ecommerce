import jsonAxios from "../apis/instance";

const getAllCategory = async () => {
  const response = await jsonAxios.get("admin/categories");

  return response.data;
};

export { getAllCategory };
