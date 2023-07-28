import classNames from "classnames/bind";
import styles from './BannerCustom.module.css'

const cx = classNames.bind(styles)

const BannerCustom = () => {
    return (
        <div className={cx('banner-custom')}>
            <div className={cx('container')}>
                <a href="#" className={cx('banner-link')}>
                    <img className={cx('banner-img')} src="./assest/banner4.jpg" alt="banner-4" />
                </a>
                <a href="#" className={cx('banner-link')}>
                    <img className={cx('banner-img')} src="./assest/banner5.jpg" alt="banner-5" />
                </a>
            </div>
        </div>
    )
}

export default BannerCustom