import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

function Message({ variant, children }) {
  return (
    <Alert
      status={
        variant == 'danger' ? 'error' : variant == 'info' ? 'info' : 'success'
      }
    >
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
      {/* <AlertDescription>
        Your Chakra experience may be degraded.
      </AlertDescription> */}
    </Alert>
  );
}

export default Message;
