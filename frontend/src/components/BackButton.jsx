import { Button, Icon } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function BackButton({ nav }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      leftIcon={<ArrowBackIcon />}
      colorScheme="green"
      variant="outline"
      size="md"
      fontFamily="lato"
      _hover={{
        bg: 'green.500',
        color: 'white',
        transform: 'scale(1.05)',
        boxShadow: '0px 4px 15px rgba(0, 128, 0, 0.4)',
      }}
      _active={{
        bg: 'green.600',
        transform: 'scale(1.02)',
      }}
    >
      Go Back
    </Button>
  );
}

export default BackButton;
