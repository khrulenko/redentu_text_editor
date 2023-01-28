const MuiPaper = {
  styleOverrides: {
    root: ({ theme: { spacing } }) => ({
      minHeight: '60vh',
      minWidth: spacing(3),

      padding: spacing(2),

      borderRadius: spacing(2),
      outline: 'none',
    }),
  },
};

export default MuiPaper;
