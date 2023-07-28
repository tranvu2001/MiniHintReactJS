import { faStar, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Link} from 'react-router-dom'
import { forwardRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material'
import {styled} from '@mui/material/styles'


import classNames from "classnames/bind"
import { useState, useEffect } from "react"
import ModalProduct from "../ModalProduct/ModalProduct"
import styles from './CardProduct.module.css'
import numberWithCommas from '../../utils/numberWithCommas'
import { useCart } from "react-use-cart"

const cx = classNames.bind(styles)

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const CardProduct = ({margin = '10px',product, slugName, productName, price, image, image2, description, brand, discountPercent}) => {
    const ButtonStyle = styled(Button) ({
        padding: '15px 70px',
        fontSize: '1.4rem',
        border: '1px solid #0a6cdc',
        color: '#fff',
        backgroundColor: '#0a6cdc',
        borderRadius: '50px',
        cursor: 'pointer',
        '&:hover': {
            color: '#0a6cdc'
        }
    })

    const ButtonClose = styled(Button) ({
        position: 'absolute',
        right: 0,
        fontSize: '18px',
        padding: '10px',
    })
    const [open, setOpen] = useState(false)
    const [productInfo, setProductInfo] = useState()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

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

    const {addItem} = useCart()

    const onSuccess = (ProductDetail) => {
        alert("Thêm vào giỏ hàng thành công")
        addItem(ProductDetail ,1)
    }

    

    return (
        <div className={cx('card-product')} style={{margin: margin}}>
            <div className={cx('images')}>
                {discountPercent !== 0 ? <span className={cx('sale')}>Sale</span> : ''}
                <img className={cx('img-1','black')} src={image} alt='img'/>
                <img className={cx('img-2', 'hover')} src={image} alt='img'/>
                {/* <img className={cx('img-3', 'biege')} src={image} alt='img'/>
                <img className={cx('img-4', 'slategray')} src={image} alt='img'/>
                <img className={cx('img-5', 'sandybrown')} src={image} alt='img'/> */}
            <button 
                className={cx('btn-quick-view')}
                onClick={handleOpen}
            >
                Xem nhanh
                <FontAwesomeIcon icon={faUpRightFromSquare}/> 
            </button>
            </div>
            <Link to={`/products/detail/${slugName}`} className={cx('product-name')}>
                {productName}
            </Link>
            <span className={cx('stars')}>
                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
                <FontAwesomeIcon icon={faStar} className={cx('star-icon')}/>
            </span>
            <div className={cx('price')}>
                {/* <del className={cx('old-price')}>{oldPrice}</del>
                <span className={cx('from')}>Còn</span> */}
                <strong className={cx('new-price')}>{numberWithCommas(Number(price)) + 'vnd'}</strong>
            </div>
            {/* <button className={cx('add-to-cart')} onClick={() => onSuccess(product)}>
                Thêm vào giỏ hàng
            </button> */}
            {/* <ModalProduct open={open}/> */}
            <div className={cx('modal-product')}>
            <Dialog 
                // sx={{
                //     height: '85vh'
                // }}
                className={cx('dialog')}
                maxWidth={"lg"}
                fullWidth
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}

            >
                <div className={cx('container')}>
                    <div className={cx('image-block')}>
                        <div className={cx('image-show')}>
                            <img src={image} alt='image-show' className={cx('image1')}/>
                        </div>
                        <div className={cx('slide-show')}>
                            
                            <div className={cx('image-slide')}>
                                <img className={cx('image2')} src={image2}/>
                            </div>
                            <div className={cx('image-slide')}>
                                <img className={cx('image2')} src={image2}/>
                            </div>
                            <div className={cx('image-slide')}>
                                <img className={cx('image2')} src={image2}/>
                            </div>
                            <div className={cx('image-slide')}>
                                <img className={cx('image2')} src={image2}/>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info-block')}>
                        <h2 className={cx('info-title')}>{productName}
                        </h2>
                        <span className={cx('info-stars')}>
                            <FontAwesomeIcon icon={faStar} className={cx('info-star-icon')}/>
                            <FontAwesomeIcon icon={faStar} className={cx('info-star-icon')}/>
                            <FontAwesomeIcon icon={faStar} className={cx('info-star-icon')}/>
                            <FontAwesomeIcon icon={faStar} className={cx('info-star-icon')}/>
                            <FontAwesomeIcon icon={faStar} className={cx('info-star-icon')}/>
                        </span>
                        <div className={cx('sub-info')}>
                            <p className={cx('info-brand')}>
                                Thương hiệu:  
                                <span className={cx('brand')}>{renderBrand(brand)}</span>
                            </p>
                            {/* <p className={cx('info-brand')}>
                                Thương hiệu: 
                                <span className={cx('brand')}>Tên thương hiệu</span>
                            </p>
                            <p className={cx('info-brand')}>
                                Thương hiệu: 
                                <span className={cx('brand')}>Tên thương hiệu</span>
                            </p> */}
                        </div >
                        <span className={cx('price-dialog')}>{numberWithCommas(Number(price)) + 'vnd'}</span>
                        <p className={cx('description')}>{description}</p>
                        {/* <ButtonStyle className={cx('add-to-cart-dialog')} onClick={() => onSuccess(productInfo)}>Thêm vào giỏ hàng</ButtonStyle> */}
                    </div>
                </div>
                <ButtonClose onClick={handleClose}>X</ButtonClose>
            </Dialog>
        </div>
        </div>
    )
}


export default CardProduct