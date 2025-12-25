const url = import.meta.env.VITE_PATH_URL;

const loginAPI = async (username, password) => {
  return await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export { loginAPI };
