import { Link, Outlet } from "react-router-dom"
import { ButtonStyle } from "../Button/Button"
const CategoryManage =() => {
    return (
        <div>
            <Link 
                to='/dashboard/category-manage/add'
                className="inline-block
                         text-[1.4rem]
                          px-[26px] py-[6px]
                          border border-[#ccc]
                          text-center
                          hover:bg-[#ccc] hover:text-white
                          transition-colors"
                          
            >
                Thêm danh mục
            </Link>

            
            <Outlet />
        </div>
    )
}

export default CategoryManage