import axios from "axios";
import { server } from "./config";
import { objectToQueryString } from "./serialize";

export default class Service {

    static async deleteEntity(id, service) {
        await axios.delete(server + service + '/' + id);
    }

    static async changeEntity(entity, service) {
        await axios.post(server + service + '/' + entity.id, entity);
    }

    static async addEntity(entity, service) {
        const response = await axios.post(server + service, entity);

        return response.data.id;
    }

    static async getEntities(service, params) {
        const response = await axios.get(server + service, {
            params: params,
            paramsSerializer: objectToQueryString
        });
        
        return response;
    }

    static async addDependencies(service, dependencies, params) {
        await axios.post(server + `${service}/${dependencies}`, params);
    }

    static async register(params) {
        try {
            await axios.post(server + "auth/register", params);
            return true;
        } catch (e) {
            return false;
        }
    }

    static async login(params) {
        axios.defaults.withCredentials = true;
        
        try {
            await axios.post(server + "auth/login", params);
            return true;
        } catch (e) {
            return false;
        }
            
    }

    static async getUser() {
        axios.defaults.withCredentials = true;

        try {
            var response = await axios.get(server + "auth/user");
            return response.data.login;
        } catch (e) {
            return false;
        }
    }

    static async logout() {
        axios.defaults.withCredentials = true;

        await axios.post(server + "auth/logout");
    }
}