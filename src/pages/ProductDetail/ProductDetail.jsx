import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {useCart} from 'react-use-cart'


import style from './ProductDetail.module.css'
import SlickCarousel from '../../components/ProductRelation/ProductRelation'
import Specification from '../../components/Specification/Specification'
import { ButtonStyle } from '../../components/Button/Button'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductServices from '../../axios/ProductServices'
import numberWithCommas from '../../utils/numberWithCommas'

import ProductRelation from '../../components/ProductRelation/ProductRelation'


const cx = classNames.bind(style)

const ProductDetail = () => {

    const [product, setProduct] = useState({id: 0})
    const [productCart, setProductCart] = useState()
    const [previewImg, setPreviewImg] = useState(null)
    const {addItem} = useCart()

    const {slugName} = useParams()
    
    useEffect(() => {
        ProductServices.getProductBySlugName(slugName).then(res => {
            setProduct(prev => ({
                ...prev,
                id: res.data.productId,
                productName: res.data.productName,
                slugName: res.data.slugName,
                productImage: res.data.productImage, 
                productImage2: res.data.productImage2,
                description: res.data.description,
                price: res.data.price,
                categoryId: res.data.categoryId,
                brandId: res.data.brandId,
                discountPercent: res.data.discountPercent,
                rating: res.data.rating
            }))
        })
        window.scrollTo(0, 0)
        
        
        
        
    }, [slugName])

    // useEffect(() => {
    //     setProductCart({
    //         id: product.productId,
    //         productName: product.productName,
    //         slugName: product.slugName,
    //         productImage: product.productImage, 
    //         productImage2: product.productImage2,
    //         description: product.description,
    //         price: product.price,
    //         categoryId: product.categoryId,
    //         brandId: product.brandId,
    //         discountPercent: product.discountPercent,
    //         rating: product.rating
    //     })
    // }, [slugName])

    const renderBrand = (brand) => {
        switch (brand) {
            case 1: return 'Aorus'
            case 2: return 'Asus'
            case 3: return 'Corsair'
            case 4: return 'Logitech'
            case 5: return 'Msi'
            case 6: return 'Steel Series'
            case 7: return 'Nvidia'
            case 8: return 'Razer'
            case 9: return 'Apple'
            case 10: return 'Samsung'
            case 11: return 'Oppo'
            case 12: return 'Mozard'
            case 13: return 'Hydrus'
            case 14: return 'Sony'
            case 15: return 'JBL'
            case 16: return 'Xiaomi'
            case 17: return 'Toto Link'
            case 18: return 'LinkSys'
            case 19: return 'Tenda'
            case 20: return 'Microlab'
            case 21: return 'Harman Kardon'
            case 22: return 'HP'
            case 23: return 'Dell'
            case 24: return 'ViewSonic'
            case 25: return 'Rog'
            case 26: return 'DareU'
            
            case 27: return 'Keychron'
            case 28: return 'Gigabyte'
            case 29: return 'LG'
        
            default:
                break;
        }
    }

    const onSuccess = (ProductDetail) => {
        alert("Thêm vào giỏ hàng thành công")
        addItem(ProductDetail ,1)
    }
    const id = product?.productId

    return (
        <div className={cx('product-detail')}>
                <div className={cx('container')}>
                    <div className={cx('product-view')}>
                        <div className={cx('product-view-left')}>
                            <div className={cx('image-wrapper')}>
                                <div className={cx('image-show')}>
                                    <img 
                                        alt='image-show'
                                        className={cx('image1')}
                                        // src={'../' + product.productImage}
                                        src={previewImg === null ? product.productImage : previewImg}
                                    />
                                </div>
                                <div className={cx('image-preview')}>
                                    
                                        <img 
                                            alt='image-preview'
                                            className={cx('image2')}
                                            src={product.productImage}
                                            onClick={() => setPreviewImg(product.productImage)}
                                        />
                                    
                                    
                                        <img 
                                            alt='image-preview'
                                            className={cx('image2')}
                                            src={product.productImage2}
                                            onClick={() => setPreviewImg(product.productImage2)}
                                        />
                                    
                                    
                                </div>
                            </div>
                        </div>

                        <div className={cx('product-view-right')}>
                            <h3 className={cx('product-name')}>
                                {product.productName}
                            </h3>
                            <span className={cx('stars')}>
                                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                            </span>
                            <p className={cx('description')}>
                                {product.description}
                            </p>

                            <div className={cx('sub-info')}>
                                <p className={cx('info-brand')}>
                                    Thương hiệu: 
                                    <span className={cx('brand')}>{renderBrand(product.brandId)}</span>
                                </p>
                                
                                <span className={cx('price')}>{numberWithCommas(Number(product.price)) + ' vnd'}</span>
                                <ButtonStyle padding={10} marginleft={0} key={id} onClick={() => onSuccess(product)}>Thêm vào giỏ hàng</ButtonStyle>

                            </div>
                        </div>
                    </div>

                    {/* <Specification /> */}

                    <div className={cx('related-product')}>
                        <h3 className={cx('related-product-title')}>Sản phẩm liên quan</h3>

                        {/* <SlickCarousel categoryId={product.categoryId}/> */}
                        <ProductRelation categoryId={product.categoryId} />
                    </div>
                </div>
        </div>
    )
}

export default ProductDetail