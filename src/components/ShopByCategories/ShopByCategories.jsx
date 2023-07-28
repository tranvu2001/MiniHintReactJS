import classNames from "classnames/bind"
import CircleInfo from "../CircleInfo/CircleInfo"
import styles from './ShopByCategories.module.css'
import { useEffect, useState } from "react"
import CategoryServices from '../../axios/CategoryServices'
import { Link } from "react-router-dom"
const cx = classNames.bind(styles)

const ShopByCategories = () => {
    const  [categories, setCategories] = useState([])
    useEffect(() => {
        CategoryServices.getCategory().then(res => {
            setCategories(res.data)
        })
    }, [])
    return (
        <div className={cx('shop-by-categories')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h2 className={cx('title')}>Danh mục sản phẩm</h2>
                    <a href="#" className={cx('see-all')}>Xem tất cả</a>
                </header>
                <ul className={cx('categories-list')}>
                    {categories.map((item,index) => (
                        <Link to={`/categories/${item.categoryId}`} key={index} className={cx('categories-item')}><CircleInfo categoryId={item.categoryId} name={item.categoryName} image={item.categoryImage}/></Link>
                    ))}
                    
                        
                </ul>
            </div>
        </div>
    )
}

export default ShopByCategories