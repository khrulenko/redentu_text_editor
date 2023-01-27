import { Stack } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <Stack spacing={6} p={3} alignItems="center">
      <Stack width="100%" maxWidth="80%">
        {children}
      </Stack>
    </Stack>
  );
};

export default MainLayout;
