import API from "./API"

class BackendService {
    static async getIndex() {
        try {
            const response = await API().get("/")
            return response.data.message;
        } catch (error) {
            return error.message;
        }
    }
    static async postLogin(data) {

        try {
            const response = await API().post("/login", data);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
    static async postRegister(data) {
        console.log(data);
        try {
            const response = await API().post("/register", data);
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
    static async postLogout() {
        try {
            const response = await API().post("/logout");
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
}
export default BackendService;