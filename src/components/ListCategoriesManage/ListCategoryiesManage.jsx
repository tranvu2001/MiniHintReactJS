import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ButtonStyle } from "../Button/Button"
import CategoryServices from "../../axios/CategoryServices"
const ListCategoriesManage =() => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        CategoryServices.getCategory().then(res => {
            let categoryList = res.data
            setCategories(categoryList)
        })
    }, [])

    const handleDelete = (id) => {
        CategoryServices.deleteCategory(id).then(res => {
            setCategories(prevState => {
                return prevState.filter(category => category.categoryId !== id)
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
    
                        {
                            categories.map(category => (
                                <tr key={category.categoryId} className="text-center">
                                    <td>{category.categoryId}</td>
                                    <td><img src={category.categoryImage} alt="img-product" className="w-12 h-12 mx-auto"  /></td>
                                    <td>{category.categoryName}</td>
                                    {/* <td>123,123,123$</td> */}
                                    <td>
                                        <Link 
                                            to={`/dashboard/category-manage/update/${category.categoryId}`}
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
                                        <ButtonStyle onClick={() => handleDelete(category.categoryId)} padding="0px 10px" fontsize="1.2rem" margintop='0'>Xóa</ButtonStyle>
                                    </td>
                                </tr>
                            ))
                        }
                        
                        
            </table>
        </div>
    )
}

export default ListCategoriesManage