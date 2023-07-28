import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { ButtonStyle } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, firebaseApp } from "../../firebase/firebase";
import {AuthErrorCodes, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword} from 'firebase/auth'

import style from './Login.module.css'
import { useState, useEffect } from "react";
import { useAuthValue } from "../../Context/AuthContext";

const cx = classNames.bind(style)


const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };

const Login = () => {
    
    const [input, setInput] = useState({email: '', password: ''})
    const [error, setError] = useState('')
    const {setTimeActive} = useAuthValue()
    const navigate = useNavigate()
    

    const handleChange = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        let email = input.email.toLocaleLowerCase().trim()
        let password = input.password
        
        // login user
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (!auth.currentUser.emailVerified) {
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                        setTimeActive(true)
                        navigate('/verify-email')
                    })
                } else {
                    navigate('/')
                    window.location.reload(true)
                }
            }).catch(err => {
                if (
                    err.code === AuthErrorCodes.INVALID_PASSWORD ||
                    err.code === AuthErrorCodes.USER_DELETED
                ) {
                    setError('Địa chỉ email hoặc mật khẩu không đúng')
                } else {
                    console.log(err.code)
                }
            })
    }

    useEffect(() => {
        
        window.scrollTo(0, 0)
    }, [])



    

    return (
        <div className={cx('login')}>
            <div className={cx('container')}>
                <h2 className="text-lg font-semibold">Đăng nhập</h2>
                {/* <p>Vui lòng điền vào form bên dưới để tạo tài khoản</p> */}
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-field')}>
                        <label htmlFor="email" className={cx('form-label')}>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className={cx('form-input')} 
                            id="email"
                            value={input.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('form-field')}>
                        <label htmlFor="password" className={cx('form-label')}>Mật khẩu</label>
                        <input 
                            type="password" 
                            name="password" 
                            className={cx('form-input')} 
                            id="password"
                            value={input.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className={cx('form-field')}>
                            {error ? <span>{error}</span> : ''}
                            <Link className="text-base" to='/reset-password'>Quên mật khẩu</Link>
                        </div>
                        <ButtonStyle type="submit" marginleft={0} padding={'4px 34px'}>Hoàn tất</ButtonStyle>
                    </div>
                </form>

                <p>Chưa có tài khoản? <Link to='/register' className={cx("register")}>Đăng ký</Link></p>
            </div>
        </div>
    )
}

export default Login