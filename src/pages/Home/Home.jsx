import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Section from '../../components/Section/Section'
import Banner from '../../components/Slide/Banner'
import classNames from 'classnames/bind'
import styles from './Home.module.css'
import FlashDeal from '../../components/FlashDeal/FlashDeal'
import BestOffer from '../../components/BestOffer/BestOffer'
import ShopByCategories from '../../components/ShopByCategories/ShopByCategories'
import WhatNews from '../../components/WhatNews/WhatNews'
import TopKeyBoards from '../../components/TopKeyBoards/TopKeyBoards'
import BannerCustom from '../../components/BannerCustom/BannerCustom'
import TopProductSwiper from '../../components/TopProductSwiper/TopProductSwiper'
import FeaturedBrand from '../../components/FeaturedBrand/FeaturedBrand'
import ShopWithUs from '../../components/ShopWithUs/ShopWithUs'
import Footer from '../../components/Footer/Footer'

const cx = classNames.bind(styles)

const Home = () => {
  // const [products, setProducts] = useState([])

  //   useEffect(() => {
  //       ProductServices.getProducts().then((res) => {
  //           setProducts(res.data)
  //       }) .catch(err => console.log(err))
  //   }, [])

  return (
    <div className={cx('home')}>
        {/* <Header /> */}
        <Banner />
        <Section />
        <FlashDeal />
        <BestOffer />
        <ShopByCategories />
        <WhatNews />
        <TopKeyBoards />
        <BannerCustom />
        <TopProductSwiper />
        <FeaturedBrand />
        <ShopWithUs />
        {/* <Footer /> */}
    </div>
  )
}

export default Home