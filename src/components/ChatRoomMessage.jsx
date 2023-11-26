import UserMessage from './UserMessage'
import UserMessageHead from './UserMessageHead'
const ChatRoomMessage = (  {img, avatarSize, message, align, tutorName}  ) => {
  return (
    <>
      <div className="messageWrapper">
        <UserMessageHead img={img} avatarSize={avatarSize} align={align} tutorName={tutorName}/>
        <UserMessage message={message} align={align}/>
      </div>
    </>
  )
}

export default ChatRoomMessage
