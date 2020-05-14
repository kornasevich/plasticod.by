import axios from 'axios';

const url = 'http://localhost:5000/api/contacts';

class ContactsService {
    static getContacts() {
        return axios.get(url)
    }

    static insertContacts(contacts) {
        return axios.post(`${url}/add-contacts`, {
            ...contacts
        });
    }

    static updateContacts(contacts) {
        return axios.post(`${url}/edit-contacts`, {
            ...contacts
        })
    }
}

export default ContactsService;