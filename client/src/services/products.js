import axios from 'axios';

const url = 'http://localhost:5000/api/products';

class PostService {
    static getProducts() {
        return axios.get(url)
    }

    static insertProducts(product) {
        return axios.post(url, {
            product
        });
    }

    static uploadFile(product) {
        return axios.post(`${url}/upload`, {
            product
        });
    }

    static  deleteProducts(id) {
        return axios.delete(`${url}/${id}`)
    }

    static updateProduct(id, product){
        return axios.put(`${url}/${id}`, product)
    }
}

export default PostService;