import Card from '../Card';
import Sidebar from '../Sidebar'
import { useState, useEffect } from 'react';
import { GrDocumentMissing } from "react-icons/gr";
import axios from 'axios';
import Loader from '../Loader';
import {cardProps} from '../Card'


export default function VisitBrain(){
    const location = window.location.href.split('/')
    const code = location[location.length - 1]
    const URL: string = "http://localhost:6001/api/v1/brain/" + code;
    const [data, setData] = useState<cardProps[]>([]); 
    const [content, setContent] = useState<cardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCategory, setSelectedCategory] = useState<"all" | "tweet" | "youtube" | "document" | "link" | "tags">("all")

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
        axios.get(URL).then((res) => {
            if(res.data.success && res.data.data.length > 0){
                setData(res.data.data)
                setLoading(false)
            }
        }).catch(() => {
            setLoading(false)
        })
    },[])
  
    return (
        <div className='h-screen w-screen flex'>
          <div className='h-full'> 
            <Sidebar login={false} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
          <div className='h-full w-full bg-gray-100 flex flex-col justify-start items-center'>
            <div className='w-full flex items-center justify-between p-10'>
              <div className='text-3xl font-semibold'>All Notes</div>
                <div className='flex gap-5'>
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
                                <Card id={item.id} title={item.title} link={item.link} type={item.type} tags={item.tags} />
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