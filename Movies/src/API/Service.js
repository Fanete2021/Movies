import axios from "axios";
import { server } from "./config";
import { objectToQueryString } from "./serialize";

export default class Service {

    static async getLast(service) {
        const response = await axios.get(server + service + '/last');
        return response.data.id;
    }
    
    static async deleteEntity(id, service) {
        await axios.delete(server + service + '/' + id);
    }

    static async addEntity(entity, service) {
        await axios.post(server + service, entity);
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
}