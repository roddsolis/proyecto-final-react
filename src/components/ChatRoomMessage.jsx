/* eslint-disable react/prop-types */
import UserMessage from './UserMessage'
import UserMessageHead from './UserMessageHead'
const ChatRoomMessage = (  {img, avatarSize, message, align, tutorName, chatImgScale, accountType}  ) => {
  return (
    <>
      <div className="messageWrapper">
        <UserMessageHead img={img} avatarSize={avatarSize} align={align} tutorName={tutorName} chatImgScale={chatImgScale} accountType={accountType}/>
        <UserMessage message={message} align={align}/>
      </div>
    </>
  )
}

export default ChatRoomMessage
