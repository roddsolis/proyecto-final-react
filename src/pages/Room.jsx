import StatusTag from "../components/StatusTag"
import Avatar from "../components/Avatar"
import {useEffect, useState,useContext} from 'react'
import ChatRoomMessage from '../components/ChatRoomMessage'
import { Plus } from 'lucide-react';
import VideoRoomActions from '../components/VideoRoomActions'
import {Context} from '../store/AppContext'
import io from 'socket.io-client';

const Room = () => {
  const { store, actions } = useContext(Context);

  const [userImg, setUserImg] = useState("");
  const [userName, setUserName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [sendFile, setSendFile] = useState("");
  const [btnFocus, setBtnFocus] = useState(false);

  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socket = io(store.apiURL, { transports: ["websocket"] });

  const activateSendFiles = () => setSendFile((prev) => !prev);
  const btnFocusActive = (isFocused) => setBtnFocus(isFocused);

  useEffect(() => {
    fetch("https://randomuser.me/api/?nat=es")
      .then((response) => response.json())
      .then((data) => {
        const userImage = data.results[0].picture.large;
        setUserImg(userImage);
        const fullName = data.results[0].name.first + " " + data.results[0].name.last;
        const firstName = data.results[0].name.first;
        setUserName(fullName);
        setUserFirstName(firstName);
      })
      .catch((err) => console.error(err));

      socket.on('user_joined', (data)=>{console.log(data)})

      socket.on("receive_message", (data)=> {
        console.log("Nuevo mensaje recibido:", data)
        setChatMessages((prevMessages) => [...prevMessages, data])
      })

      socket.emit("join", {room: "room-1"})
  }, []);

  
  console.log(store.usuarioAutenticado.tipo)

  const handleSendMessage = () => {
    console.log("Enviando mensaje:", newMessage);
    socket.emit("new_message", {message: newMessage})
    setNewMessage("");
  };


  return (
    <>
      <div className="roomWrapper">
        <div className="callColumn">
          <div className="userStatusWrapper">
            <StatusTag status={"Online"} color={"green"} />
            <h4 className="subtitle-sm">{userName}</h4>
            <p className="btn-text-s mb-0">{store.usuarioAutenticado?.tipo === "tutor" ? "Tutor" : "Alumno"}</p>
          </div>
          <div className="videoWrapper">
            <Avatar img={userImg} avatarSize={128} chatImgScale={100} />
            <VideoRoomActions/>
          </div>
        </div>
        <div className="chatColumn">
          <div className="chatWrapper">
            <div className="headWrapper">
              <p className="btn-text-s mb-0">Conversación con {userFirstName}</p>
            </div>
            <div className="chatMainWrapper">
              {chatMessages.map((data, index) => (
                <ChatRoomMessage key={index} message={data.message} align={"right"}img={userImg} avatarSize={32} accountType={true} chatImgScale={30} />
              ))}
            </div>
            <div className="actionsWrapper">
              <div className="sendFilesWrapper" style={{ display: sendFile ? "" : "none" }}>
                <div className="fileType">file type 1</div>
                <div className="fileType">file type 2</div>
              </div>
              <div className="chatActionContainer">
                <button className={`actionIconWraper ${btnFocus ? "focused" : ""}`} onClick={activateSendFiles} onFocus={() => btnFocusActive(true)} onBlur={() => btnFocusActive(false)}>
                  <Plus size={18} />
                </button>
                <form action="" method="post" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                  <input type="text" placeholder={`Envía un mensaje a ${userFirstName}`} className="paragraph-s" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
