import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets'
import { AppContent } from "../context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";


const Login = () => {

    const navigate = useNavigate();

    const { backendUrl, setIsLoggedIn , getUserData } = useContext(AppContent)

    const [state, setState] = useState('Signup');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;

            if (state === 'Signup') {
                // const {data} = await axios.post(backendUrl + '/api/auth/register', { name, email, password })
                const {data} = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password })
                if (data.success) {
                    setIsLoggedIn(true)
                    getUserData()
                    navigate('/')
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            } else {
                // const {data} = await axios.post(backendUrl + '/api/auth/login', { email, password })
                const {data} = await axios.post(`${backendUrl}/api/auth/login`, { email, password })
                if (data.success) {
                    setIsLoggedIn(true)
                    getUserData()
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
                <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className="absolute left-5 sm:left-20 top-5 w-28 cursor-pointer" />
                <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                    <h2 className="text-3xl font-semibold text-white text-center mb-3">{state === 'Signup' ? 'Create Account' : 'Login'}</h2>
                    <p className="text-center text-sm mb-6">{state === 'Signup' ? 'Create your Account' : 'Login to your Account'}</p>

                    <form onSubmit={onSubmitHandler}>
                        {state === 'Signup' &&
                            (<div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                                <img src={assets.person_icon} alt="/icon" />
                                <input type="text" name="name" id="name" placeholder="Full Name" className="bg-transparent outline-none"
                                    onChange={e => setName(e.target.value)} value={name} required />
                            </div>
                            )}

                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                            <img src={assets.mail_icon} alt="/icon" />
                            <input type="email" name="email" id="email" placeholder="Email id" className="bg-transparent outline-none"
                                onChange={e => setEmail(e.target.value)} value={email} required />
                        </div>

                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                            <img src={assets.lock_icon} alt="/icon" />
                            <input type="password" name="password" id="password" placeholder="Password" className="bg-transparent outline-none"
                                onChange={e => setPassword(e.target.value)} value={password} required />
                        </div>

                        <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot Password?</p>

                        <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
                            {state}</button>
                    </form>

                    {state === 'Signup' ?
                        (<p className="text-gray-400 text-center text-xs mt-4">Already have an account?{' '}
                            <span onClick={() => setState('Login')} className="text-blue-400 cursor-pointer underline">Login here</span></p>)
                        :
                        (<p className="text-gray-400 text-center text-xs mt-4">Don&#39;t have an account?{' '}
                            <span onClick={() => setState('Signup')} className="text-blue-400 cursor-pointer underline">Signup</span></p>)
                    }

                </div>
            </div>


        </>
    )
}

export default Login
