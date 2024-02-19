/*
username: "johnd",
password: "m38rmF$"
*/

const fakeApiLogin = (username, password) => {
  return fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Usuario o contraseña incorrectos");
      }
    })
    .catch((error) => {
      throw error;
    });
};

const GetAllUsers = () => {
  return fetch("https://fakestoreapi.com/users")
    .then((res) => res.json())
    .then((json) => console.log(json));
};

export default fakeApiLogin;
