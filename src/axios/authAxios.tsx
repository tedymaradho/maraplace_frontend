import axios from 'axios';

export const loginAxios = async (uname: string, pass: string) => {
  try {
    const resLogin = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
      {
        email: uname,
        password: pass,
      }
    );

    resLogin && console.log(resLogin.data.data.token);
  } catch (error) {
    console.error(error);
  }
};
