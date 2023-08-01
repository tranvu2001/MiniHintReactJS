import axios from 'axios'
// const ORDER_API_URL = "http://localhost:8080/orders"
const ORDER_API_URL = "https://minihint-spring-boot.onrender.com/orders"

class OrderServices {
    getOrders() {
        return axios.get(ORDER_API_URL)
    }

    createOrder(order) {
        return axios.post(ORDER_API_URL, order)
    }

    updateOrder(order, orderId) {
        return axios.put(ORDER_API_URL + '/' + orderId, order)
    }

    updateStatus(orderId, status) {
        return axios.patch(ORDER_API_URL + '/' + orderId + '/' + status)
    }

    deleteOrder(orderId) {
        return axios.delete(ORDER_API_URL + '/' + orderId)
    }
}

export default new OrderServices()
