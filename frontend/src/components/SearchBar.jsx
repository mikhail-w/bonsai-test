import { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/?keyword=${keyword.trim()}&page=1`);
      setKeyword('');
    } else {
      navigate(`/products`);
    }
  };

  return (
    <Box maxW={'150px'}>
      <form onSubmit={submitHandler}>
        <InputGroup size="sm">
          <Input
            fontFamily="rale"
            type="text"
            placeholder="Search plants"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            variant="filled"
            bg="gray.100" // Fixed background color
            color="black" // Fixed text color
            focusBorderColor="teal.400" // Fixed focus border color
            _placeholder={{ color: 'gray.500' }} // Placeholder color remains the same
            borderRadius="md"
            py={1} // Thinner padding (top and bottom)
            px={3} // Thinner padding (left and right)
            height="32px" // Smaller height
          />
          <InputRightElement height="32px">
            <IconButton
              type="submit"
              aria-label="Search"
              icon={<SearchIcon />}
              color="black" // Fixed icon color
              bg="gray.100" // Fixed background color
              _hover={{ bg: 'gray.200' }} // Fixed hover color
              _active={{ bg: 'gray.300' }} // Fixed active color
              variant="ghost"
              size="sm"
              onClick={submitHandler}
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
}

export default SearchBar;
