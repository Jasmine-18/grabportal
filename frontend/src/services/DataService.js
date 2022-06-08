import http from "../http-common";
class DataService {
  login(data) {
    return http.post("/login",data);
  }
  logout() {
    return http.post("/logout");
  }
  auth() {
    return http.get(`/auth`);
  }
}
export default new DataService();