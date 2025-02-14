import { LuBrain } from "react-icons/lu";
import InputBox from "../InputBox";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Login(){
    const URL: string = "http://localhost:6001/api/v1/signin";
    const navigate = useNavigate();
    const alerDivtRef= useRef<HTMLInputElement | null>(null);
    let timeout: ReturnType<typeof setTimeout>;
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        const res = localStorage.getItem("token");
        
        if (res){
          navigate("/")
        }
    })

    const uppercaseWords = (str: string )=> str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            // console.log([e.target.name], e.target.value)
        }, 250)
    };

    const handleLogin = async () => {
        if (alerDivtRef.current) {
            alerDivtRef.current.innerText = "Loging in...";
        }
        // console.log(formData)
        axios.post(URL, formData).then((res) => {
            if(res.data.success){
                if (alerDivtRef.current) {
                    alerDivtRef.current.innerText = "Login successful";
                }
                localStorage.setItem("token", res.data.data.token);
                navigate('/')
            }
        }).catch((err) => {
            let msg: string;
             msg = "Invalid request"
            if (err.response.status === 403){
                msg = err.response.data.data
            } else if (err.response.status === 400){
                msg = err.response.data.data.error.issues[0].message
            }
            if (alerDivtRef.current) {
                alerDivtRef.current.innerText = `${uppercaseWords(msg)}. Please try again.`;
            }
        })
    }

    return(
      <div className="h-screen w-screen bg-gray-200 flex flex-col justify-start align-center">
        <div className="flex flex-col gap-10 w-full h-[95%] border-b-1 border-gray-300 justify-center items-center md:flex-row" >
            <div className="w-[90%] flex flex-col justify-center items-center md:h-full">
                <div className="text-left md:w-[70%]">
                    <div className="flex items-center justify-center p-2 gap-2 md:justify-start">
                        <LuBrain className="size-10 fill text-purple-600 -ml-3 md:size-9 lg:size-12" />
                        <div className="text-4xl font-bold text-purple-600 -ml-1 md:text-3xl lg:text-4xl">Second Brain</div>
                    </div>
                    <div className="text-xl text-center font-base md:text-base md:text-left lg:text-2xl">
                        Capture. Organize. Never Forget! 
                    </div>
                    <div className="text-xl text-center font-base md:text-base md:text-left lg:text-2xl">
                        Store Your Knowledge & Amplify Your Thinking.
                    </div>
                </div>
            </div>
            <div className="w-[90%] flex items-center justify-center md:h-full md:justify-start">
                <div className="h-fit w-100 bg-white rounded-md p-5 md:max-w-[90%] " >
                    <div className="flex flex-col gap-4" >
                        <InputBox title="Username" name="username" height={12} maxLength={50} onChange={handleInputChange} />
                        <InputBox title="Password" name="password" type="password" height={12} maxLength={50} onChange={handleInputChange} onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                console.log("enter is pressed")
                                handleLogin();
                            }
                        }} />
                        <div className="text-center text-gray-400 text-sm" ref={alerDivtRef} > </div>
                        <Button variant="primary" size="lg" text="Log in" onClick={handleLogin} />
                        <p className="cursor-pointer text-center text-purple-600" >Forgot Password?</p>
                        <div className="text-gray-400 border border-gray-200 " />
                        <div className="flex justify-center">
                            <Button variant="secondary" size="lg" text="Create New Account" onClick={() => {
                                navigate('/signup')
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className=" w-full h-[5%] bg-white flex items-center justify-center">
            <div className="w-[90%] h-full flex justify-center items-center sm:w-[80%]">
                <p className="text-gray-400 font-light text-xs sm:text-base ">&copy;2025: A project by
                    <a href="https://chetanvaswani.netlify.app" className="text-gray-500 hover:underline" target="_blank" > Chetan Vaswani </a> for
                    <a href="https://100xdevs.com/" target="_blank" className="text-gray-500 hover:underline" > 100xDevs</a> cohort.</p>
            </div>
        </div>
      </div>
    )
}