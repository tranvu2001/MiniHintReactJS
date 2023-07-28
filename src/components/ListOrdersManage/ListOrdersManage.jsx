import { Link } from "react-router-dom"
import { ButtonStyle } from "../Button/Button"
import { useEffect, useState } from "react"
import BrandServices from "../../axios/BrandServices"
import OrderService from "../../axios/OrderService"
const ListOrdersManage =() => {

    const [orders, setOrders] = useState([])
    useEffect(() => {
        OrderService.getOrders().then(res => {
            setOrders(res.data)
        })
    }, [])

    const statusOptions = [
        {
            label: 'Chờ xác nhận',
            value: 'Chờ xác nhận'
        },
        {
            label: 'Đã xác nhận',
            value: 'Đã xác nhận'
        },
        {
            label: 'Đã xuất kho',
            value: 'Đã xuất kho'
        },
        {
            label: 'Đang giao',
            value: 'Đang giao'
        },
        {
            label: 'Hoàn thành',
            value: 'Hoàn thành'
        },
        {
            label: 'Bị hủy',
            value: 'Bị hủy'
        }
    ]

    const toggleStatus = (e, orderId) => {
        OrderService.updateStatus(orderId, e.target.value).then(res => {
            window.location.reload(true)
        })
    }

    console.log(orders)
    const handleDelete = (id) => {
        OrderService.deleteOrder(id).then(res => {
            setOrders(prevState => {
                return prevState.filter(order => order.orderId !== id)
            })
        })
    }
    return (
        <div>
            
            <table className="w-full text-center mt-[17px]">
                        <tr>
                            <td>Id</td>
                            <td>Tên khách hàng</td>
                            <td>Tên sản phẩm</td>
                            {/* <td>Giá</td> */}
                            <td>Hình</td>
                            <td>Giá</td>
                            <td>Trạng thái</td>
                            <td>Thao tác</td>
                        </tr>

                        {orders.map((order, index) => (
                            <tr className="text-center">
                                <td>{order.orderId}</td>
                                <td>{order.name}</td>
                                <td>{order.productName}</td>
                                <td><img src={order.image} alt="img-product" className="w-12 h-12 mx-auto"  /></td>
                                <td>{order.price}</td>
                                <td>
                                    <select 
                                        name="status" 
                                        id="status"
                                        value={order.status}
                                        className="cursor-pointer"
                                        onChange={(e) => toggleStatus(e, order.orderId)}
                                    >
                                        {statusOptions.map((item, index) => (
                                            <option value={item.value} key={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </td>
                                {/* <td></td> */}
                                {/* <td>123,123,123$</td> */}
                                <td>
                                    {/* <Link 
                                        to=''
                                        className="inline-block
                                                min-w-[64px]
                                                text-[1.4rem]
                                                px-[10px] py-[0px]
                                                border border-[#ccc]
                                                text-center
                                                rounded-[50px]
                                                hover:bg-[#ccc] hover:text-white
                                                transition-colors"
                                                
                                    >
                                        Sửa
                                    </Link> */}
                                    <ButtonStyle onClick={() => handleDelete(order.orderId)} padding="0px 10px" fontSize="1.2rem">Xóa</ButtonStyle>
                                </td>
                            </tr>
                        ))}
                        
                        
            </table>
        </div>
    )
}

export default ListOrdersManage