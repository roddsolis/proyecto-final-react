
const Avatar = ({avatarSize, img}) => {

  

  return (
    <>
      <div className="avatarWrapper" style={{width:`${avatarSize}px`, height:`${avatarSize}px`}}>
        <img src={img} alt="" />
        {/* <p className='title-sm mb-0'>HV</p> */}
      </div>
    </>
  )
}

export default Avatar
