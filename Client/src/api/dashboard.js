const url = import.meta.env.VITE_PATH_URL;

const getDatadashboard = async (token) => {
  return await fetch(`${url}/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getDatadashboard };
