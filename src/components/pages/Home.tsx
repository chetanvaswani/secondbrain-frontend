import Button from '../Button';
import Card from '../Card';
import Sidebar from '../Sidebar'
import { IoShareSocialOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import AddContentModal from "../AddContentModal";
import ShareContentModal from '../ShareContentModal';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrDocumentMissing } from "react-icons/gr";
import axios from 'axios';
import Loader from '../Loader';
import {cardProps} from '../Card'


export default function Home(){
    const URL: string = "http://localhost:6001/api/v1/content";
    const [addContentModal, setAddContentModal] = useState(false);
    const [shareContentModal, setShareContentModal] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [content, setContent] = useState<cardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const readLoadContent = useRef<boolean>(true)
    const navigate = useNavigate();

    useEffect(() => {
        const res = localStorage.getItem("token");
        
        if (!res){
          navigate("/login")
        } else {
            setToken(res)
        }
    }, [])

    useEffect(() => {
        console.log(readLoadContent.current)
        if(token && readLoadContent.current){
            console.log("hello")
            axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if(res.data.success && res.data.data.length > 0){
                    setContent(res.data.data)
                    console.log(res.data.data)
                    setLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })

            readLoadContent.current = false;
        }
    },[token, readLoadContent.current])
  
    return (
        <div className='h-screen w-screen flex'>
          <AddContentModal open={addContentModal} setOpen={setAddContentModal} readLoadContent={readLoadContent} />
          <ShareContentModal open={shareContentModal} setOpen={setShareContentModal} />
          <div className='h-full'> 
            <Sidebar />
          </div>
          <div className='h-full w-full bg-gray-100 flex flex-col justify-start items-center'>
            <div className='w-full flex items-center justify-between p-10'>
              <div className='text-3xl font-semibold ' >All Notes</div>
                <div className='flex gap-5'>
                  <div onClick={() => {
                      setShareContentModal(true)
                    }} >
                      <Button variant='secondary' startIcon={<IoShareSocialOutline className='size-6' />} size='lg' text='Share Brain' />
                  </div>
                  <div onClick={() => {
                    setAddContentModal(true)
                  }} >
                      <Button variant='primary' size='lg' startIcon={<GoPlus className='size-6' />} text='Add Content' />
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap justify-start gap-7 overflow-auto w-full h-full px-10 py-5'>
                {   
                    loading ?
                        <div className='h-full w-full flex justify-center items-center flex-col gap-3'>
                            <Loader height='13' width='13'/>
                            <div className='text-gray-500 text-2xl'>Loading your content...</div>
                        </div>
                     :
                    content.length > 0 ? content.map((item) => {
                        return (
                            <div key={item.id} className='w-[31%] max-w-96 min-w-72'>
                                <Card readLoadContent={readLoadContent} id={item.id} title={item.title} link={item.link} type={item.type} tags={item.tags} />
                            </div>
                        )
                    }) :
                    <div className='h-[50%] w-full flex flex-col gap-3 justify-center items-center'>
                        <GrDocumentMissing className='text-gray-300 size-20' />
                        <p className='text-gray-300 text-2xl font-bold'>No Content to Display.</p>
                    </div>
                }
                {/* <Card tags={['coding', 'schaling']} title='Scaling Infra' link="https://youtu.be/a5kKRtMmhzQ?si=MGFhqzmAVgVNwyIQ" type="youtube" />
                <Card tags={['lessonsbysalman', 'learnings', 'principles']} title='Life advice by Salman Khan' link="https://youtu.be/34A_byKv26s?si=xmUoO0bYKb9xDFJM" type="youtube" />
                <Card tags={['business']} title='Shark Tank: Go Zero' link="https://youtu.be/KwHNPgZDRPM?si=lCo5n3t7BgQ4DP5" type="youtube" />
                <Card tags={['productivity', 'ideas']} title='Musk on Doge' link="https://x.com/elonmusk/status/1888891512303263815" type="tweet" />
                <Card tags={['meme', 'fun']} title='Meme' link="https://x.com/elonmusk/status/1888320372615069983" type="tweet" /> */}
              </div>
            </div>
        </div>
    )
  }