const url = import.meta.env.VITE_PATH_URL;

const createTrasactionAPI = async (data, token) => {
  return await fetch(`${url}/dashboard/transaction/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export { createTrasactionAPI };
