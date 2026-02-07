import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  TextFields,
  Image,
  NewspaperOutlined,
  Shield,
} from '@mui/icons-material';

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Text Analysis',
      description: 'Detect hate speech and toxic content in text',
      icon: <TextFields sx={{ fontSize: 60, color: '#1976d2' }} />,
      path: '/text-analysis',
    },
    {
      title: 'Fake News Detection',
      description: 'Verify news authenticity and detect misinformation',
      icon: <NewspaperOutlined sx={{ fontSize: 60, color: '#1976d2' }} />,
      path: '/fake-news',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Shield sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Content Moderation Platform
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="white">
            Content Moderation Platform
          </Typography>
          <Typography variant="h5" color="white" paragraph>
            AI-Powered Detection of Fake News and Hate Speech
          </Typography>
          <Typography variant="body1" color="white" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Our intelligent platform uses advanced Natural Language Processing and Computer Vision
            to detect harmful content, fake news, and hate speech across text and images.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={5} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box mb={2}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => navigate(feature.path)}
                  >
                    Try Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={8} textAlign="center" color="white">
          <Typography variant="h4" gutterBottom>
            Why Choose Our Platform?
          </Typography>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Real-Time</Typography>
              <Typography>Instant Results</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Accurate</Typography>
              <Typography>AI-Powered Detection</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Secure</Typography>
              <Typography>Privacy Protected</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" fontWeight="bold" gutterBottom>
          VTU Major Project
        </Typography>
        <Typography variant="body2">
          BY - SAMARTH SS (1CR23CS160) | SHREYAS S (1CR23CS183) | SHRINIDHI (1CR23CS184)
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
