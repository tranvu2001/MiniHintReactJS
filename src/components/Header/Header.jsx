import { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, 
        faCartShopping, 
        faChartBar, 
        faDatabase, 
        faHome, 
        faSearch, 
        faSignIn, 
        faUser,
        faArchive,
        faDollar, 
        faSun, 
        faTruck
    } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import {  Dialog, List, ListItem, ListItemText, Slide, Button} from '@mui/material'

import {styled} from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { useAuthValue } from '../../Context/AuthContext'
import ProductServices from '../../axios/ProductServices'
import {useCart} from 'react-use-cart'
import CategoryServices from '../../axios/CategoryServices'
import BrandServices from '../../axios/BrandServices'
import DialogMobile from '../DialogMobile/DialogMobile'
import { faBarChart, faBell, faCopyright, faDriversLicense, faFileArchive, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons'

const cx = classNames.bind(styles)

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})
const Header = () => {
    const [openCategory, setOpenCategory] = useState(false)
    const [openBrand, setOpenBrand] = useState(false)
    const [openSection, setOpenSection] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [products, setProducts] = useState([])

    const authContext = useAuthValue()
    const navigate = useNavigate()
    let dataUser = JSON.parse(localStorage.getItem('USER_INFO')) ?? {}
    const typingTimeoutRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataCategories = await CategoryServices.getCategory()
                const dataBrand = await BrandServices.getBrand()
                const dataProducts = await ProductServices.getProducts()
                setCategories(dataCategories.data)
                setBrands(dataBrand.data)
                setProducts(dataProducts.data)
                
            } catch (error) {
                console.log(error)
            }
        }   
        fetchData()     
    }, [])

    const handleChange = (e) => {
        const value = e.target.value
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            authContext.setSearch(value)
        }, 500)

        // setSearchValue(value)
    }
    
    const handleSubmit = () => {
        
        if (authContext.search.trim() !== '') {
            let result = products.filter(item => {
                if (!item.productName.toLowerCase().includes(authContext.search.toLowerCase())) {
                    return false
                }

                return true
            })
            authContext.setProductsSearch(result)
        } else {
            authContext.setProductsSearch(products)
        }
        
        navigate('/search')
        window.scrollTo(0, 0)
    }
    
    
    
    

    const handleOpenCategory = () => setOpenCategory(true)
    const handleCloseCategory = () => setOpenCategory(false)

    const handleOpenBrand = () => setOpenBrand(true)
    const handleCloseBrand = () => setOpenBrand(false)

    const handleOpenSection = () => setOpenSection(true)
    const handleCloseSection = () => setOpenSection(false)
    
    const ButtonClose = styled(Button) ({
        position: 'absolute',
        right: 0,
        fontSize: '18px',
        padding: '10px',
    })

    

    

    const {
        totalUniqueItems,
        
      } = useCart();
    
    
    return (
        <>
            <div className={cx('header', 'off')}>
                <div className={cx('logo-contain')}>
                    <img src='../../assest/item1/NguyenVu_logo2.png' alt='logo' className={cx('logo')}/>
                </div>
                <div className={cx('search')} >
                    <input type="search" onChange={handleChange} placeholder="Tìm kiếm sản phẩm"/>
                    <FontAwesomeIcon onClick={handleSubmit} icon={faSearch} className={cx('search-icon')}/>
                </div>
                <div className={cx('action')}>
                    {authContext.isLogin ? 
                        <div className={cx('profile')}>
                            <a href='/profile' className={cx('profile-link')}>
                                <FontAwesomeIcon icon={faUser} className={cx('action-icon')}/>
                                <p className={cx('title')}>Thông tin</p>
                            </a>
                        </div> :
                        <div className={cx('login')}>
                            <Link to='/login' className={cx('login-link')}>
                                <FontAwesomeIcon icon={faSignIn} className={cx('action-icon')}/>
                                <p className={cx('title')}>Đăng nhập</p>
                            </Link>
                        </div>
                    }
                    
                    {authContext.isLogin && dataUser.role === 'admin' ? 
                        <div className={cx('dashboard')}>
                            <Link to='/dashboard/product-manage' className={cx('dashboard-link')}>
                                <FontAwesomeIcon icon={faDatabase} className={cx('action-icon')}/>
                                <p className={cx('title')}>Quản trị</p>
                            </Link>
                        </div> 
                        :
                        <div className={cx('cart')}>
                            <Link to='/shopping-cart' className={cx('cart-link')}>
                                <FontAwesomeIcon icon={faCartShopping} className={cx('action-icon')}/>
                                <p className={cx('title')}>Giỏ hàng</p>
                                <span className={cx('notify')} >{totalUniqueItems}</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>

            <header className={cx('header-mobile')}>
                <button className={cx('bar-button')} onClick={handleOpenSection}>
                    <FontAwesomeIcon icon={faBars} className={cx('bar-icon')}/>
                </button>
                <div className={cx('logo-contain-mobile')}>
                    <img src='../../assest/logoMobile.png' alt='logo' className={cx('logo-mobile')}/>
                </div>
                <div className={cx('search-mobile')} >
                        <input type="search" onChange={handleChange} placeholder="Tìm kiếm sản phẩm"/>
                        <FontAwesomeIcon onClick={handleSubmit} icon={faSearch} className={cx('search-icon-mobile')}/>
                </div>
                <div className={cx('action-mobile')}>
                    {authContext.isLogin && dataUser.role === 'admin' ? 
                        <div className={cx('dashboard-mobile')}>
                            <Link to='/dashboard/product-manage' className={cx('dashboard-link-mobile')}>
                                <FontAwesomeIcon icon={faDatabase} className={cx('action-icon-mobile')}/>
                            </Link>
                        </div> 
                        :
                        <div className={cx('cart-mobile')}>
                            <Link to='/shopping-cart' className={cx('cart-link-mobile')}>
                                <FontAwesomeIcon icon={faCartShopping} className={cx('action-icon-mobile')}/>
                                <span className={cx('notify-mobile')} >{totalUniqueItems}</span>
                            </Link>
                        </div>
                    }
                </div>
            </header>

            {/* <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={"lg"}
                fullWidth
                TransitionComponent={Transition}
                keepMounted
            >
                <List>
                    {categories.map((item, index) => (
                        <ListItem
                            className='w-full text-lg'
                            key={index}
                        >
                            <ListItemText
                                // primary={item.categoryName}
                            >
                                <Link to={`/categories/${item.categoryId}`} className='text-lg'>
                                    {item.categoryName}
                                </Link>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
                <ButtonClose onClick={handleClose}>X</ButtonClose>
            </Dialog> */}

            <DialogMobile 
                open={openCategory}
                handleClose= {handleCloseCategory}
                list={categories}
                breakpoint={'categories'}
                id = {'categoryId'}
                name={'categoryName'}
            />

            <DialogMobile 
                open={openBrand}
                handleClose= {handleCloseBrand}
                list={brands}
                breakpoint={'brands'}
                id = {'brandId'}
                name={'brandName'}
            />

            <Dialog 
                maxWidth={'lg'}
                fullWidth
                keepMounted
                open={openSection}
                onClose={handleCloseSection}
            >
                <div className="section-mobile">
                    <div className={cx('section-item-mobile')}>
                        <FontAwesomeIcon className={cx('section-icon-mobile')} icon={faMoneyBill1}/>
                        <span className={cx('section-title-mobile')}>Hướng dẫn thanh toán</span>
                    </div>
                    <div className={cx('section-item-mobile')}>
                        <FontAwesomeIcon className={cx('section-icon-mobile')} icon={faFileArchive}/>
                        <span className={cx('section-title-mobile')}>Hướng dẫn trả góp</span> 
                    </div>
                    <div className={cx('section-item-mobile')}>
                        <FontAwesomeIcon className={cx('section-icon-mobile')} icon={faBell}/>
                        <span className={cx('section-title-mobile')}>Chính sách bảo hành</span> 
                    </div>
                    <div className={cx('section-item-mobile')}>
                        <FontAwesomeIcon className={cx('section-icon-mobile')} icon={faDriversLicense}/>
                        <span className={cx('section-title-mobile')}>Chính sách vận chuyển</span> 
                    </div>
                </div>
                <ButtonClose onClick={handleCloseSection}>X</ButtonClose>
            </Dialog>
            
            <header className={cx('header-mobile-bottom')}>
                <div className={cx('action-mobile-bottom')}>
                    <div className={cx('home-mobile-bottom')}>
                        <Link to='/' className={cx('home-link-mobile-bottom')}>
                            <FontAwesomeIcon  icon={faHome} className={cx('action-icon-mobile-bottom')}/>
                            <p className={cx('title-mobile-bottom')}>Trang chủ</p>
                        </Link>
                    </div>
                    <div className={cx('categories-mobile-bottom')}>
                        <button onClick={handleOpenCategory} className={cx('categories-link-mobile-bottom')}>
                            <FontAwesomeIcon  icon={faBarChart} className={cx('action-icon-mobile-bottom')}/>
                            <p className={cx('title-mobile-bottom')}>Danh mục</p>
                        </button>
                    </div>
                    <div className={cx('categories-mobile-bottom')}>
                        <button onClick={handleOpenBrand} className={cx('categories-link-mobile-bottom')}>
                            <FontAwesomeIcon  icon={faCopyright} className={cx('action-icon-mobile-bottom')}/>
                            <p className={cx('title-mobile-bottom')}>Thương hiệu</p>
                        </button>
                    </div>
                    {authContext.isLogin ? 
                        <div className={cx('profile-mobile-bottom')}>
                            <a href='/profile' className={cx('profile-link-mobile-bottom')}>
                                <FontAwesomeIcon icon={faUser} className={cx('action-icon-mobile-bottom')}/>
                                <p className={cx('title-mobile-bottom')}>Thông tin</p>
                            </a>
                        </div> :
                        <div className={cx('login-mobile-bottom')}>
                            <Link to='/login' className={cx('login-link-mobile-bottom')}>
                                <FontAwesomeIcon icon={faSignIn} className={cx('action-icon-mobile-bottom')}/>
                                <p className={cx('title-mobile-bottom')}>Đăng nhập</p>
                            </Link>
                        </div>
                    }
                    
                    
                </div>
            </header>
            
        </>
    )
}

export default Header