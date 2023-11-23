import StatusTag from "../components/StatusTag";
const Room = () => {
  return (
    <>
    <div className="roomWrapper">
      <div className="callColumn">
        <div className="userStatusWrapper"> <StatusTag status={'Online'}/> <h4 className='subtitle-l'>Héctor Valenzuela </h4> <p className='btn-text-m mb-0'>Tutor</p> </div>
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