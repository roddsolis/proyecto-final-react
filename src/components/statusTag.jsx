const StatusTag = ({ status, color }) => {
  return (
    <>
      <div className="statusWrapper">
        <div className={`statusLight ${color}`}></div>
        <p className="paragraph-s mb-0">
          <strong>{status}</strong>
        </p>
      </div>
    </>
  );
};

export default StatusTag;
