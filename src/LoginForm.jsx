import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  Divider, 
  Paper 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// 1. Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// 2. Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT0u4y34tRFgcRzthSYwipZ6Mtt0eEufI",
  authDomain: "loginpage-80b6b.firebaseapp.com",
  projectId: "loginpage-80b6b",
  storageBucket: "loginpage-80b6b.firebasestorage.app",
  messagingSenderId: "28030104862",
  appId: "1:28030104862:web:3e6cda475efd749ae1450f",
  measurementId: "G-V43TE31C7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const GradientButton = styled(Button)({
  background: 'linear-gradient(90deg, #8155ff 0%, #29d2e4 100%)',
  color: 'white',
  padding: '12px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  borderRadius: '8px',
  boxShadow: 'none',
  '&:hover': {
    opacity: 0.9,
    boxShadow: 'none',
  },
});

const ThinkGPTLogo = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState(""); 

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    alert("Form submitted successfully!");
  };

  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
     
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      
      setAccessToken(token); 
      console.log("Access Token:", token);
    } catch (err) {
      console.error("Login Error:", err.message);
      setError("Google Login failed. Please try again.");
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      bgcolor: '#f8f9fa', 
      p: 2 
    }}>
      <Paper elevation={0} sx={{ 
        width: '100%', 
        maxWidth: 500, 
        p: { xs: 4, md: 6 }, 
        bgcolor: '#ffffff', 
        border: '1px solid #eef0f2', 
        borderRadius: '12px', 
        textAlign: 'center',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.03)' 
      }}>
        
        <ThinkGPTLogo />

        <Typography variant="h4" sx={{ fontWeight: 700, mt: 3, mb: 1, color: '#111' }}>
          Welcome to ThinkGPT
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 5 }}>
          Your Gateway to Intelligent Interaction
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ textAlign: 'left' }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 700, color: '#444' }}>
            Email
          </Typography>
          <TextField
            fullWidth
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            variant="outlined"
            sx={{ 
              mb: 3, 
              '& .MuiOutlinedInput-root': { borderRadius: '8px' } 
            }}
          />
          
          <GradientButton type="submit" fullWidth variant="contained">
            Submit
          </GradientButton>

          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: '#888' }}>
            Already have an account? {' '}
            <Link href="#" underline="none" sx={{ fontWeight: 700, color: '#000' }}>Login</Link>
          </Typography>

          <Divider sx={{ my: 4, color: '#f0f0f0', fontSize: '0.8rem' }}>or continue with</Divider>

          {/* Google Login Button */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin} 
            startIcon={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18"/>}
            sx={{ 
              py: 1.5, 
              mb: 2, 
              color: '#444', 
              borderColor: '#e0e0e0', 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontWeight: 500,
              '&:hover': { borderColor: '#ccc', bgcolor: 'transparent' }
            }}
          >
            Google account
          </Button>

          {/* Display Access Token after successful login */}
          {accessToken && (
            <Box 
              sx={{ 
                mt: 2, 
                mb: 4, 
                p: 2, 
                bgcolor: '#f0f7ff', 
                borderRadius: '8px', 
                border: '1px solid #cce3ff',
                textAlign: 'left' 
              }}
            >
              <Typography 
                variant="subtitle2" 
                sx={{ fontWeight: 700, color: '#0052cc', mb: 1 }}
              >
                Access Token (Assignment Requirement):
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  wordBreak: 'break-all', 
                  fontFamily: 'monospace', 
                  fontSize: '0.75rem', 
                  color: '#333' 
                }}
              >
                {accessToken}
              </Typography>
            </Box>
          )}

          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block', 
              textAlign: 'center', 
              color: '#9ca3af', 
              lineHeight: 1.8 
            }}
          >
            By clicking "Submit", you agree to ThinkGPT's 
            <Link href="#" color="inherit" sx={{ fontWeight: 'bold', textDecoration: 'underline', mx: 0.5 }}>
              User Agreement
            </Link>, and 
            <Link href="#" color="inherit" sx={{ fontWeight: 'bold', textDecoration: 'underline', ml: 0.5 }}>
              Privacy Policy
            </Link>.
          </Typography>

        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
