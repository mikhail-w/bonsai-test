import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Paginate.css';

function Paginate({ page, pages, keyword = '', isAdmin = false }) {
  const navigate = useNavigate();

  // Extract keyword from query if necessary
  if (keyword) {
    keyword = keyword.split('?keyword=')[1]?.split('&')[0];
  }

  // Handle page click
  const handleClick = pageNumber => {
    if (isAdmin) {
      navigate(`/admin/productlist/?keyword=${keyword}&page=${pageNumber}`);
    } else {
      navigate(`?keyword=${keyword}&page=${pageNumber}`);
    }
  };

  return (
    pages > 1 && (
      <Pagination className="pg justify-content-center mt-3">
        {[...Array(pages).keys()].map(x => (
          <Pagination.Item
            className="text-decoration-none navLink m-2 "
            key={x + 1}
            active={x + 1 === page}
            onClick={() => handleClick(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
