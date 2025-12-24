// src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import LoginForm from './LoginForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginForm />
    </ThemeProvider>
  );
}

export default App;
