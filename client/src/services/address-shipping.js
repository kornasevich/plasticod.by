import axios from 'axios';

const url = 'http://localhost:5000/api/address-shipping';

class AddressShippingService {
    static getShippingService() {
        return axios.get(url)
    }

    static insertShippingService(addressShipping) {
        return axios.post(`${url}/add-address-shipping`, {
            ...addressShipping
        });
    }

    static updateShippingService(addressShipping) {
        return axios.post(`${url}/edit-address-shipping`, {
            ...addressShipping
        })
    }
}

export default AddressShippingService;