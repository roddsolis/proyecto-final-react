
const BigCardProcess = ({titleContent, paragraphContent}) => {
  return (
    <>
       <div className="bigCardWrapper">
          <div className="bigCardContentWrapper">
            <div className="bigCardLogoWrapper">
              <img src="/logo-metty-img.svg" alt="" />
            </div>
            <div className="bigCardInfo">
              <h1 className="subtitle-l mb-0">{titleContent}</h1>
              <p className="paragraph-m mb-0">{paragraphContent}</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default BigCardProcess

