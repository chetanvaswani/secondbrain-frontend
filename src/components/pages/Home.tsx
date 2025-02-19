import Button from '../Button';
import Card from '../Card';
import Sidebar from '../Sidebar'
import { IoShareSocialOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import AddContentModal from "../AddContentModal";
import ShareContentModal from '../ShareContentModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrDocumentMissing } from "react-icons/gr";
import axios from 'axios';
import Loader from '../Loader';
import {cardProps} from '../Card';


export default function Home(){
    const URL: string = "http://localhost:6001/api/v1/content";
    const [addContentModal, setAddContentModal] = useState(false);
    const [shareContentModal, setShareContentModal] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [data, setData] = useState<cardProps[]>([])
    const [content, setContent] = useState<cardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [readloadContent, setReloadContent] = useState<boolean>(true);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<"all" | "tweet" | "youtube" | "document" | "link" | "tags">("all")

    useEffect(() => {
        const res = localStorage.getItem("token");
        
        if (!res){
          navigate("/login")
        } else {
            setToken(res)
        }
    }, [])

    useEffect(() => {
        console.log(selectedCategory)
        if (selectedCategory === "all"){
            console.log(data)
            setContent(data)
        } 
        if (["tweet", "youtube", "document", "link"].includes(selectedCategory)){
            let newContent = data.filter(d => d.type === selectedCategory)
            console.log(newContent)
            setContent(newContent)
        }
        if (selectedCategory === "tags"){
            console.log("hello world")
            let newContent = data.filter(d => d.tags.length > 0)
            setContent(newContent)
        }
    }, [selectedCategory, data])

    useEffect(() => {
        if(token && readloadContent){
            console.log("hello")
            axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if(res.data.success && res.data.data.length > 0){
                    setData(res.data.data)
                    setLoading(false)
                } else{
                    setLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
            setReloadContent(false)
        }
    },[token, readloadContent])
  
    return (
        <div className='h-screen w-screen flex'>
          <AddContentModal open={addContentModal} setOpen={setAddContentModal} setReloadContent={setReloadContent} />
          <ShareContentModal open={shareContentModal} setOpen={setShareContentModal} length={content.length} />
          <div className='h-full'> 
            <Sidebar login={true} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          </div>
          <div className='h-full w-full bg-gray-100 flex flex-col justify-start items-center'>
            <div className='w-full flex items-center justify-between p-10'>
              <div className='text-3xl font-semibold'>
                {
                    selectedCategory === "all" ? <p>All Notes</p> :
                    selectedCategory === "tweet" ? <p>Tweets</p> : 
                    selectedCategory === "youtube" ? <p>Vidoes</p> :
                    selectedCategory === "link" ? <p>Links</p> :
                    selectedCategory === "document" ? <p>Documents</p> :
                    selectedCategory === "tags" ? <p>Content with Tags</p> : false
                }
              </div>
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
                            <Loader />
                            <div className='text-gray-500 text-2xl'>Loading your content...</div>
                        </div>
                     :
                    content.length > 0 ? content.map((item) => {
                        return (
                            <div key={item.id} className='w-[31%] max-w-96 min-w-72'>
                                <Card setReloadContent={setReloadContent} id={item.id} title={item.title} link={item.link} type={item.type} tags={item.tags} />
                            </div>
                        )
                    }) :
                    <div className='h-[50%] w-full flex flex-col gap-3 justify-center items-center'>
                        <GrDocumentMissing className='text-gray-300 size-20' />
                        <p className='text-gray-300 text-2xl font-bold'>No Content to Display.</p>
                    </div>
                }
              </div>
            </div>
        </div>
    )
  }