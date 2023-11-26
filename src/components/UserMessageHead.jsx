import Avatar from "./Avatar";

const UserMessageHead = ( {img, avatarSize, align, tutorName} ) => {
  return (
    <>
        <div className={`userInfoContainer ${align}`}>
              <div className="avatarContainer">
                <Avatar img={img} avatarSize={avatarSize}/>
                </div>
               <div className="userInfoText">
                <p className='btn-text-m'>{tutorName}</p>
                <p className='paragraph-xs'>Hace un minuto</p>
                </div>    
        </div>
    </>
  )
}

export default UserMessageHead
