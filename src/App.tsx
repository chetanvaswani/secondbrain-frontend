import './App.css';
import Button from './components/Button';
import Card from './components/Card';
import { IoShareSocialOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";


function App() {

  return (
    <div className='h-screen w-screen bg-gray-100 flex flex-col justify-evenly items-center'>
      <div>
        <Button variant='secondary' startIcon={<IoShareSocialOutline className='size-6' />} size='lg' text='Share Brain' />
        <Button variant='primary' size='lg' startIcon={<GoPlus className='size-6' />} text='Add Content' />
      </div>
      <div>
        <Card tags={['productivity', 'ideas']} title='How to build a second brain' link="abc" type="tweet" />
      </div>
    </div>
  )
}

export default App
