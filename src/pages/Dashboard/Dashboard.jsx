import { Outlet, Link } from "react-router-dom"
import { ButtonStyle } from "../../components/Button/Button"


const Dashboard = () => {
    return (
        <div className="dashboard flex items-start mt-[40px] w-[1200px] max-w-[100%] mx-auto">
            <div className="sidebar w-[210px]  border border-gray-500">
                <ul className="list text-center">
                    <li className="group item text-lg p-3 hover:bg-blue-500 cursor-pointer transition-colors">
                        <Link to="/dashboard/product-manage" className="group-hover:text-white">Sản phẩm</Link>
                    </li>
                    <li className="group item text-lg p-3 hover:bg-blue-500 cursor-pointer transition-colors">
                        <Link to="/dashboard/category-manage" className="group-hover:text-white">Danh mục</Link>
                    </li>
                    <li className="group item text-lg p-3 hover:bg-blue-500 cursor-pointer transition-colors">
                        <Link to="/dashboard/brand-manage" className="group-hover:text-white">Thương hiệu</Link>
                    </li>
                    <li className="group item text-lg p-3 hover:bg-blue-500 cursor-pointer transition-colors">
                        <Link to="/dashboard/order-manage" className="group-hover:text-white">Đơn hàng</Link>
                    </li>
                </ul>
            </div>
            <div className="content w-[calc(100%-210px)] pl-[30px]">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard