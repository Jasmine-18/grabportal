import http from "../http-common";
class DataService {
  login(user) {
    return http.post("/login", user);
  }
  logout() {
    return http.post("/logout");
  }
  auth() {
    return http.get("/auth");
  }
  getTotalAmount(filter){
    return http.post("/dashboard/totalFilter",filter)
  }
}
export default new DataService();
