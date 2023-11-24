import StatusTag from "../components/StatusTag"
import Avatar from "../components/Avatar"
// import { FaMicrophone, FaVideo } from "react-icons/fa";
// import { MdScreenShare, MdCall  } from "react-icons/md";
import { MicOff,VideoOff, ScreenShare, Phone, Plus  } from 'lucide-react';
// import { Mic, Video  } from 'lucide-react';



const Room = () => {
  return (
    <>
    <div className="roomWrapper">
      <div className="callColumn">
        <div className="userStatusWrapper"> <StatusTag status={'Online'}/> 
          <h4 className='subtitle-sm'>Héctor Valenzuela </h4> 
          <p className='btn-text-s mb-0'>Tutor</p> 
        </div>
        <div className="videoWrapper">
            <Avatar /> 
              <div className="videoActionsWrapper"> 
                <div className="callIconWrapper icon-active">{/* <Mic strokeWidth={2.5} /> */}<MicOff /></div> 
                <div className="callIconWrapper icon-active">{/* <Video strokeWidth={1.8}/> */}<VideoOff /></div> 
                <div className="callIconWrapper"><ScreenShare/></div> 
                <div className="callIconWrapper icon-red"><Phone /></div> 
              </div> 
        </div>
      </div>
      <div className="chatColumn">
        <div className="chatWrapper">
          <div className="headWrapper"><p className='btn-text-s mb-0'>Conversación con Hector</p></div>
          <div className="mainWrapper">main</div>
          <div className="actionsWrapper">
            <div className="chatActionContainer">
              <div className="actionIconWraper"><Plus size={20}/></div>
              <div className="inputWrapper">
                <input type="text" placeholder='Envia un mensaje a Hector' className='paragraph-s'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Room