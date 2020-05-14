import axios from 'axios';

const url = 'http://localhost:5000/api/about';

class AboutService {
    static getAbout() {
        return axios.get(url)
    }

    static insertAbout(about) {
        return axios.post(`${url}/add-about`, {
            ...about
        });
    }

    static updateAbout(about) {
        return axios.post(`${url}/edit-about`, {
            ...about
        })
    }
}

export default AboutService;