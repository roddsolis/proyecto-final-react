import Avatar from "./Avatar";

const UserChatMessage = ({img, avatarSize, message, accountType}) => {

  return (
    <>
           <div className="messageWrapper">

              <div className="userInfoContainer left">
              <div className="avatarContainer">
                <Avatar img={img} avatarSize={avatarSize}/>
                </div>
               <div className="userInfoText"><p className='btn-text-m'>Tú</p><p className='paragraph-xs'>Hace un minuto</p></div>    
              </div>

              <div className="messageContainer ">
                <div className="message">
                {message}
                </div>
              </div>
            </div>
    </>
  )
}

export default UserChatMessage