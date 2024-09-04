import { Button, IconButton, Box, Wrap, WrapItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

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
      <Box mt={8}>
        <Wrap justify="center" spacing={4}>
          {/* Previous Button */}
          {page > 1 && (
            <WrapItem>
              <IconButton
                icon={<ArrowLeftIcon />}
                onClick={() => handleClick(page - 1)}
                aria-label="Previous page"
                colorScheme="green"
                variant="outline"
              />
            </WrapItem>
          )}

          {/* Page Numbers */}
          {[...Array(pages).keys()].map(x => (
            <WrapItem key={x + 1}>
              <Button
                size="md"
                colorScheme={x + 1 === page ? 'green' : 'gray'}
                variant={x + 1 === page ? 'solid' : 'outline'}
                onClick={() => handleClick(x + 1)}
                _hover={{ bg: 'green.500', color: 'white' }}
                borderRadius="full"
              >
                {x + 1}
              </Button>
            </WrapItem>
          ))}

          {/* Next Button */}
          {page < pages && (
            <WrapItem>
              <IconButton
                icon={<ArrowRightIcon />}
                onClick={() => handleClick(page + 1)}
                aria-label="Next page"
                colorScheme="green"
                variant="outline"
              />
            </WrapItem>
          )}
        </Wrap>
      </Box>
    )
  );
}

export default Paginate;
