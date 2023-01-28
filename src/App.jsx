import TextEditor from './components/TextEditor';
import MainLayout from './components/MainLayout';
import { Button, Dialog, DialogTitle } from '@mui/material';
import { getJsonFromNodes } from './utils';
import useDisclosure from './hooks/useDisclosure';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const additionalButton = (
    <Button onClick={onOpen} color="success">
      Get JSON
    </Button>
  );

  return (
    <MainLayout>
      <TextEditor additionalButton={additionalButton} />

      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          Your JSON is here {'('}you can also find it in the console{')'}:
        </DialogTitle>
        {JSON.stringify(getJsonFromNodes())}
      </Dialog>
    </MainLayout>
  );
}

export default App;
