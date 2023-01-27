const MuiButton = {
  defaultProps: {
    variant: 'contained',
  },
  styleOverrides: {
    root: ({ theme: { spacing } }) => ({
      minWidth: spacing(3),

      borderRadius: spacing(2),
    }),
  },
};

export default MuiButton;
