/* Modules */
import cookie from "js-cookie";

export default function Logout() {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  removeCookie("jwt");
  localStorage.removeItem("token");
  
  window.location = "/login";
};