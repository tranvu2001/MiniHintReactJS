import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductServices from "../../axios/ProductServices"
import numberWithCommas from "../../utils/numberWithCommas"

const ViewProduct = () => {
    const {id} = useParams()

    const [product, setProducts] = useState([])
    useEffect(() => {
        ProductServices.getProductById(id).then(res => {
            setProducts(res.data)
        })
    }, [])

    console.log(product)

    const splitString = (string) => {
        const stringToArray = string?.split("")
        const removeValueFrom = [0, 1]
        const result = stringToArray?.filter((value, index) => {
            return removeValueFrom.indexOf(index) === - 1
        })

        return result?.join('')
    }

    const renderBrand = (brand) => {
        switch (brand) {
            case 1: return 'Aorus'
            case 2: return 'Asus'
            case 3: return 'Corsair'
            case 4: return 'Logitech'
            case 5: return 'Msi'
            case 6: return 'Steel Series'
            case 7: return 'Nvidia'
            case 8: return 'Razer'
            case 9: return 'Apple'
            case 10: return 'Samsung'
            case 11: return 'Oppo'
            case 12: return 'Mozard'
            case 13: return 'Hydrus'
            case 14: return 'Sony'
            case 15: return 'JBL'
            case 16: return 'Xiaomi'
            case 17: return 'Toto Link'
            case 18: return 'LinkSys'
            case 19: return 'Tenda'
            case 20: return 'Microlab'
            case 21: return 'Harman Kardon'
            case 22: return 'HP'
            case 23: return 'Dell'
            case 24: return 'ViewSonic'
            case 25: return 'Rog'
            case 26: return 'DareU'
            
            case 27: return 'Keychron'
            case 28: return 'Gigabyte'
            case 29: return 'LG'
        
            default:
                break;
        }
    }

    const renderCategory = (category) => {
        switch(category) {
            case 1:
                return 'Card màn hình'
            case 2:
                return 'Bàn phím'
            case 3:
                return 'Chuột'
            case 4:
                return 'Tai nghe'
            case 5:
                return 'Màn hình'
            case 6:
                return 'Loa'
            case 7:
                return 'Thiết bị'
        }
    }

    return (
        <div className="view-product w-full text-center mt-[17px]">
            <table>
                <tbody>
                    <tr><th colSpan={2}>Thông tin sản phẩm</th></tr>
                    <tr><td>Tên sản phẩm</td><td>{product.productName}</td></tr>
                    <tr><td>Giá</td><td>{numberWithCommas(Number(product.price)) + 'vnd'}</td></tr>
                    <tr><td>Hình 1</td><td><img src={splitString(product?.productImage)} className="mx-auto my-0 w-[120px]" alt="hinh1" /></td></tr>
                    <tr><td>Hình 2</td><td><img src={splitString(product?.productImage2)} className="mx-auto my-0 w-[120px]" alt="hinh2" /></td></tr>
                    <tr><td>Chi tiết sản phẩm</td><td>{product.description}</td></tr>
                    <tr><td>Danh mục</td><td>{renderCategory(product.categoryId)}</td></tr>
                    <tr><td>Thương hiệu</td><td>{renderBrand(product.brandId)}</td></tr>
                    <tr><td>Tên slug</td><td>{product.slugName}</td></tr>
                    <tr><td>Phần trăm giảm giá</td><td>{product.discountPercent + '%'}</td></tr>
                    <tr><td>Số sao</td><td>{product.rating}</td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default ViewProduct