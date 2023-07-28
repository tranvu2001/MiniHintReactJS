import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ButtonStyle } from "../Button/Button"
import BrandServices from "../../axios/BrandServices"

const AddBrand = () => {

    const navigate = useNavigate()
    const [input, setInput] = useState({
        brandName: '',
        brandImage: ''
    })
    // const [image, setImage] = useState('')

    const handleChange = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
            // brandImage: image
        }))
    }

    const handleFileRead = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        
        setInput(prevState => ({
            ...prevState,
            brandImage: base64
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

    // const handleChangeImage = (e) => {
    //     setImage("../assest/brands/" + e.target.files[0].name)
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        BrandServices.createBrand(input).then(res => {
            navigate('/dashboard/brand-manage')
        })
    }

    // useEffect(() => {
    //     setInput(prevState => ({
    //         ...prevState,
            
    //         brandImage: image
    //     }))
    // }, [image])
    
    console.log(input)

    return (
        <div className="add-brand w-full text-center mt-[17px]">
            <form
                onSubmit={handleSubmit}
                className="text-left border border-[#ccc] p-[26px] text-sm flex justify-between">
                <div className="flex-1">
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="brandName"
                            className="form-label mb-2"
                        >
                            Tên thương hiệu
                        </label>
                        <input 
                            id="brandName"
                            name="brandName"
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='text'
                            placeholder="Tên thương hiệu"
                            value={input.brandName}
                            onChange={handleChange}
                            required
                        />
                    </div>
    
                    
    
                    <div className="form-field flex flex-col mb-4">
                        <label 
                            htmlFor="brandImage"
                            className="form-label mb-2"
                        >
                            Hình ảnh
                        </label>
                        <input 
                            id="brandImage"
                            className="form-input w-[70%] border border-[#ccc] p-[6px] rounded-md"
                            type='file'
                            onChange={(e)=>handleFileRead(e)}
                            required
                        />
                    </div>
    
                    
                <ButtonStyle type='submit'>Hoàn tất</ButtonStyle>
                    
                </div>

                
                
            </form>
        </div>
    )
}

export default AddBrand