import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'
import ProductServices from '../../axios/ProductServices'
import CardProduct from '../CardProduct/CardProduct'
import styles from './FlashDeal.module.css'

const cx = classNames.bind(styles)

const FlashDeal = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        ProductServices.getProducts().then((res) => {
            setProducts(res.data)
        }) .catch(err => console.log(err))
        return () => {ProductServices.getProducts()}
    }, [])
    const splitProducts = (start, end) => {
        return products.slice(start, end)
    }
    console.log(products)
    return (
        <div className={cx('flash-deal')}>
            <h2 className={cx('flash-deal-title')}>Flash Deal</h2>
            <div className={cx('container')}>
                {splitProducts(0, 10).map((item, index) =>  (
                    <CardProduct 
                        product={item}
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
                {/* {products.map((item, index) =>  (
                    <CardProduct 
                        key={index} 
                        productName={item.productName} 
                        price={item.price} 
                        image={item.productImage}
                        description={item.description}
                        brand={item.brandId}
                        discountPercent={item.discountPercent}
                    />
                ))} */}
            </div>
        </div>
    )
}

export default FlashDeal