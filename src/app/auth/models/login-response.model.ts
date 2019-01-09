interface LoginResponse {
  user: {
    id: string,
    name: string,
    email: string,
    admin: boolean
  };

  auth_token: string;
}

export default LoginResponse;
