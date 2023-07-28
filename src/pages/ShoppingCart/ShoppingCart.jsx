import classNames from "classnames/bind";
import { Button } from "@mui/material";
import {styled} from '@mui/material/styles'
import style from './ShoppingCart.module.css'
import { CartProvider, useCart } from "react-use-cart";
import numberWithCommas from "../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
// import styles from '../../../src/index.css'

const cx = classNames.bind(style)

const ShoppingCart = () => {
    const navigate = useNavigate()
    const authContext = useAuthValue()
    const ButtonAction = styled(Button) (
        ({
            right
        }) => {
            return {
                position: 'absolute',
                fontSize: '16px',
                right: right ? right : '',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'unset'
                }
            }
        }
    )

    const ButtonActions = styled(Button) (
        ({
            backgroundcolor,
            cl,
            backgroundColorHover,
            colorhover,
            margintop = '14px',
            padding = '10px 15px'
        }) => {
            return {
                // width: '340px ',
                // maxWidth: '100% ',
                cursor: 'pointer',
                padding: padding,
                fontSize: '1.6rem',
                fontWeight: 700,
                backgroundColor: backgroundcolor,
                color: cl,
                border: '1px solid #232323',
                margintop: margintop,

                '&:hover' :{
                    backgroundColor: backgroundColorHover,
                    color: colorhover
                }
            }
        }
    )

    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
      } = useCart();

      const sum = (price, quantity) => {
        return price * quantity
      }

      const total = () => {
        var result = 0
        var arrayLength = items.length
        // const quantity = document.getElementsByClassName('quantity')
        // const getQuantity = quantity.innerText
        for (var i = 0; i < arrayLength; i++) {
          result = result + (items[i].price  * items[i].quantity)
        }
        return result
      }

      const Empty = (isEmpty) => {
        if (isEmpty) {
          return <p style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>Chưa có sản phẩm trong giỏ</p>
        }
      }

    return (
        
        <div className={cx('shopping-cart')}>
            <div className={cx('container')}>
                <div className={cx('cart-content-product')}>
                    <div className={cx('cart-header')}>
                        <div className={cx('cart-header-item', 'cart-header-info')}>Sản phẩm</div>
                        <div className={cx('cart-header-item', 'cart-header-price')}>Giá</div>
                        <div className={cx('cart-header-item', 'cart-header-quantity')}>Số lượng</div>
                        <div className={cx('cart-header-item', 'cart-header-total')}>Tổng</div>
                        <div className={cx('cart-header-item', 'cart-header-remove')}></div>
                    </div>
                    <div className={cx('cart-list')}>
                        {
                            Empty(isEmpty)
                        }
                        {items.map((item, index) => (
                            <div key={item.id} className={cx('cart-item')}>
                            <div className={cx('cart-item-block', 'cart-item-info')}>
                                <div className={cx('cart-item-wrapper')}>
                                    <div className={cx('cart-item-left')}>
                                        <img 
                                            alt='product-image' 
                                            className={cx('cart-item-image')}
                                            // src='../assest/item1/img02.jpg'
                                            src={item.productImage}
                                        />
                                    </div>
                                    <div className={cx('cart-item-right')}>
                                        <h4 className={cx('cart-item-name')}>{item.productName}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('cart-item-block', 'cart-item-price')}>
                                <div className={cx('cart-item_price-wrapper')}>
                                    {/* <del className={cx('old-price')}>123,123,123 vnd</del> */}
                                    <span className={cx('new-price')}>{numberWithCommas(Number(item.price)) + 'vnd'}</span>
                                </div>
                            </div>
                            <div className={cx('cart-item-block', 'cart-item-quantity')}>
                                <div className={cx('cart-item-quantity-wrapper')}>
                                    <ButtonAction onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</ButtonAction>
                                    <span className="ml-[67px] text-base"
                                        // className={cx('quantity-input')} 
                                        // type='input' 
                                        // defaultValue={item.quantity}
                                        // onChange ={() => {}}
                                    >{item.quantity}</span>
                                    <ButtonAction right='0px' onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</ButtonAction>
                                </div>
                            </div>
                            <div className={cx('cart-item-block', 'cart-item-total')}>
                                <div className={cx('cart-item-total-wrapper')}>
                                    <span className={cx('money')}>{numberWithCommas(sum(item.price,item.quantity)) + ' VND'}</span>
                                </div>
                            </div>
                            <div className={cx('cart-item-block', 'cart-item-remove')}>
                                <div className={cx('cart-item_remove-wrapper')}>
                                    <ButtonActions margintop='0' padding='5px 10px' onClick={() => removeItem(item.id)}>X</ButtonActions>
                                </div>
                            </div>
                            </div>

                        ))}
                    </div>
                </div>

                {/* Cart total */}
                <div className={cx('cart-total')}>
                        <ul className={cx('cart-total-list')}>
                            <div className={cx('cart-total-title')}>Tóm tắt đơn hàng</div>
                            <li className={cx('cart-total-item', 'cart-total-subtotal')}>
                                <div className={cx('cart-total-label')}>Tổng phụ</div>
                                <div className={cx('cart-total-value')}>
                                    <span className={cx('text')}>
                                        <span className={cx('money')}>{numberWithCommas(total())}</span>
                                    </span>
                                </div>
                            </li>
                            {/* <li className={cx('cart-total-item', 'cart-total-shipping')}>
                                <div className={cx('cart-total-label')}>
                                    <span className={cx('text')}>Ước tính phí giao hàng</span>
                                </div>
                                <div className={cx('cart-total-value')} style={{display: 'none'}}>
                                    <span className={cx('text')}>123$</span>
                                </div>

                                <div className={cx('shipping-caculator')}>
                                    <div className=""></div>
                                </div>
                            </li> */}
                            <li className={cx('cart-total-item', 'cart-total-coupon')}>
                                <div className={cx('cart-total-label')}>Mã giảm giá</div>
                                <div className={cx('cart-total-value')} style={{display: 'none'}}>
                                    <span className={cx('text')}>{numberWithCommas(total())}</span>
                                </div>
                                <div className={cx('cart-coupon-code')}>
                                    <input 
                                        className={cx('form-input-coupon')}
                                        placeholder='Nhập mã giảm giá'
                                        type='text'
                                    />
                                    <p className={cx('form-text')}>
                                        Mã giảm giá sẽ được áp dụng ở trang thanh toán
                                    </p>
                                </div>
                            </li>
                            <li className={cx('cart-total-item', 'cart-total-grandtotal')}>
                                <div className={cx('cart-total-label')}>
                                    <span className="text">Tổng</span>
                                </div>
                                <div className={cx('cart-total-value')} >
                                    <span className={cx('text')}>
                                        <span className={cx('money')}>{numberWithCommas(total())}</span>
                                    </span>
                                </div>
                            </li>
                            <li className={cx('cart-total-item', 'totalShip')}>
                                <p className={cx('cart-total-ship-text')}>
                                    Bao gồm thuế và vận chuyển được tính toán khi thanh toán
                                </p>
                            </li>
                        </ul>


                        <div className={cx('cart-actions')}>
                            <div className={cx('cart-checkbox', 'global-checkbox')}>
                            
                                <input 
                                    className={cx('global-checkbox--input')}
                                    type='checkbox'
                                    id='cart-conditions'
                                />
                                <label 
                                    className={cx('label-checkbox--label', 'form-label--checkbox')}
                                    htmlFor="cart-conditions"
                                >
                                    Tôi đồng ý với
                                </label>
                                <a href="#" className={cx("term-and-conditions-link")}>
                                    điều khoản và điều kiện
                                </a>
                            </div>

                            <div className={cx('action-group')}>
                                <ButtonActions
                                    
                                    fullWidth
                                    cl="#fff"
                                    backgroundcolor="#7b7b7b"
                                    backgroundcolorhover="#7b7b7b"
                                    disabled={items.length === 0 ? true : false}
                                    onClick={() => {
                                        if (authContext.currentUser.emailVerified) {
                                            navigate('/order')
                                        } else {
                                            navigate('/verify-email')
                                            authContext.setTimeActive(true)
                                        }
                                    }}
                                >
                                    Tiến hành thanh toán
                                </ButtonActions>
                                <ButtonActions
                                    fullWidth
                                    backgroundcolor="#fff"
                                    backgroundcolorhover="#000"
                                    cl="#000"
                                    colorhover="#fff"
                                    onClick={() => {
                                        
                                        navigate('/')
                                    }}
                                >
                                    Tiếp tục mua sắm
                                </ButtonActions>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart