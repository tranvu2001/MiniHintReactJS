
import classNames from 'classnames/bind'
import style from './ProductRelation.module.css'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../Swiper/SwiperStyle.css";

import CardProduct from '../CardProduct/CardProduct'
import ProductServices from '../../axios/ProductServices'
import { useEffect, useState } from 'react'

const cx = classNames.bind(style)

const ProductRelation = ({categoryId, slugName, productName, price, image, image2, description, brand, discountPercent}) => {

    const [productRelation, setProductRelation] = useState([])
    // const settings = {
    //     infinite: true,
    //     slidesToShow: 5,
    //     slidesToScroll: 2,
    //     lazyLoad: true,
    //     autoplay: true,
    //     autoplaySpeed: 2000
    // }

    useEffect(() => {
        ProductServices.getProducts().then(res => {
            setProductRelation(res.data)
        })
    }, [])

    const filterProduct = (products, categoryId) => {
        let filter = products.filter(item => {
            return item.categoryId === categoryId
        })

        return filter.slice(0, 8)
    }

    return (
        // <Slider 
        //     {...settings}
            
        // >
        //     {filterProduct(productRelation, categoryId).map((item, index) => (
        //         <div className={cx('slider-item')}>
        //             {/* <img alt='slider-item' src='../assest/item1/img01..jpg'/> */}
        //             <CardProduct 
        //                     key={index} 
        //                     productName={item.productName} 
        //                     slugName={item.slugName} 
        //                     price={item.price} 
        //                     image={item.productImage}
        //                     description={item.description}
        //                     brand={item.brandId}
        //                     discountPercent={item.discountPercent} 
        //             />
        //         </div>
        //     ))}

            
        // </Slider>
        <Swiper 
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
            {filterProduct(productRelation, categoryId).map((item, index) => (
                <div className={cx('item')}>
                    {/* <img alt='slider-item' src='../assest/item1/img01..jpg'/> */}
                    <SwiperSlide className={cx('swiper-slide')}>
                    <CardProduct 
                            key={index} 
                            productName={item.productName} 
                            slugName={item.slugName} 
                            price={item.price} 
                            image={item.productImage}
                            description={item.description}
                            brand={item.brandId}
                            discountPercent={item.discountPercent} 
                    />
                    </SwiperSlide>
                </div>
            ))}
        </Swiper>
    )
}

export default ProductRelation