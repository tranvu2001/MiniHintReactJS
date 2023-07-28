import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ProductServices from "../../axios/ProductServices"
import { ButtonStyle } from "../Button/Button"
import CategoryServices from "../../axios/CategoryServices"
import BrandServices from "../../axios/BrandServices"

const UpdateProduct = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const objProduct = {
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
    }
    // const [image, setImage] = useState('')
    // const [image2, setImage2] = useState('')
    const [input, setInput] = useState(objProduct)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    

    // const handleChangeImage = (e) => {
    //     setImage("../assest/item1/" + e.target.files[0].name)
    // }

    // const handleChangeImage2 = (e) => {
    //     setImage2("../assest/item2/" + e.target.files[0].name)
    // }

    const handleFileRead = async (e, id) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        // console.log(base64)
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

    const handleChange = (e) => {
        
        setInput((prevState) => ({
            ...prevState,
            
            [e.target.name]: e.target.value,
            // productImage: image === '' ? input.productImage : image,
            // productImage2: image2 === '' ? input.productImage2 : image2,
        }))
    }

    useEffect(() => {
        ProductServices.getProductById(id).then(res => {
            let product = res.data
            setInput(
                
                {
                    productName: product.productName,
                    slugName: product.slugName,
                    productImage: input.productImage === '' ? product.productImage : input.productImage,
                    productImage2: input.productImage2 === '' ? product.productImage2 : input.productImage2,
                    description: product.description,
                    price: product.price,
                    categoryId: product.categoryId,
                    brandId: product.brandId,
                    discountPercent: product.discountPercent,
                    rating: product.rating
                
                }
            )
            
        })
    }, [input.productImage, input.productImage2])

    const handleSubmit = (e) => {
        e.preventDefault()
        ProductServices.updateProduct(input, id).then(res => {
            
            navigate('/dashboard/product-manage')
        })
    }

    useEffect(() => {
        CategoryServices.getCategory().then(res => {
            setCategories(res.data)
        })

        BrandServices.getBrand().then(res => {
            setBrands(res.data)
        })
    }, [])
    console.log(input)



    return (
        <div className="update-product w-full text-center mt-[17px]">
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
                            // required
                        />
                    </div>
    
                    <div className="form-field flex flex-col mb-4">
                    <label 
                            htmlFor="productImage2"
                            className="form-label mb-2 "
                        >
                            Hình ảnh 2
                        </label>
                        <input 
                            id="productImage2"
                            // placeholder={input.productImage2}
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='file'
                            
                            onChange={(e) => handleFileRead(e, 2)}
                            // required
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
                            <option value="27">Nvidia</option>
                            <option value="28">Keychron</option>
                            <option value="29">Gigabyte</option>
                            <option value="30">LG</option>
                            <option value="31">Sony</option> */}
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

export default UpdateProduct