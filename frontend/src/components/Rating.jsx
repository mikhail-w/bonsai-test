import { FaLeaf } from 'react-icons/fa';
import '../assets/styles/Rating.css';

function Rating({ value, text, color = 'green', card = 'false' }) {
  console.log('Card:', card);
  const leafStyle = { verticalAlign: 'middle' };

  const fullLeaf = <FaLeaf style={{ color, ...leafStyle }} />;
  const halfLeaf = (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '1em',
        height: '1em',
        overflow: 'hidden',
        verticalAlign: 'middle',
      }}
    >
      <FaLeaf style={{ color: '#e0e0e0', ...leafStyle }} />
      <FaLeaf
        style={{
          color,
          position: 'absolute',
          top: 0,
          left: 0,
          clipPath: 'inset(0 50% 0 0)',
          height: '100%',
          width: '100%',
        }}
      />
    </span>
  );
  const emptyLeaf = <FaLeaf style={{ color: '#e0e0e0', ...leafStyle }} />;

  return (
    <>
      <div className={'rating'}>
        <span>
          {value >= 1 ? fullLeaf : value >= 0.5 ? halfLeaf : emptyLeaf}
        </span>
        <span>
          {value >= 2 ? fullLeaf : value >= 1.5 ? halfLeaf : emptyLeaf}
        </span>
        <span>
          {value >= 3 ? fullLeaf : value >= 2.5 ? halfLeaf : emptyLeaf}
        </span>
        <span>
          {value >= 4 ? fullLeaf : value >= 3.5 ? halfLeaf : emptyLeaf}
        </span>
        <span>
          {value >= 5 ? fullLeaf : value >= 4.5 ? halfLeaf : emptyLeaf}
        </span>
      </div>
      {text && <span>{text}</span>}
    </>
  );
}

export default Rating;
