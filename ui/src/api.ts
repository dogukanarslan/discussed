export const apiFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, {
    credentials: 'include',
    ...init,
  });

  if (res.status === 401) {
    sessionStorage.removeItem('user');
    window.location.hash = '#/signin';
  }

  return res;
};
