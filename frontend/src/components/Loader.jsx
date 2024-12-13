import { helix } from 'ldrs';
import { Flex } from '@chakra-ui/react';

helix.register();

function Loader() {
  return (
    // <div className="loader">
    <Flex justify="center" align="center" h="100%">
      <l-helix size="45" speed="2.5" color="green"></l-helix>
    </Flex>
  );
}

export default Loader;
