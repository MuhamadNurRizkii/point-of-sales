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

const registerAPI = async (nama_depan, nama_belakang, username, password) => {
  return await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ nama_depan, nama_belakang, username, password }),
  });
};

export { loginAPI, registerAPI };
