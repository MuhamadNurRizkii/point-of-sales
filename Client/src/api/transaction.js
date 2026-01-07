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

const getTransactionsAPI = async (page, limit, token) => {
  const request = new URL(`${url}/dashboard/transactions`);

  request.searchParams.append("page", page);
  request.searchParams.append("limit", limit);
  return await fetch(request, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export { createTrasactionAPI, getTransactionsAPI };
