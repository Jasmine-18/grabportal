import http from "../http-common";
class DataService {
  getFilteredData(page, filter) {
    return http.post(`/getFilteredData/${page}`, filter);
  }
  login(user) {
    return http.post("/login", user);
  }
  logout() {
    return http.post("/logout");
  }
  auth(headers) {
    return http.get("/auth", headers);
  }
  getDataOverall() {
    return http.post("/dashboard/getDataOverall");
  }
  getTodayTransaction() {
    return http.post("/history/todayTransaction");
  }
  exportData(filter) {
    return http.post("/export", filter,{responseType: 'blob'});
  }
}
export default new DataService();
