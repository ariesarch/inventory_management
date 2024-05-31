import Cookies from "js-cookie";

export function loggedIn() {
  const token = Cookies.get("auth_token");
  let result = !token?false:true 
  return result
}
