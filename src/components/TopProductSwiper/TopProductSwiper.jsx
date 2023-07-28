import classNames from "classnames/bind";
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../Swiper/SwiperStyle.css";

import CardProduct from "../CardProduct/CardProduct";
import styles from "./TopProductSwiper.module.css"
import ProductServices from "../../axios/ProductServices";
import { useEffect, useState } from "react";


const cx = classNames.bind(styles)

const TopProductSwiper = () => {
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
    return (
        <div className={cx('top-product-swiper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                        <h2 className={cx('title')}>Sản phẩm nổi bật</h2>
                        <a href="#" className={cx('see-all')}>Xem tất cả</a>
                </header>
                <ul className={cx('product-list')}>
                    {/* <li><CardProduct /></li>
                    <li><CardProduct /></li>
                    <li><CardProduct /></li>
                    <li><CardProduct /></li>
                    <li><CardProduct /></li> */}
                    <Swiper 
                        // spaceBetween={0}
                        // slidesPerView={5}
                        spaceBetween={90}
                        slidesPerView={5}
                        breakpoints = {{
                            // when window width is >= 320px
                            320: {
                              slidesPerView: 1,
                              spaceBetween: 0
                            },
                            // when window width is >= 480px
                            480: {
                              slidesPerView: 1,
                              spaceBetween: 30
                            },
                            // when window width is >= 640px
                            640: {
                              slidesPerView: 4,
                              spaceBetween: 40
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 0
                            },
                            1279: {
                                slidesPerView: 5,
                                spaceBetween: 0
                            },
                            1440: {
                                slidesPerView: 5,
                                spaceBetween: 0
                            },
                          }}
                        pagination = {{
                            clickable: true
                        }}
                        modules={[Pagination]}
                        className={cx('mySwiper')}
                    >
                        {splitProducts(products, 20,25).map((item, index) =>(
                            <SwiperSlide className={cx('swiper-slide')} key={index}><CardProduct 
                            
                            slugName={item.slugName} 
                            productName={item.productName} 
                            price={item.price} 
                            image={item.productImage}
                            image2={item.productImage2}
                            description={item.description}
                            brand={item.brandId}
                            discountPercent={item.discountPercent}
                        /></SwiperSlide>
                        ))}
                        
                    </Swiper>
                </ul>
            </div>
        </div>
    )
}

export default TopProductSwiper