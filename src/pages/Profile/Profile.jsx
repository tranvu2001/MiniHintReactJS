import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMailBulk, faPencil, faPhone } from "@fortawesome/free-solid-svg-icons"
import { ButtonStyle } from "../../components/Button/Button"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthValue } from "../../Context/AuthContext";

const Profile = () => {
    const {currentUser} = useAuthValue()
    const navigate = useNavigate()

    const logoutFirebase = () => {
        firebase.auth().signOut()
        localStorage.setItem('USER_INFO', JSON.stringify({}))
        navigate('/')
    }

    return (
        <div className="profile 
                        mt-[80px] md:mt-[100px] lg:mt-[40px]
                        w-[1200px] 
                        max-w-[100%] 
                        mx-auto 
                        h-[200px]
                        "
                    >
            <div
                className="profile-wrapper 
                           mx-auto
                           w-full md:w-[calc(100%-180px)] h-full
                           md:border md:border-gray-400
                           p-5
                           "
                        >
                    <div className="top 
                                    grid grid-cols-3
                                    md:flex md:items-center md:justify-between"
                                    
                                    >
                            <div className="flex items-center col-span-2">
                                    <img 
                                    src={currentUser?.photoURL ? currentUser?.photoURL : 'assest/item1/banner2.jpg'}
                                    alt="avatar"
                                    className="avatar w-[50px] h-[50px] rounded-full mr-5"
                                    />
                                <span>  
                                    <p>{currentUser?.displayName}</p>
                                    {/* <div>
                                    
                                        <ButtonStyle padding='4px 7px' fontSize='1rem' className="ml-1 text-sm">Sửa thông tin</ButtonStyle>
                                    </div> */}
                                </span>
                            </div>
                        <ButtonStyle
                            padding='4px 7px' 
                            fontsize='1rem' 
                            marginleft='0'
                            margintop='0'
                            className="ml-1 text-sm"
                            onClick={logoutFirebase}
                        >
                            Đăng xuất
                        </ButtonStyle>
                    </div>
                    <hr className="my-[18px]"/>
                    <div className="bottom">
                        <div className="email">
                            <FontAwesomeIcon icon={faMailBulk} className="text-base mr-3"/>
                            <span className="text-sm">Email: {currentUser?.email}</span>
                        </div>

                        <div className="emailVerified">
                            <FontAwesomeIcon icon={faMailBulk} className="text-base mr-3"/>
                            <span className="text-sm">Xác minh email: {currentUser?.emailVerified ? 'Đã xác minh' : 'Chưa xác minh'}</span>
                        </div>
    
                        {/* <div className="phone">
                            <FontAwesomeIcon icon={faPhone} className="text-base mr-3 mt-4"/>
                            <span className="text-sm">Số điện thoại: 0987654321</span>
                        </div> */}
                    </div>
            </div>
        </div>
    )
}

export default Profile