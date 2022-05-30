import http from "../http-common";

class JeuDataService {
    getAll() { return http.get("/jeu"); }
    getByID(id) { return http.get(`/jeu/${id}`); }
}

export default new JeuDataService();