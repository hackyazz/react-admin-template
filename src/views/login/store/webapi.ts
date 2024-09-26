import api from "../../../kit/request";

export const encodeLogin = (params: any) => {
    return api.post('/users/login', params);
}