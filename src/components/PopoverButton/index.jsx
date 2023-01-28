import { useState } from 'react';
import { Button, Popover } from '@mui/material';
import useDisclosure from '../../hooks/useDisclosure';

const PopoverButton = ({ name, children, disabled }) => {
  const [anchorEl, setAnchorEl] = useState();
  const [color, colorSet] = useState();

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        onClick={(e) => {
          setAnchorEl(e.target);
          onOpen();
        }}
        disabled={disabled}
      >
        {name}
      </Button>

      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default PopoverButton;
