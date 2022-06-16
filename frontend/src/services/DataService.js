import http from "../http-common";
class DataService {
  getAll(page) {
    return http.get(`/items/${page}`);
  }
  login(user) {
    return http.post("/login", user);
  }
  logout() {
    return http.post("/logout");
  }
  auth(headers) {
    return http.get("/auth",headers);
  }
  getTotalAmount(filter){
    return http.post("/dashboard/totalFilter",filter)
  }
  getTodayTransaction(){
    return http.post("/history/todayTransaction")
  }
  getFilteredDataList(filter){
    return http.post("/history/filterTransaction",filter)
  }
}
export default new DataService();
