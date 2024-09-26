import api from "../../../kit/request";

export const register = (params: any) => {
    return api.post('/users', params);
}