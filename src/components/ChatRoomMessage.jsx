import UserMessage from './UserMessage'
import UserMessageHead from './UserMessageHead'
const ChatRoomMessage = (  {img, avatarSize,message}  ) => {
  return (
    <>
      <div className="messageWrapper">
        <UserMessageHead img={img} avatarSize={avatarSize}/>
        <UserMessage message={message}/>
      </div>
    </>
  )
}

export default ChatRoomMessage
