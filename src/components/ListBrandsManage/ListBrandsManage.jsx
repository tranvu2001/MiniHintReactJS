import { Link } from "react-router-dom"
import { ButtonStyle } from "../Button/Button"
import { useEffect, useState } from "react"
import BrandServices from "../../axios/BrandServices"
const ListBrandsManage =() => {

    const [brands, setBrands] = useState([])
    useEffect(() => {
        BrandServices.getBrand().then(res => {
            setBrands(res.data)
        })
    }, [])

    const handleDelete = (id) => {
        BrandServices.deleteBrand(id).then(res => {
            setBrands(prevState => {
                return prevState.filter(brand => brand.brandId !== id)
            })
        })
    }
    return (
        <div>
            
            <table className="w-full text-center mt-[17px]">
                        <tr>
                            <td>Id</td>
                            <td>Hình</td>
                            <td>Tên danh mục</td>
                            {/* <td>Giá</td> */}
                            <td>Thao tác</td>
                        </tr>

                        {brands.map(brand => (
                            <tr className="text-center">
                                <td>{brand.brandId}</td>
                                <td><img src={brand.brandImage} alt="img-product" className="w-12 h-12 mx-auto"  /></td>
                                <td>{brand.brandName}</td>
                                {/* <td>123,123,123$</td> */}
                                <td>
                                    <Link 
                                        to={`/dashboard/brand-manage/update/${brand.brandId}`}
                                        className="inline-block
                                                min-w-[64px]
                                                text-[1.4rem]
                                                px-[10px] py-[0px]
                                                border border-[#ccc]
                                                text-center
                                                rounded-[50px]
                                                hover:bg-[#ccc] hover:text-white
                                                transition-colors"
                                                
                                    >
                                        Sửa
                                    </Link>
                                    <ButtonStyle onClick={() => handleDelete(brand.brandId)} padding="0px 10px" margintop='0' fontsize="1.2rem">Xóa</ButtonStyle>
                                </td>
                            </tr>
                        ))}
                        
            </table>
        </div>
    )
}

export default ListBrandsManage