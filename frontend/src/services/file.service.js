// Data service that uses axios object to send HTTP requests/ make API calls for filesystem

import http from "../http-common";

class FileDataService {
  
  getAll() {
    return http.get("/filesystem/files");
  }

  get(id) {
    return http.get(`/filesystem/files/${id}`);
  }

  create(data) {
    return http.post("/filesystem/files", data);
  }

  update(id, data) {
    return http.put(`/filesystem/files/${id}`, data);
  }

  delete(id) {
    return http.delete(`/filesystem/files/${id}`);
  }

  deleteAll() {
    return http.delete(`/filesystem/files`);
  }

  findByTitle(title) {
    return http.get(`/filesystem/files?title=${title}`);
  }
}

export default new FileDataService();