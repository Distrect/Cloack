export const extractCookie = (cookieName: string, cookies: string) => {
  const splitted = cookies.split(';');
  const cookie = splitted.find((cookie) => cookie.includes(cookieName));

  return cookie.split('=')[1];
};
