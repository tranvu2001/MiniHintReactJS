import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ButtonStyle } from "../Button/Button"
import CategoryServices from "../../axios/CategoryServices"

const AddCategory = () => {

    const navigate = useNavigate()
    // const [image, setImage] = useState('')
    const [input, setInput] = useState({
        categoryName: "",
        categoryImage: "",
    })

    const handleChange = (e) => {
         setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            // categoryImage: image
        }))
    }

    // const handleChangeImage = (e) => {
    //     setImage("../assest/item1/" + e.target.files[0].name)
        
    // }

    const handleFileRead = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        
        setInput(prevState => ({
            ...prevState,
            categoryImage: base64
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

    const handleSubmit = (e) => {
        e.preventDefault()
        CategoryServices.createCategory(input).then(res => {
            navigate('/dashboard/category-manage')
        })
    }

    // useEffect(() => {
    //     setInput((prevState) => ({
    //         ...prevState,
            
    //         categoryImage: input.categoryImage
    //     }))
    // }, [image])
    return (
        <div className="add-category w-full text-center mt-[17px]">
            <form
                onSubmit={handleSubmit}
                className="text-left border border-[#ccc] p-[26px] text-sm flex justify-between">
                <div className="flex-1">
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="categoryName"
                            className="form-label mb-2"
                        >
                            Tên danh mục
                        </label>
                        <input 
                            id="categoryName"
                            name="categoryName"
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='text'
                            placeholder="Tên danh mục"
                            value={input.categoryName}
                            onChange={handleChange}
                            required
                        />
                    </div>
    
                    
    
                    <div className="form-field flex flex-col mb-4">
                    <label 
                            htmlFor="categoryImage"
                            className="form-label mb-2"
                        >
                            Hình ảnh 
                        </label>
                        <input 
                            id="categoryImage"
                            
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='file'
                            
                            onChange={(e) => handleFileRead(e)}
                            required
                        />
                    </div>
    
                    <ButtonStyle type="submit">Hoàn tất</ButtonStyle>
    
                    
                </div>

                
                
            </form>
        </div>
    )
}

export default AddCategory