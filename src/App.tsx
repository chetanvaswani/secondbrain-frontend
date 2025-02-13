import './App.css';
import Login from "./components/Login";
import Signup from './components/Signup'
import { useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
import Sidebar from './components/Sidebar'
import { IoShareSocialOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import AddContentModal from "./components/AddContentModal";
import ShareContentModal from './components/ShareContentModal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

function Home(){
  const [addContentModal, setAddContentModal] = useState(false)
  const [shareContentModal, setShareContentModal] = useState(false)

  return (
      <div className='h-screen w-screen flex'>
        <AddContentModal open={addContentModal} setOpen={setAddContentModal} />
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
              <Card tags={['coding', 'schaling']} title='Scaling Infra' link="https://youtu.be/a5kKRtMmhzQ?si=MGFhqzmAVgVNwyIQ" type="youtube" />
              <Card tags={['lessonsbysalman', 'learnings', 'principles']} title='Life advice by Salman Khan' link="https://youtu.be/34A_byKv26s?si=xmUoO0bYKb9xDFJM" type="youtube" />
              <Card tags={['business']} title='Shark Tank: Go Zero' link="https://youtu.be/KwHNPgZDRPM?si=lCo5n3t7BgQ4DP5" type="youtube" />
              <Card tags={['productivity', 'ideas']} title='Musk on Doge' link="https://x.com/elonmusk/status/1888891512303263815" type="tweet" />
              <Card tags={['meme', 'fun']} title='Meme' link="https://x.com/elonmusk/status/1888320372615069983" type="tweet" />
            </div>
          </div>
      </div>
  )
}

export default App
