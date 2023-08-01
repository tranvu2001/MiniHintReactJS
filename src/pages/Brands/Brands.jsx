import { useEffect, useState } from "react"
import CardProduct from "../../components/CardProduct/CardProduct"
import { useParams } from "react-router-dom"
import ProductServices from '../../axios/ProductServices'

const Brands = () => {

    const [productByBrand, setProductByBrand] = useState([])
    const {brandId} = useParams()

    useEffect(() => {
        ProductServices.getProducts().then(res => {
            setProductByBrand(res.data)
        })
        window.scrollTo(0, 0)
    }, [])

    const filterProduct = (products, brandId) => {
        let filter = products.filter(item => {
            return item.brandId === brandId
        })
        return filter
    }

    return (
        <div className="brands mt-[140px] w-[1200px] max-w-[100%] mx-auto">
            <div className="brands-content">
                <h1 className="text-center text-3xl font-semibold mb-5">Brands</h1>
                <ul className="brands-list grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                    {filterProduct(productByBrand, Number(brandId)).map((item, index) => (
                        <li>
                            <CardProduct 
                        key={index}
                        slugName={item.slugName} 
                        productName={item.productName} 
                        price={item.price} 
                        image={item.productImage}
                        image2={item.productImage2}
                        description={item.description}
                        brand={item.brandId}
                        discountPercent={item.discountPercent}
                    />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Brands