import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Card,
  CardMedia,
} from '@mui/material';
import { ArrowBack, CloudUpload } from '@mui/icons-material';
import { analyzeImage } from '../services/api';

function ImageAnalysis() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await analyzeImage(selectedFile);
      setResult(response.result);
    } catch (err) {
      setError(err.error || 'Failed to analyze image');
    } finally {
      setLoading(false);
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
            Image Analysis - Harmful Content Detection
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Analyze Image for Harmful Content
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Upload an image to check for violence, hate speech in text, and other harmful content.
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleFileSelect}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUpload />}
                size="large"
              >
                Select Image
              </Button>
            </label>
          </Box>

          {preview && (
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="300"
                image={preview}
                alt="Preview"
                sx={{ objectFit: 'contain' }}
              />
            </Card>
          )}

          {selectedFile && (
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze Image'}
            </Button>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Paper elevation={2} sx={{ mt: 3, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Analysis Results
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={result.is_safe ? 'Image is Safe' : 'Harmful Content Detected'}
                  color={result.is_safe ? 'success' : 'error'}
                  sx={{ mt: 1 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Confidence Score
                </Typography>
                <Typography variant="h6">
                  {(result.confidence * 100).toFixed(1)}%
                </Typography>
              </Box>

              {result.extracted_text && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Extracted Text
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {result.extracted_text}
                  </Typography>
                </Box>
              )}

              {result.violence_score > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Violence Score
                  </Typography>
                  <Typography variant="h6">
                    {(result.violence_score * 100).toFixed(1)}%
                  </Typography>
                </Box>
              )}

              {result.face_count > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Faces Detected
                  </Typography>
                  <Typography variant="h6">{result.face_count}</Typography>
                </Box>
              )}

              {result.warnings && result.warnings.length > 0 && (
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Warnings
                  </Typography>
                  {result.warnings.map((warning, index) => (
                    <Chip
                      key={index}
                      label={warning}
                      color={result.is_safe ? 'info' : 'warning'}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              )}
            </Paper>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default ImageAnalysis;
