import { Link, Outlet } from "react-router-dom"
import { ButtonStyle } from "../../components/Button/Button"
const ProductManage =() => {
    return (
        <div>
            <Link 
                to='/dashboard/product-manage/add'
                className="inline-block
                          text-[1.4rem]
                          px-[26px] py-[6px]
                          border border-[#ccc]
                          text-center
                          hover:bg-[#ccc] hover:text-white
                          transition-colors"
                          
            >
                Thêm sản phẩm
            </Link>

            
            <Outlet />
        </div>
    )
}

export default ProductManage