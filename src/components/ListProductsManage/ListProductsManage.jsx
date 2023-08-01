import {useState, useEffect} from 'react'
import ProductServices from '../../axios/ProductServices'
import { ButtonStyle } from "../Button/Button"
import { Link } from "react-router-dom"
const ListProductsManage = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        ProductServices.getProducts().then(res => {
            setProducts(res.data)
        })
    }, [])

    const handleDeleteProduct = (id) => {
        ProductServices.deleteProduct(id).then(res => {
            setProducts(prevState => {
                return prevState.filter(product => product.productId !== id)   
            })
        })
    }
    return (
        <table className="w-full text-center mt-[17px]">
                        <tr>
                            <td>Id</td>
                            <td>Hình</td>
                            <td>Tên</td>
                            <td>Giá</td>
                            <td>Thao tác</td>
                        </tr>

                        {products?.map((product) => (
                            <tr key={product.productId} className="text-center">
                                <td>{product.productId}</td>
                                <td><img src={product.productImage} alt="img-product" className="w-12 h-12 mx-auto"  /></td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td className='w-[15%]'>
                                    
                                    <Link 
                                        to={`/dashboard/product-manage/view-product/${product.productId}`}
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
                                        Xem
                                    </Link>
                                    <Link 
                                        to={`/dashboard/product-manage/update/${product.productId}`}
                                        className="inline-block
                                                min-w-[64px]
                                                text-[1.4rem]
                                                px-[10px] py-[0px]
                                                my-2
                                                border border-[#ccc]
                                                text-center
                                                rounded-[50px]
                                                hover:bg-[#ccc] hover:text-white
                                                transition-colors"
                                                
                                    >
                                        Sửa
                                    </Link>
                                    <ButtonStyle 
                                        padding="0px 10px" 
                                        fontSize="1.2rem"
                                        margintop='0'
                                        onClick={() => handleDeleteProduct(product.productId)}
                                    >
                                        Xóa
                                    </ButtonStyle>
                                    
                                </td>
                            </tr>
                        ))}
    
                        
            </table>
    )
}

export default ListProductsManage