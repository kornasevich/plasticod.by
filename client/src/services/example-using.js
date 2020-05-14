import axios from 'axios';

const url = 'http://localhost:5000/api/example-using';

class ExampleUsingService {
    static getExampleUsing() {
        return axios.get(url)
    }

    static insertExampleUsing(exampleUsing) {
        return axios.post(`${url}/add-example-using`, {
            ...exampleUsing
        });
    }

    static updateExampleUsing(exampleUsing) {
        return axios.post(`${url}/edit-example-using`, {
            ...exampleUsing
        })
    }
}

export default ExampleUsingService;