import { MicOff,VideoOff, ScreenShare, Phone  } from 'lucide-react';
import {useState, useEffect} from 'react'
import { Mic, Video  } from 'lucide-react';


const VideoRoomActions = () => {

  const [mic, SetMic] = useState(false)
  const [cam, SetCam] = useState(false)
  const [screen, SetScreen] = useState(false)

  
    

  useEffect(()=>{
  
  },[])  



  return (
    <>
      <div className="videoActionsWrapper"> 
                <div className={`callIconWrapper ${mic ? '' : 'icon-active'}`} onClick={()=>SetMic((prev => !prev))}>{ mic ? <Mic strokeWidth={2.5} /> : <MicOff />}</div> 
                <div className={`callIconWrapper ${cam ? '' : 'icon-active'}`} onClick={()=>SetCam(prev => !prev)}>{cam ? <Video strokeWidth={1.8}/>:<VideoOff />}</div> 
                <div className={`callIconWrapper ${screen ? '' : 'icon-active'}`}  onClick={()=>SetScreen(prev => !prev)}><ScreenShare/></div> 
                <div className="callIconWrapper icon-red"><Phone /></div> 
              </div> 
    </>
  )
}

export default VideoRoomActions
