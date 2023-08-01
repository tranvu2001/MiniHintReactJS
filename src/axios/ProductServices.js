import axios from 'axios'
const PRODUCT_API_URL = "https://minihint-spring-boot.onrender.com/products"
// const PRODUCT_API_URL = "http://localhost:8080/products"
const PRODUCT_DETAIL_API_URL = "http://localhost:8080/products/detail"
const PRODUCT_SEARCH_API_URL = "http://localhost:8080/products/search?productName="

class ProductServices {
    getProducts() {
        return axios.get(PRODUCT_API_URL)
    }

    createProduct(product) {
        return axios.post(PRODUCT_API_URL, product)
    }

    getProductById(productId) {
        return axios.get(PRODUCT_API_URL + '/' + productId)
    }

    getProductBySlugName(slugName) {
        return axios.get(PRODUCT_DETAIL_API_URL + '/' + slugName)
    }

    searchProduct(search) {
        return axios.get(PRODUCT_SEARCH_API_URL + search)
    }

    updateProduct(product, productId) {
        return axios.put(PRODUCT_API_URL + '/' + productId, product)
    }

    deleteProduct(productId) {
        return axios.delete(PRODUCT_API_URL + '/' + productId)
    }
}

export default new ProductServices()

