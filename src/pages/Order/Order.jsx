import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonStyle } from "../../components/Button/Button"
import { useCart } from "react-use-cart"
import numberWithCommas from "../../utils/numberWithCommas"
import OrderService from '../../axios/OrderService'
import { useAuthValue } from "../../Context/AuthContext"

const Order = () => {
    const {cartTotal} = useCart()
    const navigate = useNavigate()
    const infoUser = JSON.parse(localStorage.getItem("USER_INFO"))
    const cartItems = JSON.parse(localStorage.getItem("react-use-cart"))
    const authContext = useAuthValue()
    console.log(cartItems)
    // const statusList = [
    //     {id: 1, name: 'Chờ xác nhận'},
    //     {id: 2, name: 'Đã xác nhận'},
    //     {id: 3, name: 'Đang giao'},
    //     {id: 4, name: 'Đã giao'},
    //     {id: 5, name: 'Hủy'},
    // ]
    const [input, setInput] = useState(
        {
            email: infoUser.email,
            name: infoUser.displayName,
            phone: '',
            address: '',
            productName: '',
            price: '',
            quantity: '',
            image: '',
            status: 'Chờ xác nhận'
        })
    
    const orders = cartItems.items.map((item, index) => {
        return {
            email: infoUser.email,
            name: infoUser.displayName,
            phone: input.phone,
            address: input.address,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            image: item.productImage,
            status: 'Chờ xác nhận'
        }
    })

    console.log(authContext)
    
    const handleChange = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e, orders) => {
        e.preventDefault()
        
            orders.map(order => {
                OrderService.createOrder(order).then(() => {
                    localStorage.removeItem("react-use-cart")
                    window.location.reload(true)
                    navigate('/')
                })
            })
        
        // console.log()
    }

    return (
        <div className="order mt-[60px] md:mt-[100px] lg:mt-[40px] flex items-center justify-center">
            <div className="md:border md:border-[#ccc] p-5 rounded-[20px] w-full md:w-[440px]">
                <form onSubmit={(e) => handleSubmit(e, orders)}>
                        <div className="flex flex-col items-start mt-[14px]">
                            <label htmlFor="email" className="text-base mb-2 block w-full">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="w-full md:w-[400px] max-w-[450px] 
                                           px-[14px] py-[10px]
                                           outline-none border border-[#ccc]
                                           rounded-[22px]
                                           text-base" 
                                id="email"
                                value={infoUser.email}
                                onChange={handleChange}
                                disabled
                                
                            />
                        </div>
                        <div className="flex flex-col items-start mt-[14px]">
                            <label htmlFor="name" className="text-base mb-2 block w-full">Tên</label>
                            <input 
                                type="name" 
                                name="name" 
                                className="w-full md:w-[400px] max-w-[450px] 
                                           px-[14px] py-[10px]
                                           outline-none border border-[#ccc]
                                           rounded-[22px]
                                           text-base" 
                                id="name"
                                value={infoUser.displayName}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col items-start mt-[14px]">
                            <label htmlFor="phone" className="text-base mb-2 block w-full">Số điện thoại</label>
                            <input 
                                type="phone" 
                                name="phone" 
                                className="w-full md:w-[400px] max-w-[450px] 
                                           px-[14px] py-[10px]
                                           outline-none border border-[#ccc]
                                           rounded-[22px]
                                           text-base"  
                                id="phone"
                                autoComplete="false"
                                value={input.phone}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="flex flex-col items-start mt-[14px]">
                            <label htmlFor="address" className="text-base mb-2 block w-full">Địa chỉ</label>
                            <input 
                                type="address" 
                                name="address" 
                                className="w-full md:w-[400px] max-w-[450px] 
                                           px-[14px] py-[10px]
                                           outline-none border border-[#ccc]
                                           rounded-[22px]
                                           text-base"  
                                id="address"
                                value={input.address}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="flex flex-col items-start mt-[14px]">
                            <label htmlFor="total" className="text-base mb-2 block w-full">Tổng</label>
                            <input 
                                type="total" 
                                name="total" 
                                className="w-full md:w-[400px] max-w-[450px] 
                                           px-[14px] py-[10px]
                                           outline-none border border-[#ccc]
                                           rounded-[22px]
                                           text-base" 
                                id="total"
                                value={numberWithCommas(cartTotal) + 'vnd'}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        
                        <div className="">
                            <ButtonStyle type="submit" margintop='30px' fullWidth marginleft={0} padding={'9.7px 19px'}>Hoàn tất</ButtonStyle>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default Order