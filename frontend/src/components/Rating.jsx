import { FaLeaf } from 'react-icons/fa';
import '../assets/styles/Rating.css';

function Rating({ value, text, color = 'green' }) {
  const fullLeaf = <FaLeaf style={{ color }} />;
  const halfLeaf = (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <FaLeaf style={{ color: 'transparent' }} />
      <FaLeaf
        style={{
          color,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          overflow: 'hidden',
        }}
      />
    </span>
  );
  const emptyLeaf = <FaLeaf style={{ color: '#e0e0e0' }} />;

  return (
    <div className="rating">
      <span>{value >= 1 ? fullLeaf : value >= 0.5 ? halfLeaf : emptyLeaf}</span>
      <span>{value >= 2 ? fullLeaf : value >= 1.5 ? halfLeaf : emptyLeaf}</span>
      <span>{value >= 3 ? fullLeaf : value >= 2.5 ? halfLeaf : emptyLeaf}</span>
      <span>{value >= 4 ? fullLeaf : value >= 3.5 ? halfLeaf : emptyLeaf}</span>
      <span>{value >= 5 ? fullLeaf : value >= 4.5 ? halfLeaf : emptyLeaf}</span>
      {text && <span>{text}</span>}
    </div>
  );
}

export default Rating;
