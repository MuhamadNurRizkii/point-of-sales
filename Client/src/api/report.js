const url = import.meta.env.VITE_PATH_URL;

export const getDataReport = async (token) => {
  return await fetch(`${url}/dashboard/report`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
