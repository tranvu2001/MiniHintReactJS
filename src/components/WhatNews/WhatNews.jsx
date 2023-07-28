import { useState, useEffect } from "react";
import ProductServices from "../../axios/ProductServices";
import classNames from "classnames/bind";
import CardProduct from "../CardProduct/CardProduct";
import styles from './WhatNews.module.css'

const cx = classNames.bind(styles)

const WhatNews = () => {

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
    return (
        <div className={cx('what-news')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h2 className={cx('title')}>Có gì mới?</h2>
                    <a href="#" className={cx('see-all')}>Xem tất cả</a>
                </header>
                <div className={cx('content')}>
                    <ul className={cx('product-list')}>
                        {splitProducts(10, 13).map((item, index) =>(
                            <li
                            key={index}
                            ><CardProduct 
                            
                            slugName={item.slugName} 
                            productName={item.productName} 
                            price={item.price} 
                            image={item.productImage}
                            image2={item.productImage2}
                            description={item.description}
                            brand={item.brandId}
                            discountPercent={item.discountPercent}
                        /></li>
                        ))}
                        
                    </ul>
                    <img
                        alt="banner-3"
                        className={cx('banner')}
                        src='./assest/banner3.jpg'
                    />
                </div>
            </div>
        </div>
    )
}

export default WhatNews