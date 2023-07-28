import classNames from "classnames/bind";
import styles from './CircleInfo.module.css'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

const CircleInfo = ({categoryId, brandId, name, image}) => {
    return (
        <Link to={brandId ? `/brands/${brandId}` : `/categories/${categoryId}`} className={cx('circle-info')}>
            <img
                className={cx('image')} 
                alt='image'
                // src='./assest/item1/img20.png'
                src={image}
            />
            <span className={cx('title')}>{name}</span>
        </Link>
    )
}

export default CircleInfo