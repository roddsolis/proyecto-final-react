import StatusTag from "../components/StatusTag"
import Avatar from "../components/Avatar"
// import { FaMicrophone, FaVideo } from "react-icons/fa";
// import { MdScreenShare, MdCall  } from "react-icons/md";
import { MicOff,VideoOff, ScreenShare, Phone,  } from 'lucide-react';
// import { Mic, Video  } from 'lucide-react';



const Room = () => {
  return (
    <>
    <div className="roomWrapper">
      <div className="callColumn">
        <div className="userStatusWrapper"> <StatusTag status={'Online'}/> <h4 className='subtitle-l'>Héctor Valenzuela </h4> <p className='btn-text-m mb-0'>Tutor</p> </div>
        <div className="videoWrapper">
            {/* <Avatar />  */}
              <div className="videoActionsWrapper"> 
                <div className="callIconWrapper icon-active">{/* <Mic strokeWidth={2.5} /> */}<MicOff strokeWidth={2.5}/></div> 
                <div className="callIconWrapper">{/* <Video strokeWidth={1.8} size={32}/> */}<VideoOff strokeWidth={1.8} size={32}/></div> 
                <div className="callIconWrapper"><ScreenShare strokeWidth={2.5} /></div> 
                <div className="callIconWrapper icon-red"><Phone strokeWidth={2.5} /></div> 
              </div> 
        </div>
      </div>
      <div className="chatColumn">
        <div className="chatWrapper">
          <div className="heaWrapper">head</div>
          <div className="mainWrapper">main</div>
          <div className="actionsWrapper">send</div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Room