
const UserMessage = ({message, align}) => {
  return (
    <>
      <div className={`messageContainer ${align}`}>
        <div className="message">{message}</div>
        </div>
    </>
  )
}

export default UserMessage
