
const Avatar = ({avatarScale, img}) => {

  return (
    <>
      <div className="avatarWrapper" style={{scale:`${avatarScale}%`}}>
        <img src={img} alt="" />
        {/* <p className='title-sm mb-0'>HV</p> */}
      </div>
    </>
  )
}

export default Avatar
