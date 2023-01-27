const MuiPaper = {
  styleOverrides: {
    root: ({ theme: { spacing } }) => ({
      height: '500px',
      minWidth: spacing(3),

      padding: spacing(2),

      borderRadius: spacing(2),
      outline: 'none',
    }),
  },
};

export default MuiPaper;
