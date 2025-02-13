import { LuBrain } from "react-icons/lu";
import InputBox from "./InputBox";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function signup(){
    const navigate = useNavigate()

    return(
      <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center align-center">
            <div className="w-full h-[95%] flex flex-col gap-5 items-center justify-start mt-15">
                <div className="flex gap-1">
                    <LuBrain className="size-10 text-purple-600"/>
                    <div className="text-purple-600 text-4xl font-semibold">Second Brain</div>
                </div>
                <div className="h-fit w-100 bg-white rounded-md p-5" >
                    <div className="flex w-full items-center justify-center flex-col ">
                        <div className="text-black font-semibold text-2xl text-center">Create New Account</div>
                        <div className="text-gray-600 font-semibold text-base text-center">It's quick and easy.</div>
                    </div>
                    <div className="text-gray-400 border border-gray-200 my-6" />
                    <div className="flex flex-col gap-6" >
                        <InputBox title="Username" name="username" height={12} maxLength={50} onChange={() => {

                        }} />
                        <InputBox title="Password" name="title" height={12} maxLength={50} onChange={() => {

                        }} />
                        <InputBox title="Confirm Password" name="title" height={12} maxLength={50} onChange={() => {

                        }} />
                        <Button variant="primary" size="lg" text="Create my Account" />
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
            <div className="w-[80%] h-full flex justify-center items-center">
                <p className="text-gray-400 font-light ">&copy;2025: A project by
                    <a href="https://chetanvaswani.netlify.app" className="text-gray-500 hover:underline" target="_blank" > Chetan Vaswani </a> for
                    <a href="https://100xdevs.com/" target="_blank" className="text-gray-500 hover:underline" > 100xDevs</a> cohort.</p>
            </div>
        </div>
      </div>
    )
}