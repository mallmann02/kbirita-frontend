export function storeUser(data) {
  const stringfiedData = JSON.stringify(data);
  localStorage.setItem('user', stringfiedData);
}

export function verifyUserExistance() {
  const user = localStorage.getItem('user');
  if (!user) return false;
  return JSON.parse(user);
}

export function logoutUser() {
  localStorage.removeItem('user');
}
