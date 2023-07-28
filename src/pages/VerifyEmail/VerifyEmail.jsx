import { useState } from "react"
import { useAuthValue } from "../../Context/AuthContext"
import { sendEmailVerification } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { ButtonStyle } from "../../components/Button/Button"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const VerifyEmail = () => {
    const {currentUser} = useAuthValue()
    // const [btnDisabled, setBtnDisabled] = useState(false)
    const [time, setTime] = useState(60)
    const {timeActive, setTimeActive} = useAuthValue()
    const navigate = useNavigate()

    const resendEmailVerification = () => {
        // setBtnDisabled(true)
        sendEmailVerification(auth.currentUser)
        .then(() => {
            // setBtnDisabled(false)
            setTimeActive(true)

        }).catch(err => {
            alert(err.message)
            // setBtnDisabled(false)
        })
    }

    useEffect(() => {
        let interval = null
        if(timeActive && time !== 0 ){
          interval = setInterval(() => {
            setTime((time) => time - 1)
          }, 1000)
        }else if(time === 0){
          setTimeActive(false)
          setTime(60)
          clearInterval(interval)
        }
        return () => clearInterval(interval);
      }, [timeActive, time])

    useEffect(() => {
        const interval = setInterval(() => {
          currentUser?.reload()
          .then(() => {
            if(currentUser?.emailVerified){
              clearInterval(interval)
              navigate('/')
            }
          })
          .catch((err) => {
            alert(err.message)
          })
        }, 1000)
      }, [navigate, currentUser])
    

    return (
        <div className="verify-email mt-[140px] lg:mt-[60px] w-[1200px] max-w-[100%] pl-5 pr-5">
            <h2 className="text-xl">Tin nhắn xác nhận đã được gửi đến: {currentUser?.email}</h2>
            {/* <span>{currentUser?.email}</span> */}
            <ButtonStyle 
                padding={'4px 34px'}
                marginleft='0px'
                margintop='0'
                disabled={timeActive}
                onClick={resendEmailVerification}
            >
                Gửi lại {timeActive && time}
            </ButtonStyle>
        </div>
    )
}

export default VerifyEmail