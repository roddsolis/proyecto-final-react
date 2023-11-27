/* eslint-disable react/prop-types */
import Avatar from "./Avatar";

const UserMessageHead = ( {img, avatarSize, align, tutorName, chatImgScale, accountType} ) => {


  return (
    <>
        <div className={`userInfoContainer ${align}`}>
              <div className="avatarContainer">
                <Avatar img={img} avatarSize={avatarSize} chatImgScale={chatImgScale}/>
                </div>
               <div className="userInfoText">
                { accountType == true ? <p className='btn-text-m'>Tú</p> : <p className='btn-text-m'>{tutorName}</p> }
                <p className='paragraph-xs'>{ accountType == true ? <p className='btn-text-xs'>12:30 PM</p> : <p className='btn-text-xs'>12:35 PM</p> }</p>
                </div>    
        </div>
    </>
  )
}

export default UserMessageHead
