import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listPlantProducts } from '../actions/productActions';
import { SimpleGrid, Center } from '@chakra-ui/react';

function PlantsPage() {
  const dispatch = useDispatch();
  const productPlants = useSelector(state => state.productPlants);
  const { error, loading, products, page, pages } = productPlants;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listPlantProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Center
        flexDirection={'column'}
        marginTop={50}
        marginBottom={50}
        minH={'80vh'}
        justifyContent={'space-between'}
      >
        <h1 className="title">Latest Plants</h1>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }} // Responsive column layout
          spacing="10px"
          width="100%"
          px={5} // Padding to add spacing on small screens
        >
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant={'danger'}>{error}</Message>
          ) : (
            products.map(product => (
              <Product key={product._id} product={product} />
            ))
          )}
        </SimpleGrid>
        <Paginate page={page} pages={pages} keyword={keyword} />
      </Center>
    </>
  );
}

export default PlantsPage;
