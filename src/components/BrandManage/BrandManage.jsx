import { Link, Outlet } from "react-router-dom"
import { ButtonStyle } from "../Button/Button"
const BrandManage =() => {
    return (
        <div>
            <Link 
                to='/dashboard/brand-manage/add'
                className="inline-block
                         text-[1.4rem]
                          px-[26px] py-[6px]
                          border border-[#ccc]
                          text-center
                          hover:bg-[#ccc] hover:text-white
                          transition-colors"
                          
            >
                Thêm thương hiệu
            </Link>
            <Outlet />
        </div>
    )
}

export default BrandManage