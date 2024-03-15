import { MicOff,VideoOff, ScreenShare, Phone  } from 'lucide-react';
import {useState} from 'react'
import { Mic, Video  } from 'lucide-react';




const VideoRoomActions = ({ videoOnClick }) => {
  const [mic, setMic] = useState(false);
  const [cam, setCam] = useState(false);
  const [screen, setScreen] = useState(false);

  return (
    <>
      <div className="videoActionsWrapper">
        <div className={`callIconWrapper ${mic ? '' : 'icon-active'}`} onClick={() => setMic((prev) => !prev)}>
          {mic ? <Mic strokeWidth={2.5} /> : <MicOff />}
        </div>
        <div className={`callIconWrapper ${cam ? '' : 'icon-active'}`} onClick={() => { setCam((prev) => !prev); videoOnClick(); }}>
          {cam ? <Video strokeWidth={1.8} /> : <VideoOff />}
        </div>
        <div className={`callIconWrapper ${screen ? '' : 'icon-active'}`} onClick={() => setScreen((prev) => !prev)}>
          <ScreenShare />
        </div>
        <div className="callIconWrapper icon-red">
          <Phone />
        </div>
      </div>
    </>
  );
};


export default VideoRoomActions;

