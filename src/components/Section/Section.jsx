import { faArchive, faDollar, faSun, faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import styles from './Section.module.css'
import { Dialog } from "@mui/material"
import { faBell, faDriversLicense, faFileArchive, faMoneyBill1 } from "@fortawesome/free-regular-svg-icons"

const cx = classNames.bind(styles)


const Section = () => {
    return (
        <>
            <div className={cx('section')}>
                <div className={cx('section-item')}>
                    <FontAwesomeIcon className={cx('section-icon')} icon={faMoneyBill1}/>
                    <span className={cx('section-title')}>Hướng dẫn thanh toán</span>
                </div>
                <div className={cx('section-item')}>
                    <FontAwesomeIcon className={cx('section-icon')} icon={faFileArchive}/>
                    <span className={cx('section-title')}>Hướng dẫn trả góp</span> 
                </div>
                <div className={cx('section-item')}>
                    <FontAwesomeIcon className={cx('section-icon')} icon={faBell}/>
                    <span className={cx('section-title')}>Chính sách bảo hành</span> 
                </div>
                <div className={cx('section-item')}>
                    <FontAwesomeIcon className={cx('section-icon')} icon={faDriversLicense}/>
                    <span className={cx('section-title')}>Chính sách vận chuyển</span> 
                </div>
            </div>

            

            

            <div className={cx('section-2')}>
                <div className={cx('section-2-top')}>
                    <div className={cx('wrapper')}>
                        <div className={cx('img-container')}>
                            <img src='assest/sectionImg/section-img-01.jpg' alt='sectionImg 01'/>
                        </div>
                    </div >
                    <div className={cx('wrapper')}>
                        <div className={cx('img-container')}>
                            <img src='assest/sectionImg/section-img-02.jpg' alt='sectionImg 02'/>
                        </div>
                    </div >
                    <div className={cx('wrapper')}>
                        <div className={cx('img-container')}>
                            <img src='assest/sectionImg/section-img-03.jpg' alt='sectionImg 03'/>
                        </div>
                    </div >
                </div>
                <div className={cx('section-2-bottom')}>
                    <div className={cx('wrapper-bottom')}>
                        <div className={cx('img-container', 'img-container-bottom')}>
                            <img src='assest/sectionImg/section-img-04.jpg' alt='sectionImg 04'/>
                        </div>
                    </div >
                    <div className={cx('wrapper-bottom')}>
                        <div className={cx('img-container', 'img-container-bottom')}>
                            <img src='assest/sectionImg/section-img-05.jpg' alt='sectionImg 05'/>
                        </div>
                    </div >
                </div>
            </div>
        </>
    )
}

export default Section