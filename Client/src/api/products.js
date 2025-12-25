const url = import.meta.env.VITE_PATH_URL;

const createProductAPI = async (formData) => {
  return await fetch(`${url}/dashboard/products/add`, {
    method: "POST",
    body: formData,
  });
};

const getProductsAPI = async (page, limit) => {
  const request = new URL(`${url}/dashboard/products`);

  request.searchParams.append("page", page);
  request.searchParams.append("limit", limit);

  return await fetch(request, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export { createProductAPI, getProductsAPI };
