import http from "../http-common";
class DataService {
  login(user) {
    return http.post("/login", user);
  }
  logout() {
    return http.post("/logout");
  }
  auth(token) {
    return http.post("/auth", token);
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
