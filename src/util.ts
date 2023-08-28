export const extractCookie = (cookieName: string, cookies: string) => {
  if (!cookies) return;
  const splitted = cookies.split(';');
  const cookie = splitted.find((cookie) => cookie.includes(cookieName));

  return cookie.split('=')[1];
};
