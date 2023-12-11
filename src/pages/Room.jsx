import StatusTag from "../components/StatusTag"
import Avatar from "../components/Avatar"
import {useEffect, useState,useContext} from 'react'
import ChatRoomMessage from '../components/ChatRoomMessage'
import { Plus } from 'lucide-react';
import VideoRoomActions from '../components/VideoRoomActions'
import {Context} from '../store/AppContext'


const Room = () => {


  const {store, actions } = useContext(Context)

  console.log(store,actions)

  const [tutorImg, setTutorImg] = useState('')
  const [tutorName, setTutorName] = useState('')
  const [tutorfirstName, setTutorfirstName] = useState('')
  const [alumnoImg, setAlumnoImg] = useState('')
  const [message, setMessage] = useState('')
  const [sendFile, setSendFile] = useState('')
  const [btnFocus, setBtnFocus] = useState(false)

  const activateSendFiles = () => {setSendFile(prev => !prev)}
  const btnFocusActive = (isFocused) => {setBtnFocus(isFocused);};

  useEffect(()=>{

    fetch('https://randomuser.me/api/?nat=es')
    .then(response => response.json())
    .then(data => {

      for ( let elemento in data.results ){
        const tutorImage = data.results[elemento].picture.large;
        setTutorImg(tutorImage)}

      for ( let elemento in data.results ){
        const tutorName = data.results[elemento].name.first +' '+ data.results[elemento].name.last ;
        const firstName = data.results[elemento].name.first;
        setTutorName(tutorName)
        setTutorfirstName(firstName)}  
    })

    .catch(err => err)

    fetch('https://randomuser.me/api/?nat=es')
    .then(response => response.json())
    .then(data => {
     
      for ( let elemento in data.results ){
        const alumnImage = data.results[elemento].picture.large;
        setAlumnoImg(alumnImage)
      }
    })
    .catch(err => err)

    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json(response))
    .then(data => setMessage(data[0].body) )
    .catch(err => err)

  },[])
  
  
  return (
    <>
    <div className="roomWrapper">
      <div className="callColumn">
        <div className="userStatusWrapper"> <StatusTag status={'Online'} color={'green'}/> 
          <h4 className='subtitle-sm'>{tutorName}</h4> 
          <p className='btn-text-s mb-0'>Tutor</p> 
        </div>
        <div className="videoWrapper">
            <Avatar img={tutorImg} avatarSize={128} chatImgScale={100}/> 
            <VideoRoomActions />
        </div>
      </div>
      <div className="chatColumn">
        <div className="chatWrapper">
          <div className="headWrapper"><p className='btn-text-s mb-0'>Conversación con {tutorfirstName}</p></div>
          <div className="mainWrapper">
            <ChatRoomMessage message={message} img={alumnoImg} avatarSize={32} accountType={true} chatImgScale={30} />
            <ChatRoomMessage message={message} img={tutorImg} tutorName={tutorfirstName} avatarSize={32} accountType={false} align={'left'} chatImgScale={30}/>
          </div>
          <div className="actionsWrapper">
            <div className="sendFilesWrapper" style={{display: sendFile ? '': 'none'}}>
              <div className="fileType">file type 1</div>
              <div className="fileType">file type 2</div>
            </div>
            <div className="chatActionContainer" >
              <button className={`actionIconWraper ${btnFocus ? 'focused': ''}`} onClick={()=> activateSendFiles()} onFocus={()=>{btnFocusActive(true)}} onBlur={() => btnFocusActive(false)}><Plus size={18}/></button>
                <input type="text" placeholder={`Envia un mensaje a ${tutorfirstName}`} className='paragraph-s'/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Room