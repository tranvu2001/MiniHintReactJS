import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../../Swiper/SwiperStyle.css";

import styles from "./FeaturedBrand.module.css"
import CircleInfo from "../CircleInfo/CircleInfo";

import BrandServices from '../../axios/BrandServices'

const cx = classNames.bind(styles)

const FeaturedBrand = () => {
    const  [brands, setBrands] = useState([])
    
    useEffect(() => {
        BrandServices.getBrand().then(res => {
            setBrands(res.data)
        })

        return () => {BrandServices.getBrand()}
        
    }, [])

    return (
        <div className={cx('featured-brand')}>
            <div className={cx('container')}>
                <header>
                    <h2 className={cx('title')}>Thương hiệu nổi bật</h2>
                </header>
                <ul className={cx('brand-list')}>
                <Swiper 

                        spaceBetween={90}
                        slidesPerView={5}
                        breakpoints = {{
                            320: {
                            slidesPerView: 1,
                            spaceBetween: 0
                            },
                            480: {
                            slidesPerView: 3,
                            spaceBetween: 30
                            },
                            640: {
                            slidesPerView: 4,
                            spaceBetween: 40
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 80
                            },
                            1440: {
                                slidesPerView: 5,
                                spaceBetween: 0
                            },
                        }}
                        // pagination = {{
                        //     clickable: true
                        // }}
                        modules={[Pagination, Navigation]}

                        pagination = {{
                            type: 'fraction'
                        }}
                        navigation ={true}
                        className={cx('mySwiper')}
                    >
                        {brands.map((brand, index) => (
                            <SwiperSlide
                                className={cx('brand-item')}
                                key={index}
                            >
                                    <CircleInfo brandId={brand.brandId} name={brand.brandName} image={brand.brandImage}/>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                </ul>
            </div>
        </div>
    )
}

export default FeaturedBrand