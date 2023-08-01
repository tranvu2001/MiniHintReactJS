import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import SpecsInput from './SpecsInput'
import { ButtonStyle } from '../Button/Button'
import ProductServices from '../../axios/ProductServices'
import CategoryServices from '../../axios/CategoryServices'
import BrandServices from '../../axios/BrandServices'
import { error } from 'autoprefixer/lib/utils'

const AddProduct = () => {
    // const [category, setCategory] = useState('')
    // const [hiddenSpecs, setHiddenSpecs] = useState(true)
    const navigate = useNavigate()
    // const [image, setImage] = useState('')
    // const [image2, setImage2] = useState('')
    const [input, setInput] = useState({
        productName: "",
        slugName: "",
        productImage: "",
        productImage2: "",
        description: "",
        price: 0,
        categoryId: 1,
        brandId: 1,
        discountPercent: 0,
        rating: 0
    })

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    
    // const handleCategoryChange = (e) => {
    //     console.log(e.target.value)
    //     setCategory(e.target.value)
    //     if (e.target.value !== '') {
    //         setHiddenSpecs(false)
    //     }
    // }
    

    const handleChange = (e) => {
        
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            // productImage: image,
            // productImage2: image2
        }))
    }

    // const handleChangeImage = (e) => {
       
    //     setImage("../assest/item1/" + e.target.files[0].name)
        
    // }

    // const handleChangeImage2 = (e) => {
       
    //     setImage2("../assest/item2/" + e.target.files[0].name)
        
    // }

    const handleFileRead = async (e, id) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        let key
        if (id === 1) {
            key = 'productImage'
        } else {
            key = 'productImage2'
        }

        console.log(key)
        setInput(prevState => ({
            ...prevState,
            [key]: base64
            // productImage: base64
        }))

    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const renderSpecs = (category) => {
        switch (category) {
            case '1':
                return <SpecsInput 
                            field={[{labelFor: 'gpu', label: 'GPU' }, 
                                    {labelFor: 'memory', label: 'Bộ nhớ'}, 
                                    {labelFor: 'series', label: 'Dòng'}, 
                                    {labelFor: 'gpuLock', label: 'GPU Lock'}, 
                                    {labelFor: 'pci', label:'PCI'}, 
                                    {labelFor: 'quantityUnitHandling', label: 'Số lượng đơn vị xử lí'}, 
                                    {labelFor: 'connector', label: 'Cổng kết nối'}, 
                                    {labelFor: 'powerSupply', label: 'Nguồn'},
                                    {labelFor: 'recommendPower', label: 'Nguồn đề xuất'}, 
                                    {labelFor: 'size', label: 'Kích thước'} ]}
                        />
                
            case '2':
                return <SpecsInput 
                            field={[{labelFor: 'connect', label: 'Kết nối' },
                                    {labelFor: 'size', label: 'Kích thước'}, 
                                    {labelFor: 'led', label: 'Led'}, 
                                    {labelFor: 'switchType', label: 'Loại switch'}, 
                                    {labelFor: 'specialKey', label:'Phím đặc biệt'}, 
                                    {labelFor: 'armrest', label: 'Kê tay'}]}
                        />
                
            case '3':
                return <SpecsInput 
                            field={[{labelFor: 'connect', label: 'Kết nối' }, 
                                    {labelFor: 'DPI', label: 'DPI'}, 
                                    {labelFor: 'timeResponse', label: 'Thời gian phản hồi'}, 
                                    {labelFor: 'size', label: 'Kích thước'}, 
                                    {labelFor: 'weight', label:'Khối lượng'}]}
                        />
                
            case '4':
                return <SpecsInput 
                            field={[{labelFor: 'earphoneTime', label: 'Thời gian sử dụng và sạc tai nghe' }, 
                                    {labelFor: 'chargingboxtime', label: 'Thời gian sử dụng và sạc hộp đựng'}, 
                                    {labelFor: 'chargingport', label: 'Cổng sạc'}, 
                                    {labelFor: 'audio', label: 'Audio'}, 
                                    {labelFor: 'compatible', label:'Tương thích'}, 
                                    {labelFor: 'connectApp', label: 'Ứng dụng kết nối'}, 
                                    {labelFor: 'utilities', label: 'Tiện ích'}, 
                                    {labelFor: 'connectionTech', label: 'Công nghệ kết nối'},
                                    {labelFor: 'controlType', label: 'Kiểu điều khiển'}, 
                                    {labelFor: 'actions', label: 'Các thao tác'}, 
                                    {labelFor: 'size', label: 'Kích thước'}, 
                                    {labelFor: 'weight', label: 'Khối lượng'} ]}
                        />
                
            case '5':
                return <SpecsInput 
                            field={[{labelFor: 'monitorType', label: 'Loại màn hình' }, 
                                    {labelFor: 'size', label: 'Kích thước'}, 
                                    {labelFor: 'resolution', label: 'Độ phân giải'}, 
                                    {labelFor: 'background', label: 'Tấm nền'}, 
                                    {labelFor: 'hz', label:'Hz'}, 
                                    {labelFor: 'timeResponse', label: 'Thời gian phản hồi'}, 
                                    {labelFor: 'mornitorTech', label: 'Công nghệ màn hình'}, 
                                    {labelFor: 'colors', label: 'Màu'},
                                    {labelFor: 'brightness', label: 'Độ sáng'}, 
                                    {labelFor: 'contrast', label: 'Độ tương phản'}, 
                                    {labelFor: 'view', label: 'Góc nhìn'}]}
                        />
                
            case '6':
                return <SpecsInput 
                            field={[{labelFor: 'capacity', label: 'Công suất' }, 
                                    {labelFor: 'source', label: 'Nguồn'}, 
                                    {labelFor: 'usedTime', label: 'Thời gian sử dụng'}, 
                                    {labelFor: 'chargingTime', label: 'Thời gian sử dụng'}, 
                                    {labelFor: 'audioTech', label:'Công nghệ audio'}, 
                                    {labelFor: 'actions', label: 'Các thao tác'}, 
                                    {labelFor: 'utilities', label: 'Tiện ích'}]}
                        />
                
            case '7':
                return <SpecsInput 
                            field={[{labelFor: 'networkBand', label: 'Băng tần mạng' }, 
                                    {labelFor: 'wifiSpeed', label: 'Tốc độ wifi'}, 
                                    {labelFor: 'networkStandards', label: 'Chuẩn mạng'}, 
                                    {labelFor: 'anten', label: 'anten'}, 
                                    {labelFor: 'ports', label:'Cổng'}, 
                                    {labelFor: 'users', label: 'Số lượng kết nối'}, 
                                    {labelFor: 'distance', label: 'Khoảng cách'}, 
                                    {labelFor: 'subKey', label: 'Nút phụ'},
                                    {labelFor: 'size', label: 'Kích thước'}, 
                                    {labelFor: 'box', label: 'Hộp chứa bao gồm'}, 
                                    {labelFor: 'view', label: 'Góc nhìn'}]}
                        />
                
        
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        ProductServices.createProduct(input).then(res => {
            navigate("/dashboard/product-manage")
        })
    }

    useEffect(() => {
        setInput((prevState) => ({
            ...prevState,
            
            productImage: input.productImage,
            productImage2: input.productImage2
        }))
    }, [input.productImage, input.productImage2])

    useEffect(() => {
        CategoryServices.getCategory().then(res => {
            setCategories(res.data)
        })

        BrandServices.getBrand().then(res => {
            setBrands(res.data)
        })
    }, [])


    return (
        <div className="add-product w-full text-center mt-[17px]">
            <form 
                onSubmit={handleSubmit}
                className="text-left border border-[#ccc] p-[26px] text-sm flex justify-between">
                <div className="flex-1">
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="productName"
                            className="form-label mb-2"
                        >
                            Tên sản phẩm
                        </label>
                        <input 
                            id="productName"
                            name="productName"
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='text'
                            placeholder="Tên sản phẩm"
                            onChange={handleChange}
                            value={input.productName}
                            required
                        />
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="slugName"
                            className="form-label mb-2"
                        >
                            Tên slug
                        </label>
                        <input 
                            id="slugName"
                            name="slugName"
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='text'
                            placeholder="ten-san-pham"
                            value={input.slugName}
                            onChange={handleChange}
                            required
                        />
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="productImage"
                            className="form-label mb-2"
                        >
                            Hình ảnh 
                        </label>
                        <input 
                            id="productImage"
                            
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='file'
                            
                            onChange={(e) => handleFileRead(e, 1)}
                            required
                        />
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                    <label 
                            htmlFor="productImage2"
                            className="form-label mb-2"
                        >
                            Hình ảnh 2
                        </label>
                        <input 
                            id="productImage2"
                            
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='file'
                            
                            onChange={(e) => handleFileRead(e, 2)}
                            required
                        />
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="description"
                            className="form-label mb-2 "
                        >
                            Chi tiết sản phẩm
                        </label>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows={4} cols={50}
                            className="w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            value={input.description}
                            onChange={handleChange}
                            required
                        >
                            Description content
                        </textarea>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="price"
                            className="form-label mb-2"
                        >
                            Giá 
                        </label>
                        <input 
                            id="price"
                            name="price"
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='text'
                            value={input.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="categoryId"
                            className="form-label mb-2"
                        >
                            Danh mục
                        </label>
                        <select 
                            id="categoryId" 
                            name="categoryId" 
                            className="w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            value={input.categoryId}
                            onChange={handleChange}
                            required
                        >
                            {/* <option disabled selected>Chọn danh mục: </option> */}
                            {/* <option value="1">Card màn hình</option>
                            <option value="2">Bàn phím</option>
                            <option value="3">Chuột</option>
                            <option value="4">Tai nghe</option>
                            <option value="5">Màn hình</option>
                            <option value="6">Loa</option>
                            <option value="7">Thiết bị mạng</option> */}
                            {categories.map(category => (
                                <option value={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="brandId"
                            className="form-label mb-2"
                        >
                            Thương hiệu
                        </label>
                        <select 
                            id="brandId" 
                            name="brandId" 
                            className="w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            value={input.brandId}
                            onChange={handleChange}
                            required
                        >
                            {/* <option disabled selected>Chọn thương hiệu: </option> */}
                            {/* <option value="1">Aorus</option>
                            <option value="2">Asus</option>
                            <option value="3">Corsair</option>
                            <option value="4">Logitech</option>
                            <option value="5">Msi</option>
                            <option value="6">Steel Series</option>
                            <option value="7">Nvidia</option>
                            <option value="8">Razer</option>
                            <option value="9">Apple</option>
                            <option value="10">Samsung</option>
                            <option value="11">Oppo</option>
                            <option value="12">Mozard</option>
                            <option value="13">Hydrus</option>
                            <option value="14">Sony</option>
                            <option value="15">JBL</option>
                            <option value="16">Xiaomi</option>
                            <option value="17">Toto Link</option>
                            <option value="18">LinkSys</option>
                            <option value="19">Tenda</option>
                            <option value="20">Microlab</option>
                            <option value="21">Harman Kardon</option>
                            <option value="22">HP</option>
                            <option value="23">Dell</option>
                            <option value="24">ViewSonic</option>
                            <option value="25">Rog</option>
                            <option value="26">DareU</option>
                            
                            <option value="27">Keychron</option>
                            <option value="28">Gigabyte</option>
                            <option value="29">LG</option> */}
                            
                            {brands.map(brand => (
                                <option value={brand.brandId}>{brand.brandName}</option>
                            ))}
                        </select>
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="discountPercent"
                            className="form-label mb-2"
                        >
                            Phần trăm giảm giá
                        </label>
                        <select
                            id="discountPercent" 
                            name="discountPercent" 
                            className="w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            value={input.discountPercent}
                            onChange={handleChange}
                            required 
                        >
                            {/* <option disabled selected>Chọn mức giảm giá: </option> */}

                            <option value="0">Không giảm</option>
                            <option value="20">20%</option>
                            <option value="30">30%</option>
                            <option value="50">50%</option>
                        </select>
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="rating"
                            className="form-label mb-2"
                        >
                            Đánh giá số sao
                        </label>
                        <select 
                            id="rating" 
                            name="rating" 
                            className="w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            value={input.rating}
                            onChange={handleChange}
                            required
                        >
                            {/* <option disabled selected>Chọn mức đánh giá: </option> */}
                            <option value="0">0 sao</option>
                            <option value="0.5">0.5 sao</option>
                            <option value="1">1 sao</option>
                            <option value="1.5">1.5 sao</option>
                            <option value="2">2 sao</option>
                            <option value="2.5">2.5 sao</option>
                            <option value="3">3 sao</option>
                            <option value="3.5">3.5 sao</option>
                            <option value="4">4 sao</option>
                            <option value="4.5">4.5 sao</option>
                            <option value="5">5 sao</option>
                        </select>
                    </div>
                <ButtonStyle type='submit'>Hoàn tất</ButtonStyle>
                </div>
                {/* <div className={hiddenSpecs ? "hidden" : "block flex-1"}>
                    {renderSpecs(category)}
                </div> */}

            </form>
        </div>
    )
}

export default AddProduct