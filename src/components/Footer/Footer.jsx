import classnames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons'

import styles from './Footer.module.css'

const cx = classnames.bind(styles)

const Footer = () => {
    return (
        <div className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('subscribe')}>
                    <div className={cx('heading')}>
                        <h3 className={cx('title')}>Theo dõi bản tin của chúng tôi</h3>
                        <p className={cx('subtitle')}>Nhận các bản cập nhật mới nhất về các sản phẩm mới và doanh số sắp tới</p>
                    </div>
                    <div className={cx('input-field')}>
                        <input
                            type='text'
                            placeholder='Nhập địa chỉ email của bạn' 
                            className={cx('input')}
                        />
                        <button className={cx('btn-subscribe')}>Đăng ký</button>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-box')}>
                        <h2 className={cx('head')}>Danh mục</h2>
                        <a href='#' className={cx('content-link')}>Card đồ họa</a>
                        <a href='#' className={cx('content-link')}>Chuột</a>
                        <a href='#' className={cx('content-link')}>Bàn phím</a>
                        <a href='#' className={cx('content-link')}>TV</a>
                        <a href='#' className={cx('content-link')}>Tai nghe</a>
                        <a href='#' className={cx('content-link')}>Loa</a>
                        <a href='#' className={cx('content-link')}>Router</a>
                    </div>
                    <hr className={cx('break-line')}/>
                    <div className={cx('content-box')}>
                        <h2 className={cx('head')}>Thông tin</h2>
                        <a href='#' className={cx('content-link')}>Về chúng tôi</a>
                        <a href='#' className={cx('content-link')}>Phiếu quà tặng</a>
                        <a href='#' className={cx('content-link')}>Phong cách chủ đề</a>
                        <a href='#' className={cx('content-link')}>Liên hệ chúng tôi</a>
                        <a href='#' className={cx('content-link')}>Blog</a>
                        <a href='#' className={cx('content-link')}>Thương hiệu</a>
                        <a href='#' className={cx('content-link')}>Sitemap</a>
                    </div>
                    <hr className={cx('break-line')}/>


                    <div className={cx('content-box')}>
                        <h2 className={cx('head')}>Dịch vụ khách hàng</h2>
                        <a href='#' className={cx('content-link')}>Giúp đỡ & FAQs</a>
                        <a href='#' className={cx('content-link')}>Điều khoản và điều kiện</a>
                        <a href='#' className={cx('content-link')}>Chính sách bảo mật</a>
                        <a href='#' className={cx('content-link')}>Chính sách trả lại trực tuyến</a>
                        <a href='#' className={cx('content-link')}>Chương trình tặng quà</a>
                        <a href='#' className={cx('content-link')}>Hạ giá</a>
                        <a href='#' className={cx('content-link')}>Đối tác</a>
                    </div>
                    <hr className={cx('break-line')}/>
                    <div className={cx('content-box')}>
                        <div className={cx('logo')}>
                            <img 
                                alt='footer-logo' 
                                className={cx('logo-img')}
                                src="../../assest/item1/NguyenVu_logo2.png"    
                            />
                        </div>
                        <div className={cx('address')}>
                            <FontAwesomeIcon className={cx('icon-contact')} icon={faLocation}/>
                            <p className={cx('address-text', 'text')}>
                                123 Chợ Hoa Cau, Thành Phố Thủ Đức
                            </p>
                        </div>
                        <div className={cx('phone')}>
                            <FontAwesomeIcon className={cx('icon-contact')} icon={faPhone}/>
                            <p className={cx('phone-text', 'text')}>
                                Liên lạc với chúng tôi: 0987654321
                            </p>
                        </div>
                        <div className={cx('email')}>
                            <FontAwesomeIcon className={cx('icon-contact')} icon={faMailBulk}/>
                            <p className={cx('email-text', 'text')}>
                                minihint@gmail.com
                            </p>
                        </div>
                        <hr className={cx('break-line')}/>
                        <div className={cx('social')}>
                            <i className={cx('fab fa-facebook', 'social-icon')}></i>
                            <i className={cx('fab fa-twitter', 'social-icon')}></i>
                            <i className={cx('fab fa-instagram', 'social-icon')}></i>
                            <i className={cx('fab fa-youtube', 'social-icon')}></i>
                            <i className={cx('fab fa-tiktok', 'social-icon')}></i>
                            <i className={cx('fab fa-pinterest', 'social-icon')}></i>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Footer