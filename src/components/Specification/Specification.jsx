import classNames from "classnames/bind";
import style from './Specification.module.css'

const cx = classNames.bind(style)

const Specification = () => {
    return (
        <div>
            <table className={cx('table') }>
                <tbody className={cx('body')}>
                    <tr><th colSpan={2}>Thông số kỹ thuật</th></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                    <tr><td>ASD</td><td>ABC</td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default Specification