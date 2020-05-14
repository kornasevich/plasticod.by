import axios from 'axios';

const url = 'http://localhost:5000/api/news';

class NewsService {
    static getNews() {
        return axios.get(url)
    }

    static insertNews(news) {
        return axios.post(url, {
            news
        });
    }

    static  deleteNews(id) {
        return axios.delete(`${url}/${id}`)
    }

    static updateNews(id, news){
        return axios.put(`${url}/${id}`, news)
    }
}

export default NewsService;