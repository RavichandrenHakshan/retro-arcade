export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123' // You can change this later
};

export const isAuthenticated = () => {
  return window.localStorage.getItem('admin_auth') === 'true';
};

export const login = (username: string, password: string) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    window.localStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  window.localStorage.removeItem('admin_auth');
};
