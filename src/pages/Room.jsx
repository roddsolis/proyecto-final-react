
const Room = () => {
  return (
    <>
    <div className="roomWrapper">
      <div className="callColumn">
        <div className="statusWrapper">status + name </div>
        <div className="videoWrapper">video</div>
      </div>
      <div className="chatColumn">
        <div className="chatWrapper">
          <div className="heaWrapper">head</div>
          <div className="mainWrapper">main</div>
          <div className="actionsWrapper">send</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Room