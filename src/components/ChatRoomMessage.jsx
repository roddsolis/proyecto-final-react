/* eslint-disable react/prop-types */
import UserMessage from './UserMessage'
import UserMessageHead from './UserMessageHead'
const ChatRoomMessage = (  {img, avatarSize, message, align, tutorName, chatImgScale, accountType, key, time}  ) => {

  let propiedades = {
    "key": key,
    "message": message,
    "time": time,
    "img": img,
  }

  console.log(accountType)

  console.log(propiedades)

  return (
    <>
      <div className="messageWrapper" key={key}>
        <UserMessageHead img={img} avatarSize={avatarSize} align={align} tutorName={tutorName} chatImgScale={chatImgScale} accountType={accountType} time={time}/>
        <UserMessage message={message} align={align}/>
      </div>
    </>
  )
}

export default ChatRoomMessage
