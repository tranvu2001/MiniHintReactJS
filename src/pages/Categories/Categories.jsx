import { useEffect, useState } from "react"
import CardProduct from "../../components/CardProduct/CardProduct"
import { useParams } from "react-router-dom"
import ProductServices from '../../axios/ProductServices'

const Categories = () => {

    const [productByCategory, setProductByCategory] = useState([])
    const {categoryId, brandId} = useParams()


    useEffect(() => {
        ProductServices.getProducts().then(res => {
            setProductByCategory(res.data)
        })
        window.scrollTo(0, 0)
    }, [])

    const filterProduct = (products, categoryId) => {
        let filter = products.filter(item => {
            return item.categoryId === categoryId
        })
        return filter
    }

    return (
        <div className="categories mt-[140px] w-[1200px] max-w-[100%] mx-auto">
            <div className="categories-content">
                <h1 className="text-center text-3xl font-semibold mb-5">Categories</h1>
                <ul className="categories-list grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                    {filterProduct(productByCategory, Number(categoryId)).map((item, index) => (
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

export default Categories