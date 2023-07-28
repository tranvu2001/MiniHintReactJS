
import { useNavigate } from "react-router-dom"
import { ButtonStyle } from "../../components/Button/Button"
import { auth } from "../../firebase/firebase"
import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
const ResetPassword = () => {

    const [input, setInput] = useState({email: ''})
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.email !== '') {
            sendPasswordResetEmail(auth, input.email)
            .then(() => {
                alert('Email đã được gửi. Vui lòng kiểm tra và xác nhận')
                navigate('/login')
            })
            .catch((error) => {
                setError(error)
            })
        } else {
            setError('Vui lòng nhập email của bạn!')
        }
    }

    const handleChange = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div className="my-[80px] md:my-[90px] lg:mt-[60px] w-[1200px] max-w-[100%] pl-5 pr-5">
            <form onSubmit={handleSubmit}>
                    <div className="w-full md:w-[50%]">
                        <label htmlFor="email" className="text-base mr-4">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            className="w-full
                            px-[14px] py-[10px]
                            border
                            border-[#c7c7c7]
                            rounded-[22px]
                            text-base"
                            
                            value={input.email}
                            onChange={handleChange}
                            required
                            />
                        <h2
                            className="mt-4 text-sm"
                        >Vui lòng nhập email mà bạn muốn khôi phục mật khẩu</h2>
                    </div>
                    
                    <div className="flex items-center justify-start">
                        <div >
                            {error ? <span>{error}</span> : ''}
                        </div>
                        <ButtonStyle type="submit" padding={'4px 34px'}>Hoàn tất</ButtonStyle>
                    </div>
                </form>

        </div>
    )
}

export default ResetPassword