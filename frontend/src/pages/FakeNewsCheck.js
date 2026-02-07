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
import { ArrowBack, CheckCircle, Cancel, Warning } from '@mui/icons-material';
import { checkFakeNews } from '../services/api';

function FakeNewsCheck() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!title.trim() && !content.trim()) {
      setError('Please enter at least a title or content');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await checkFakeNews(title, content);
      setResult(response.result);
    } catch (err) {
      setError(err.error || 'Failed to check fake news');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'highly_likely_fake':
        return 'error';
      case 'likely_fake':
        return 'warning';
      case 'uncertain':
        return 'info';
      case 'likely_real':
        return 'success';
      default:
        return 'default';
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
            Fake News Detection
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Check News Authenticity
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Enter news title and content to verify its authenticity and detect misinformation.
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="News Title"
            placeholder="Enter news headline..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            label="News Content"
            placeholder="Enter news article content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={loading ? null : <CheckCircle />}
            onClick={handleCheck}
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
                <Typography>Checking Authenticity...</Typography>
              </Box>
            ) : (
              'Check Authenticity'
            )}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Fade in={true} timeout={800}>
              <Paper 
                elevation={6} 
                sx={{ 
                  mt: 3, 
                  p: 3,
                  background: result.is_fake
                    ? 'linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)'
                    : 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                  border: result.is_fake ? '2px solid #f44336' : '2px solid #4caf50',
                  animation: result.is_fake ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.4)' },
                    '50%': { boxShadow: '0 0 20px 10px rgba(244, 67, 54, 0)' },
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {result.is_fake ? (
                    <Cancel sx={{ fontSize: 40, color: '#f44336', mr: 2 }} />
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
                      Verdict
                    </Typography>
                    <Chip
                      label={result.is_fake ? '🚫 Likely Fake News' : '✅ Appears Credible'}
                      color={result.is_fake ? 'error' : 'success'}
                      size="large"
                      sx={{ fontSize: '1.1rem', py: 2.5, fontWeight: 'bold' }}
                    />
                  </Box>
                </Grow>

                <Grow in={true} timeout={1200}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Fake News Probability
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={result.confidence * 100}
                          sx={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 6,
                              background: result.is_fake
                                ? 'linear-gradient(90deg, #ff6b6b 0%, #ee5a6f 100%)'
                                : 'linear-gradient(90deg, #51cf66 0%, #37b24d 100%)',
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 60 }}>
                        {(result.confidence * 100).toFixed(0)}%
                      </Typography>
                    </Box>
                  </Box>
                </Grow>

                <Grow in={true} timeout={1400}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Chip
                      label={result.category.replace(/_/g, ' ').toUpperCase()}
                      color={getCategoryColor(result.category)}
                      variant="outlined"
                      sx={{ mt: 1, fontWeight: 'bold' }}
                    />
                  </Box>
                </Grow>

                <Grow in={true} timeout={1600}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Credibility Score
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {(result.credibility_score * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Grow>

                <Grow in={true} timeout={1800}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Clickbait Indicators Found
                    </Typography>
                    <Chip 
                      label={result.clickbait_indicators}
                      color={result.clickbait_indicators > 2 ? 'error' : 'default'}
                      sx={{ mt: 1, fontSize: '1.2rem', fontWeight: 'bold' }}
                    />
                  </Box>
                </Grow>

                <Grow in={true} timeout={2000}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Recommendation
                    </Typography>
                    <Alert 
                      severity={result.is_fake ? 'warning' : 'info'} 
                      sx={{ 
                        mt: 1,
                        fontWeight: 'bold',
                        '& .MuiAlert-icon': { fontSize: 28 }
                      }}
                    >
                      {result.recommendation}
                    </Alert>
                  </Box>
                </Grow>

                {result.details && (
                  <Grow in={true} timeout={2200}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(102, 126, 234, 0.1)', 
                      borderRadius: 2,
                      border: '1px solid rgba(102, 126, 234, 0.3)'
                    }}>
                      <Typography variant="body2" color="primary" fontWeight="bold" gutterBottom>
                        📊 Analysis Details
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        • {result.details.title_analysis}
                      </Typography>
                      <Typography variant="body2">
                        • Content credibility: {result.details.content_credibility}
                      </Typography>
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

export default FakeNewsCheck;
