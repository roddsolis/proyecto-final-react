<<<<<<< HEAD
const StatusTag = ({ status, color }) => {
=======


const StatusTag = ({status, color}) => {

  

>>>>>>> 0ca38705425d3aae943f5d936217d88ea450ff7e
  return (
    <>
      <div className="statusWrapper">
        <div className={`statusLight ${color}`}></div>
<<<<<<< HEAD
        <p className="paragraph-m mb-0">
          <strong>{status}</strong>
        </p>
=======
        <p className='paragraph-s mb-0'><strong>{status}</strong></p> 
>>>>>>> 0ca38705425d3aae943f5d936217d88ea450ff7e
      </div>
    </>
  );
};

export default StatusTag;
