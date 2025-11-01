export const options = (method, token, data = null) => {
  console.log("fdgdfgdfgd", token);
  const opt = {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
    },
  };
  token && (opt.headers.Authorization = `Bearer ${token}`);

  data && (opt.body = JSON.stringify(data));

  return opt;
};
