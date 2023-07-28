import axios from "axios";
const CATEGORY_API_URL = 'http://localhost:8080/categories'

class CategoryServices {
    getCategory() {
        return axios.get(CATEGORY_API_URL)
    }

    createCategory(category) {
        return axios.post(CATEGORY_API_URL, category)
    }

    getCategoryById(categoryId) {
        return axios.get(CATEGORY_API_URL + '/' + categoryId)
    }

    updateCategory(category, categoryId) {
        return axios.put(CATEGORY_API_URL + '/' + categoryId, category)
    }

    deleteCategory(categoryId) {
        return axios.delete(CATEGORY_API_URL + '/' + categoryId)
    }


}

export default new CategoryServices()