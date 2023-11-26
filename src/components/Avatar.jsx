
const Avatar = ({avatarSize, img, chatImgScale}) => {

  

  return (
    <>
      <div className="avatarWrapper" style={{width:`${avatarSize}px`, height:`${avatarSize}px`}}>
        <img src={img} style={{scale:`${chatImgScale}%`}} />
        {/* <p className='title-sm mb-0'>HV</p> */}
      </div>
    </>
  )
}

export default Avatar
