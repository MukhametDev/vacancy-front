import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import API from "../../../api/api.config.ts";
import {loginSuccess} from "../../../features/auth/authSlice.ts";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await API.post('/login', { email, password })
            dispatch(loginSuccess(res.data.access_token))
            navigate('/admin')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            alert('Неверные данные')
        }
    }

    return (
        <div className="container">
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col gap-4 text-black bg-[#FCFCFC] border-[#ECECEC] border-[1px] p-[30px] rounded-[10px] max-w-[400px]">
                    <h2 className="text-center font-bold text-2xl">Форма авторизации</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                        <input name="email"
                               className="border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] focus:outline-none"
                               type="email"
                               placeholder="Email"
                               required
                               onChange={(e) => setEmail(e.target.value)}
                        />
                        <input name="password"
                               className="border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] focus:outline-none"
                               type="password"
                               placeholder="Password"
                               required
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="bg-[#6A9AFB] p-[5px] rounded-[10px] text-white cursor-pointer"
                                type="submit">Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm