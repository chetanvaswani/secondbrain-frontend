import { LuBrain } from "react-icons/lu";
import InputBox from "./InputBox";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()

    return(
      <div className="h-screen w-screen bg-gray-200 flex flex-col justify-start align-center">
        <div className="flex w-full h-[95%] border-b-1 border-gray-300 " >
            <div className="w-[50%] h-full flex flex-col justify-start items-end">
                <div className="mr-10 mt-50 text-left">
                    <div className="flex items-center justify-start p-2 gap-2">
                        <LuBrain className="size-12 fill text-purple-600 -ml-3" />
                        <div className="text-4xl font-bold text-purple-600 -ml-1">Second Brain</div>
                    </div>
                    <div className="text-2xl font-base">
                        Capture. Organize. Never Forget! 
                    </div>
                    <div className="text-2xl font-base">
                        Store Your Knowledge & Amplify Your Thinking.
                    </div>
                </div>
            </div>
            <div className="w-[50%] flex items-start justify-start">
                <div className="h-fit w-100 bg-white rounded-md p-5 mt-40" >
                    <div className="flex flex-col gap-4" >
                        <InputBox title="Username" name="username" height={12} maxLength={50} onChange={() => {

                        }} />
                        <InputBox title="Password" name="title" height={12} maxLength={50} onChange={() => {

                        }} />
                        <Button variant="primary" size="lg" text="Log in" />
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
            <div className="w-[80%] h-full flex justify-center items-center">
                <p className="text-gray-400 font-light ">&copy;2025: A project by
                    <a href="https://chetanvaswani.netlify.app" className="text-gray-500 hover:underline" target="_blank" > Chetan Vaswani </a> for
                    <a href="https://100xdevs.com/" target="_blank" className="text-gray-500 hover:underline" > 100xDevs</a> cohort.</p>
            </div>
        </div>
      </div>
    )
}