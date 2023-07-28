import { useState, useEffect } from 'react'
import ProductServices from '../../axios/ProductServices'
import classNames from "classnames/bind";
import CardProduct from "../CardProduct/CardProduct";
import styles from "./TopKeyBoards.module.css"

const cx = classNames.bind(styles)

const TopKeyBoards = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        ProductServices.getProducts().then((res) => {
            setProducts(res.data)
        }) .catch(err => console.log(err))
        return () => {ProductServices.getProducts()}
    }, [])
    const splitProducts = (arrayProducts,start, end) => {
        return arrayProducts.slice(start, end)
    }

    const filterProducts = (products, categoryId) => {
        const filter =  products.filter(item => {
            return item.categoryId === categoryId
        })
        return filter
    }
    
    
    return (
        <div className={cx('top-keyboard')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                        <h2 className={cx('title')}>Bàn phím bán chạy</h2>
                        <a href="#" className={cx('see-all')}>Xem tất cả</a>
                </header>
                <ul className={cx('product-list')}>
                        {splitProducts(filterProducts(products, 2), 0,5).map((item, index) =>(
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
                        ))}
                </ul>
            </div>
        </div>
    )
}

export default TopKeyBoards