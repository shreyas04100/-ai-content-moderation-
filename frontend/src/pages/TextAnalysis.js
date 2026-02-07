import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
  Fade,
  Grow,
} from '@mui/material';
import { ArrowBack, Send, CheckCircle, Warning } from '@mui/icons-material';
import { analyzeText } from '../services/api';

function TextAnalysis() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await analyzeText(text);
      setResult(response);
    } catch (err) {
      setError(err.error || 'Failed to analyze text');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'success';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Text Analysis - Hate Speech Detection
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Analyze Text for Hate Speech
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Enter text to check for hate speech, toxic content, and offensive language.
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Enter text to analyze..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={loading ? null : <Send />}
            onClick={handleAnalyze}
            disabled={loading}
            sx={{
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              boxShadow: '0 3px 5px 2px rgba(102, 126, 234, .3)',
              transition: 'all 0.3s',
              '&:hover': {
                background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 10px 4px rgba(102, 126, 234, .3)',
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={24} sx={{ color: 'white' }} />
                <Typography>Analyzing...</Typography>
              </Box>
            ) : (
              'Analyze Text'
            )}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && result.hate_speech && (
            <Fade in={true} timeout={800}>
              <Paper 
                elevation={6} 
                sx={{ 
                  mt: 3, 
                  p: 3,
                  background: result.hate_speech.is_hate_speech 
                    ? 'linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)'
                    : 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                  border: result.hate_speech.is_hate_speech ? '2px solid #f44336' : '2px solid #4caf50',
                  animation: result.hate_speech.is_hate_speech ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.4)' },
                    '50%': { boxShadow: '0 0 20px 10px rgba(244, 67, 54, 0)' },
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {result.hate_speech.is_hate_speech ? (
                    <Warning sx={{ fontSize: 40, color: '#f44336', mr: 2 }} />
                  ) : (
                    <CheckCircle sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                  )}
                  <Typography variant="h5" fontWeight="bold">
                    Analysis Results
                  </Typography>
                </Box>

                <Grow in={true} timeout={1000}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Status
                    </Typography>
                    <Chip
                      label={
                        result.hate_speech.is_hate_speech
                          ? '⚠️ Hate Speech Detected'
                          : '✅ Content is Safe'
                      }
                      color={result.hate_speech.is_hate_speech ? 'error' : 'success'}
                      size="large"
                      sx={{ fontSize: '1.1rem', py: 2.5, fontWeight: 'bold' }}
                    />
                  </Box>
                </Grow>

                <Grow in={true} timeout={1200}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Confidence Score
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={result.hate_speech.confidence * 100}
                          sx={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 6,
                              background: result.hate_speech.is_hate_speech
                                ? 'linear-gradient(90deg, #ff6b6b 0%, #ee5a6f 100%)'
                                : 'linear-gradient(90deg, #51cf66 0%, #37b24d 100%)',
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 60 }}>
                        {(result.hate_speech.confidence * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                </Grow>

                <Grow in={true} timeout={1400}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Category
                    </Typography>
                    <Chip
                      label={result.hate_speech.category.toUpperCase()}
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: '0.95rem', fontWeight: 'bold' }}
                    />
                  </Box>
                </Grow>

                {result.hate_speech.keywords_found && result.hate_speech.keywords_found.length > 0 && (
                  <Grow in={true} timeout={1600}>
                    <Box sx={{ 
                      mb: 2, 
                      p: 2, 
                      backgroundColor: 'rgba(244, 67, 54, 0.1)', 
                      borderRadius: 2,
                      border: '1px solid rgba(244, 67, 54, 0.3)'
                    }}>
                      <Typography variant="body2" color="error" fontWeight="bold" gutterBottom>
                        🚨 Hate Keywords Detected
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {result.hate_speech.keywords_found.map((keyword, index) => (
                          <Chip
                            key={index}
                            label={keyword}
                            color="error"
                            size="small"
                            sx={{ 
                              fontWeight: 'bold',
                              animation: 'bounce 1s ease-in-out',
                              animationDelay: `${index * 0.1}s`,
                              '@keyframes bounce': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-5px)' },
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grow>
                )}
              </Paper>
            </Fade>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default TextAnalysis;
