import classNames from "classnames/bind"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import styles from './DefaultLayout.module.css'

const cx = classNames.bind(styles)

const DefaultLayout = ({children}) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
            <Header />
                <div className={cx('content')}>{children}</div>
            <Footer />
            </div>
        </div>
    )
}

export default DefaultLayout