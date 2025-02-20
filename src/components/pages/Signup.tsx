import { LuBrain } from "react-icons/lu";
import InputBox from "../InputBox";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function signup(){
    const URL = "http://localhost:6001/api/v1/signup"
    const navigate = useNavigate()
    const alerDivtRef= useRef<HTMLInputElement | null>(null);
    let timeout: ReturnType<typeof setTimeout>;
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmation: ""
    });
    const [disabled, setDisabled] = useState(true);
    const [ buttonText, setButtonText ] = useState("Create an Account")

    const uppercaseWords = (str: string )=> str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            // console.log([e.target.name], e.target.value)
        }, 250)
    };

    useEffect(() => {
        if ((formData.password === formData.confirmation) && formData.password.length > 0){
            setDisabled(false)
            if (alerDivtRef.current) {
                alerDivtRef.current.innerText = "";
            }
        }
        else if (!(formData.password === formData.confirmation) && formData.confirmation.length > 0){
            setDisabled(true)
            if (alerDivtRef.current) {
                alerDivtRef.current.innerText = "Passwords Do Not Match";
            }
        }
    }, [formData.password, formData.confirmation])

    const handleSignup = async () => {
        setDisabled(true)
        setButtonText("Creating an account for you...")
        if (!(formData.password === formData.confirmation)){
            if (alerDivtRef.current) {
                alerDivtRef.current.innerText = "Passwords Do Not Match";
            }
            setButtonText("Create an Account")
            setDisabled(false)
            return
        }
        axios.post(URL, {
            username: formData.username,
            password: formData.password
        }).then((res) => {
            console.log(res)
            if(res.data.success){
                if (alerDivtRef.current) {
                    alerDivtRef.current.innerText = "Signup Successful.";
                }
                setButtonText("Redirecting to the login page...")
                setTimeout(() => {
                    setButtonText("Create an Account")
                    setDisabled(false)
                    navigate('/login')
                }, 1500)
            }
        }).catch((err) => {
            setButtonText("Create an Account")
            setDisabled(false)
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
      <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center align-center">
            <div className="w-full h-[95%] flex flex-col gap-5 items-center justify-start mt-15">
                <div className="flex gap-1">
                    <LuBrain className="size-10 text-purple-600"/>
                    <div className="text-purple-600 text-4xl font-semibold">Second Brain</div>
                </div>
                <div className="h-fit w-[85%] bg-white rounded-md p-5 sm:w-110" >
                    <div className="flex w-full items-center justify-center flex-col ">
                        <div className="text-black font-semibold text-2xl text-center">Create New Account</div>
                        <div className="text-gray-600 font-semibold text-base text-center">It's quick and easy.</div>
                    </div>
                    <div className="text-gray-400 border border-gray-200 my-6" />
                    <div className="flex flex-col gap-6" >
                        <InputBox title="Username" name="username" height={12} maxLength={50} onChange={handleInputChange} />
                        <InputBox title="Password" type="password" name="password" height={12} maxLength={50} onChange={handleInputChange}  />
                        <InputBox title="Confirm Password" type="password" name="confirmation" height={12} maxLength={50} onChange={handleInputChange} onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                console.log("enter is pressed")
                                handleSignup();
                            }
                        }}/>
                        <div className="text-center text-gray-400 text-sm" ref={alerDivtRef} > </div>
                        <Button variant="primary" size="lg" text={buttonText} onClick={handleSignup} disabled={disabled} />
                        <div className="text-gray-400 border border-gray-200 " />
                        <div className="flex justify-center">
                            <Button variant="secondary" size="lg" text="Login using existing Account" onClick={() => {
                                navigate('/login')
                            }} />
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