import {getCookie} from "./cookieUtils";
import axios from "axios";

export function tokenAttach(){
  // Get the JWT from the cookie named 'jwt'
  const jwtToken = getCookie('jwt');
  if (jwtToken) {
    axios.defaults.headers.common['x-access-token'] = jwtToken;
  } else {
    console.log('JWT not found in cookies');
  }
}
