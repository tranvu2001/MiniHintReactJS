import classNames from 'classnames/bind'
import styles from './Banner.module.css'

const cx = classNames.bind(styles)

const Banner = () => {
    return (
        <div className={cx('banner')}>
            <img src='assest/banner.jpg' className={cx('banner-img')}/>
        </div>
    )
}

export default Banner