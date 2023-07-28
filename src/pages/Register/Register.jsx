import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { ButtonStyle } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import style from './Register.module.css'
import { auth } from "../../firebase/firebase";
import {AuthErrorCodes, createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth'
import { useAuthValue } from "../../Context/AuthContext";

const cx = classNames.bind(style)

const Register = () => {

    const [input, setInput] = useState({email: '', name: '', password: '', confirmPassword: ''})
    const [error, setError] = useState('')
    const {setTimeActive} = useAuthValue()
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const validatePassword = () => {
        let isValid = true
        if (input.password !== '' && input.confirmPassword !== '') {
            if (input.password !== input.confirmPassword) {
                isValid = false
                setError("Mật khẩu không khớp")
            }
        }
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        let email = input.email.toLocaleLowerCase().trim()
        let password = input.password
        let name = input.name
        let confirmPassword = input.confirmPassword

        if (validatePassword()) {
            // creating a new user
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // signed up
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    setTimeActive(true)
                    navigate('/verify-email')

                    return updateProfile(auth.currentUser, {
                        displayName: input.name
                    })
                }).catch((err) => alert(err.message))
                console.log(userCredential.user);
            })
            .catch(err => {
                if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
                    setError("Mật khẩu quá yếu")
                } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
                    setError("Địa chỉ email đã được sử dụng")
                } else {
                    console.log(err.code)
                }
            })
        }
        
    }

    

    

    return (
        <div className={cx('register')}>
            <div className={cx('container')}>
                <h2 className="text-lg font-semibold">Đăng ký</h2>
                <p className="text-xs">Vui lòng điền vào form bên dưới để tạo tài khoản</p>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-field')}>
                        <label htmlFor="email" className={cx('form-label')}>Email</label>
                        <input 
                            type="email" 
                            className={cx('form-input')} 
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('form-field')}>
                        <label htmlFor="name" className={cx('form-label')}>Họ và tên</label>
                        <input 
                            type="text" 
                            className={cx('form-input')} 
                            id="name"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('form-field')}>
                        <label htmlFor="password" className={cx('form-label')}>Mật khẩu</label>
                        <input 
                            type="password" 
                            className={cx('form-input')} 
                            id="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('form-field')}>
                        <label htmlFor="confirmPassword" className={cx('form-label')}>Xác nhận mật khẩu</label>
                        <input 
                            type="password" 
                            className={cx('form-input')} 
                            id="confirmPassword"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error ? <span>{error}</span>: ''}
                    <ButtonStyle type="submit" marginleft={0} fullWidth  padding={'4px 34px'}>Hoàn tất</ButtonStyle>
                </form>

                <p>Đã có tài khoản? <Link to='/login' className={cx("login")}>Đăng nhập</Link></p>
            </div>
        </div>
    )
}

export default Register