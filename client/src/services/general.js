import axios from 'axios';

const url = 'http://localhost:5000/api/general';

class GeneralService {
    static getGeneral() {
        return axios.get(url)
    }

    static insertGeneral() {
        return axios.post(`${url}/number-order`);
    }

    static updateGeneral(general) {
        return axios.post(`${url}/edit-general`, {
            ...general
        })
    }
}

export default GeneralService;