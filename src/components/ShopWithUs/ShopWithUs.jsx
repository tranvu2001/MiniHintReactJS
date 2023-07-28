import classnames from 'classnames/bind'
import styles from './ShopWithUs.module.css'

const cx = classnames.bind(styles)

const ShopWithUs = () => {
    return (
        <div className={cx('shop-with-us')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>
                    <strong className={cx('color-title')}>Tại sao nên mua sắm</strong>
                    với MiniHint?
                </h1>
                <div className={cx('content')}>
                    <div className={cx('box')}>
                        <img src="./assest/shopwithus/box1img.jpg" alt="img1" className={cx('box-image')}/>
                        <h2 className={cx('box-title')}>Box Title</h2>
                        <p className={cx('box-desc')}>Description</p>
                    </div>
                    <div className={cx('box')}>
                        <img src="./assest/shopwithus/box2img.jpg" alt="img2" className={cx('box-image')}/>
                        <h2 className={cx('box-title')}>Box Title</h2>
                        <p className={cx('box-desc')}>Description</p>
                    </div>
                    <div className={cx('box')}>
                        <img src="./assest/shopwithus/box3img.jpg" alt="img3" className={cx('box-image')}/>
                        <h2 className={cx('box-title')}>Box Title</h2>
                        <p className={cx('box-desc')}>Description</p>
                    </div>
                    <div className={cx('box')}>
                        <img src="./assest/shopwithus/box4img.jpg" alt="img4" className={cx('box-image')}/>
                        <h2 className={cx('box-title')}>Box Title</h2>
                        <p className={cx('box-desc')}>Description</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopWithUs