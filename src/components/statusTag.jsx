

const StatusTag = (props) => {



  return (
    <>
      <div className="statusWrapper">
        <div className="statusLight"></div>
        <p className='paragraph-m mb-0'><strong>{props.status}</strong></p> 
      </div>
    </>
  )
}

export default StatusTag
