const Row = ({ label, children }) => (
  <div className="Row">
    <p className="Row-label">{label}</p>
    {children}
  </div>
);

export default Row;
