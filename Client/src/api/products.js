const url = import.meta.env.VITE_PATH_URL;

const createProductAPI = async (formData, token) => {
  return await fetch(`${url}/dashboard/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

const getProductsAPI = async (page, limit, token) => {
  const request = new URL(`${url}/dashboard/products`);

  request.searchParams.append("page", page);
  request.searchParams.append("limit", limit);

  return await fetch(request, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getProductById = async (id, token) => {
  return await fetch(`${url}/dashboard/products/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const editProductByIdAPI = async (formData, id, token) => {
  return await fetch(`${url}/dashboard/products/edit/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

const deleteProductByIdAPI = async (id, token) => {
  return await fetch(`${url}/dashboard/products/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  createProductAPI,
  getProductsAPI,
  getProductById,
  editProductByIdAPI,
  deleteProductByIdAPI,
};
