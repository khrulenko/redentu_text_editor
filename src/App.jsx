import TextEditor from './components/TextEditor';
import MainLayout from './components/MainLayout';
import { Button } from '@mui/material';
import { getJsonFromNodes } from './utils';

function App() {
  const additionalButton = (
    <Button
      onClick={() => {
        console.log(getJsonFromNodes());
      }}
      color="success"
    >
      Get JSON
    </Button>
  );

  return (
    <MainLayout>
      <TextEditor additionalButton={additionalButton} />
    </MainLayout>
  );
}

export default App;
