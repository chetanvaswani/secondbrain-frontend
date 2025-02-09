import './App.css';
import Button from './components/Button';
import Card from './components/Card';
import { IoShareSocialOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";


function App() {

  return (
    <div className='h-screen bg-gray-100 flex flex-col justify-evenly items-center'>
      <div>
        <Button variant='secondary' startIcon={<IoShareSocialOutline className='size-6' />} size='lg' text='Share Brain' />
        <Button variant='primary' size='lg' startIcon={<GoPlus className='size-6' />} text='Add Content' />
      </div>
      <div className='flex overflow-auto gap-10'>
        <Card tags={['productivity', 'ideas']} title='first tweet' link="https://youtu.be/a5kKRtMmhzQ?si=MGFhqzmAVgVNwyIQ" type="tweet" />
        <Card tags={['productivity', 'ideas']} title='Youtube video' link="https://youtu.be/a5kKRtMmhzQ?si=MGFhqzmAVgVNwyIQ" type="youtube" />
      </div>
    </div>
  )
}

export default App
