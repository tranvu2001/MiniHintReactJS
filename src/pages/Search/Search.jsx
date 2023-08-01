import { useEffect, useState, forwardRef, useRef } from 'react'
import CardProduct from '../../components/CardProduct/CardProduct'
import { useAuthValue } from '../../Context/AuthContext'
import CategoryServices from '../../axios/CategoryServices'
import BrandServices from '../../axios/BrandServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Dialog, Slide } from '@mui/material'
import ProductServices from '../../axios/ProductServices'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const Search = () => {
    const [open, setOpen] = useState(false)
    const authContext = useAuthValue()
    const categoryRef = useRef() 
    const brandRef = useRef() 
    const minPriceRef = useRef() 
    const maxPriceRef = useRef() 
    

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [products, setProducts] = useState([])
    const init = authContext.productsSearch
    const [productFilter, setProductFilter] = useState(init)

    useEffect(() => {
        setProductFilter(init)
    }, [init])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataCategories = await CategoryServices.getCategory()
                const dataBrands = await BrandServices.getBrand()
                const dataProducts = await ProductServices.getProducts()
                setCategories(dataCategories.data)
                setBrands(dataBrands.data)
                setProducts(dataProducts.data)
            } catch (error) {
                console.log(error)
            }
        }   
        fetchData() 
    }, [])
    
  

    const handleOpen = () => setOpen(true)    
    const handleClose = () => setOpen(false)    

    const handleFilter = (e) => {
        e.preventDefault()
        let result = products.filter(item => {
            // check categories
            if(categoryRef.current.value !== '') {
                if(item.categoryId != categoryRef.current.value){
                    return false
                }
            }

            // check brands
            if(brandRef.current.value !== '') {
                if(item.brandId != brandRef.current.value){
                    return false
                }
            }

            // check min price
            if(minPriceRef.current.value.trim() !== '') {
                if(item.price < Number(minPriceRef.current.value)){
                    return false
                }
            }
            
            // check max price
            if(maxPriceRef.current.value.trim() != '') {
                if(item.price > Number(maxPriceRef.current.value)){
                    return false
                }

            }
            
            return true
        })
        setProductFilter(result)
    }

    return (
        <div className="mt-[90px] lg:mt-[60px] w-[1200px] max-w-[100%] mx-[10px] lg:mx-auto">
            
            <Dialog 
                open={open}
                onClose={handleClose}
                maxWidth='md'
                TransitionComponent={Transition}
                keepMounted
                fullWidth
            >
                    <div className="side-filter-wrapper p-5">
                        <div className="category-filter mb-11">
                            <div before=''
                                className="
                                            heading
                                            relative
                                            before:content-[attr(before)]
                                            before:absolute
                                            before:w-full
                                            before:h-[1px]
                                            before:bg-black
                                            before:bottom-0
                                            "
                            >
                                <h3
                                    className="text-[1.4rem] 
                                        font-bold 
                                        uppercase 
                                        pb-[9px] 
                                        

                                        "
                                >
                                    Danh mục
                                </h3>
                            </div>
                            <div className="content-wrapper">
                                <div className="content">
                                    <ul className="categories-list pt-2 h-[210px]">
                                        {categories.map((item, index) => (
                                            <li key={index} className="category-item block relative h-[34px]">
                                                <a
                                                    href="#"
                                                    className="
                                                        relative 
                                                        py-[6px]
                                                    "
                                                >
                                                    <span className="text text-[1.4rem] font-normal">{item.categoryName}</span>
                                                </a>
                                            </li>
                                        ))}


                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="brand-filter">
                            <div className="category-filter mb-11">
                                <div before=''
                                    className="
                                            heading
                                            relative
                                            before:content-[attr(before)]
                                            before:absolute
                                            before:w-full
                                            before:h-[1px]
                                            before:bg-black
                                            before:bottom-0
                                            "
                                >
                                    <h3
                                        className="text-[1.4rem] 
                                        font-bold 
                                        uppercase 
                                        pb-[9px] 
                                        

                                        "
                                    >
                                        Thương hiệu
                                    </h3>
                                </div>
                                <div className="content-wrapper">
                                    <div className="content">
                                        <ul className="categories-list pt-2 min-h-[210px]">
                                            {brands.map((item, index) => (
                                                <li key={index} className="category-item block relative h-[34px]">
                                                    <a
                                                        href="#"
                                                        className="
                                                        relative 
                                                        py-[6px]
                                                    "
                                                    >
                                                        <span className="text text-[1.4rem] font-normal">{item.brandName}</span>
                                                    </a>
                                                </li>
                                            ))}


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="price-filter">
                            <div className="category-filter mb-11">
                                <div before=''
                                    className="
                                            heading
                                            relative
                                            before:content-[attr(before)]
                                            before:absolute
                                            before:w-full
                                            before:h-[1px]
                                            before:bg-black
                                            before:bottom-0
                                            "
                                >
                                    <h3
                                        className="text-[1.4rem] 
                                        font-bold 
                                        uppercase 
                                        pb-[9px] 
                                        "
                                    >
                                        Giá
                                    </h3>
                                </div>
                                <div className="content-wrapper">
                                    <div className="content">
                                        <div className="price">
                                            <div className="price--slider pt-5">
                                                

                                                <div className="price-box flex items-center justify-center">
                                                    <div className="form-filed  relative">
                                                        <label className="form-label hidden" htmlFor="filter-min-price">Thấp</label>
                                                        <input
                                                            className="form-input py-3 p-4 text-center text-xs font-normal border border-solid border-gray-400"
                                                            type={"number"}
                                                            min={0}
                                                            max={3000}
                                                            placeholder={0}
                                                            id="filter-min-price"
                                                        />
                                                    </div>
                                                    <span className="price-to-price px-[6px] text-xs font-medium">đến</span>
                                                    <div className="form-filed">
                                                        <label className="form-label hidden" htmlFor="filter-max-price">Cao</label>
                                                        <input
                                                            className="form-input py-3 p-4 text-center text-xs font-normal border border-solid border-gray-400"
                                                            type={"number"}
                                                            min={0}
                                                            max={3000}
                                                            placeholder={3000}
                                                            id="filter-max-price"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-action mt-5 h-11">
                                                    <input
                                                        type="button"
                                                        className="btn-apply 
                                                               text-sm font-bold 
                                                               text-white 
                                                               bg-black 
                                                               w-full h-full 
                                                               cursor-pointer
                                                               border border-solid border-black
                                                               transition-all
                                                               hover:bg-white
                                                               hover:text-black
                                                               "
                                                        value={'Áp dụng'}
                                                        onClick={handleClose}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Dialog>
            {/* <h1 className="text-[2rem] font-bold text-center">{productFilter.length === 0 ? "Chưa tìm được sản phẩm" : `Tìm thấy ${productFilter.length} kết quả cho "${authContext.search}"`}</h1> */}
            <div className="grid grid-cols-6">
                <div className='block lg:hidden'>
                <button onClick={handleOpen}>
                    <FontAwesomeIcon icon={faFilter} className='h-5' />
                </button>
                </div>
                <form onSubmit={handleFilter} className="hidden lg:block w-full h-[2400px] lg:pl-[10px]">
                    <div className="side-filter-wrapper">
                        <div className="category-filter mb-11">
                            <div before=''
                                className="
                                            heading
                                            relative
                                            before:content-[attr(before)]
                                            before:absolute
                                            before:w-full
                                            before:h-[1px]
                                            before:bg-black
                                            before:bottom-0
                                            "
                            >
                                <h3
                                    className="text-[1.4rem] 
                                        font-bold 
                                        uppercase 
                                        pb-[9px] 
                                        

                                        "
                                >
                                    Danh mục
                                </h3>
                            </div>
                            <div className="content-wrapper">
                                <div className="content">
                                    <select ref={categoryRef} className="categories-list pt-2 w-full text-sm">
                                        <option value=''>-- Chọn danh mục --</option>
                                        {categories.map((item, index) => (
                                            <option key={index} value={item.categoryId} className="category-item block relative h-[34px]">
                                                {item.categoryName}
                                                {/* <a
                                                    href="#"
                                                    className="
                                                        relative 
                                                        py-[6px]
                                                    "
                                                >
                                                    <span className="text text-[1.4rem] font-normal">{item.categoryName}</span>
                                                </a> */}
                                            </option>
                                        ))}


                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="brand-filter">
                            <div className="category-filter mb-11">
                                <div before=''
                                    className="
                                            heading
                                            relative
                                            before:content-[attr(before)]
                                            before:absolute
                                            before:w-full
                                            before:h-[1px]
                                            before:bg-black
                                            before:bottom-0
                                            "
                                >
                                    <h3
                                        className="text-[1.4rem] 
                                        font-bold 
                                        uppercase 
                                        pb-[9px] 
                                        

                                        "
                                    >
                                        Thương hiệu
                                    </h3>
                                </div>
                                <div className="content-wrapper">
                                    <div className="content">
                                        
                                        <select ref={brandRef} className="categories-list pt-2 w-full text-sm">
                                            <option value=''>-- Chọn thương hiệu --</option>
                                            {brands.map((item, index) => (
                                                <option key={index} value={item.brandId} className="category-item block relative h-[34px]">
                                                    {item.brandName}
                                                    {/* <a
                                                        href="#"
                                                        className="
                                                        relative 
                                                        py-[6px]
                                                    "
                                                    >
                                                        <span className="text text-[1.4rem] font-normal">{item.brandName}</span>
                                                    </a> */}
                                                </option>
                                            ))}


                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="price-filter">
                            <div className="category-filter mb-11">
                                <div before=''
                                    className="
                                            heading
                                            relative
                                            before:content-[attr(before)]
                                            before:absolute
                                            before:w-full
                                            before:h-[1px]
                                            before:bg-black
                                            before:bottom-0
                                            "
                                >
                                    <h3
                                        className="text-[1.4rem] 
                                        font-bold 
                                        uppercase 
                                        pb-[9px] 
                                        "
                                    >
                                        Giá
                                    </h3>
                                </div>
                                <div className="content-wrapper">
                                    <div className="content">
                                        <div className="price">
                                            <div className="price--slider pt-5">
                                                

                                                <div className="price-box flex flex-col items-center justify-center">
                                                    <div className="form-filed  relative">
                                                        <label className="form-label hidden" htmlFor="filter-min-price">Thấp</label>
                                                        <input
                                                            ref={minPriceRef}
                                                            className="form-input py-3 p-4 text-center text-xs font-normal border border-solid border-gray-400"
                                                            type={"number"}
                                                            
                                                            // placeholder={0}
                                                            id="filter-min-price"
                                                        />
                                                    </div>
                                                    <span className="price-to-price px-[6px] text-xs font-medium">đến</span>
                                                    <div className="form-filed">
                                                        <label className="form-label hidden" htmlFor="filter-max-price">Cao</label>
                                                        <input
                                                            ref={maxPriceRef}
                                                            className="form-input py-3 p-4 text-center text-xs font-normal border border-solid border-gray-400"
                                                            type={"number"}
                                                            
                                                            // placeholder={3000}
                                                            id="filter-max-price"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-action mt-5 h-11">
                                                    <button
                                                        type="submit"
                                                        className="btn-apply 
                                                               text-sm font-bold 
                                                               text-white 
                                                               bg-black 
                                                               w-full h-full 
                                                               cursor-pointer
                                                               border border-solid border-black
                                                               transition-all
                                                               hover:bg-white
                                                               hover:text-black
                                                               "
                                                        
                                                    >Áp dụng</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="page-content  relative col-span-5">
                    <ul className="content-list grid grid-cols-1 pl-0  md:grid-cols-3  lg:grid-cols-4">
                        {productFilter?.map((item, index) => (
                            <li key={index}><CardProduct
                                margin='7px'
                                key={index}
                                slugName={item.slugName}
                                productName={item.productName}
                                price={item.price}
                                image={item.productImage}
                                image2={item.productImage2}
                                description={item.description}
                                brand={item.brandId}
                                discountPercent={item.discountPercent}
                            /></li>
                        ))}


                    </ul>

                    {/* <button 
                        className='see-more
                        text-sm font-bold 
                        absolute
                        text-white 
                        bg-black 
                        px-10 py-2
                        text-center 
                        cursor-pointer
                        border border-solid border-black
                        transition-all
                        hover:bg-white
                        hover:text-black
                        left-2/4
                        transform -translate-x-1/2
                                  '
                        >
                            Xem thêm            
                        </button> */}
                </div>
            </div>
        </div>
    )
}

export default Search