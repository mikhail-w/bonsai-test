import { Flex, Box } from '@chakra-ui/react';
import { FaLeaf } from 'react-icons/fa';

function Rating({ value, text, color = 'green' }) {
  const leafStyle = { verticalAlign: 'middle', width: '1em', height: '1em' };

  const fullLeaf = <FaLeaf style={{ color, ...leafStyle }} />;
  const halfLeaf = (
    <Box
      position="relative"
      display="inline-block"
      width="1em"
      height="1em"
      overflow="hidden"
      verticalAlign="middle"
      pb={5}
      // boxShadow={'outline'}
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
          paddingBottom: '2px',
        }}
      />
    </Box>
  );
  const emptyLeaf = <FaLeaf style={{ color: '#e0e0e0', ...leafStyle }} />;

  return (
    <Flex align="center">
      <Flex direction="row" align="center">
        <Box>{value >= 1 ? fullLeaf : value >= 0.5 ? halfLeaf : emptyLeaf}</Box>
        <Box>{value >= 2 ? fullLeaf : value >= 1.5 ? halfLeaf : emptyLeaf}</Box>
        <Box>{value >= 3 ? fullLeaf : value >= 2.5 ? halfLeaf : emptyLeaf}</Box>
        <Box>{value >= 4 ? fullLeaf : value >= 3.5 ? halfLeaf : emptyLeaf}</Box>
        <Box>{value >= 5 ? fullLeaf : value >= 4.5 ? halfLeaf : emptyLeaf}</Box>
      </Flex>
      {text && <Box ml={2}>{text}</Box>}
    </Flex>
  );
}

export default Rating;
