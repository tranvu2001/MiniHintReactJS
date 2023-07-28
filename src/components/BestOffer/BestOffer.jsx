import classNames from "classnames/bind";
import styles from './BestOffer.module.css'

const cx = classNames.bind(styles)

const BestOffer = () => {
    return (
        <div className={cx('best-offer')}>
            <img className={cx('banner-2')} alt='banner-2' src='./assest/banner2.jpg'/>
        </div>
    )
}

export default BestOffer