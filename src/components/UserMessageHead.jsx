import Avatar from "./Avatar";

const UserMessageHead = ( {img, avatarSize} ) => {
  return (
    <>
        <div className="userInfoContainer">
              <div className="avatarContainer"><Avatar img={img} avatarSize={avatarSize}/></div>
               <div className="userInfoText"><p className='btn-text-m'>Tú</p><p className='paragraph-xs'>Hace un minuto</p></div>    
        </div>
    </>
  )
}

export default UserMessageHead
