import axios from "axios";
// const BRAND_API_URL = 'http://localhost:8080/brands'
const BRAND_API_URL = 'https://minihint-spring-boot.onrender.com/brands'

class BrandServices {
    getBrand() {
        return axios.get(BRAND_API_URL)
    }

    createBrand(brand) {
        return axios.post(BRAND_API_URL, brand)
    }

    getBrandById(brandId) {
        return axios.get(BRAND_API_URL + '/' + brandId)
    }

    updateBrand(brand, brandId) {
        return axios.put(BRAND_API_URL + '/' + brandId, brand)
    }

    deleteBrand(brandId) {
        return axios.delete(BRAND_API_URL + '/' + brandId)
    }


}

export default new BrandServices()