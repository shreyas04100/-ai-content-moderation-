# Datasets for Content Moderation Project

## Text Datasets

### 1. Hate Speech Detection

#### Hate Speech and Offensive Language Dataset
- **Source**: Kaggle / GitHub
- **Link**: https://www.kaggle.com/datasets/mrmorj/hate-speech-and-offensive-language-dataset
- **Size**: ~25,000 tweets
- **Labels**: Hate speech, Offensive language, Neither
- **Format**: CSV

#### Twitter Hate Speech Dataset
- **Source**: Kaggle
- **Link**: https://www.kaggle.com/datasets/arkhoshghalb/twitter-sentiment-analysis-hatred-speech
- **Size**: ~31,000 tweets
- **Labels**: Binary (hate/not hate)
- **Format**: CSV

#### Jigsaw Toxic Comment Classification
- **Source**: Kaggle Competition
- **Link**: https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge
- **Size**: ~160,000 comments
- **Labels**: Toxic, Severe toxic, Obscene, Threat, Insult, Identity hate
- **Format**: CSV

### 2. Fake News Detection

#### Fake News Dataset
- **Source**: Kaggle
- **Link**: https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset
- **Size**: ~45,000 articles
- **Labels**: Fake, Real
- **Format**: CSV
- **Features**: Title, Text, Subject, Date

#### LIAR Dataset
- **Source**: University of California
- **Link**: https://www.cs.ucsb.edu/~william/data/liar_dataset.zip
- **Size**: ~12,800 statements
- **Labels**: 6-way classification (pants-fire, false, barely-true, half-true, mostly-true, true)
- **Format**: TSV

#### FakeNewsNet
- **Source**: GitHub
- **Link**: https://github.com/KaiDMML/FakeNewsNet
- **Size**: ~23,000 news articles
- **Labels**: Fake, Real
- **Features**: Content, Social context, Spatiotemporal information

---

## Image Datasets

### 1. NSFW Content Detection

#### NSFW Dataset
- **Source**: GitHub
- **Link**: https://github.com/alex000kim/nsfw_data_scraper
- **Size**: ~60,000 images
- **Labels**: NSFW, SFW
- **Format**: Images (JPG/PNG)

#### Open NSFW Model Dataset
- **Source**: Yahoo (via GitHub)
- **Link**: https://github.com/yahoo/open_nsfw
- **Size**: ~2 million images
- **Labels**: NSFW score (0-1)

### 2. Violence Detection

#### Violence Detection Dataset
- **Source**: Kaggle
- **Link**: https://www.kaggle.com/datasets/mohamedmustafa/real-life-violence-situations-dataset
- **Size**: ~2,000 videos/images
- **Labels**: Violence, Non-violence
- **Format**: Videos/Images

#### UCF Crime Dataset
- **Source**: University of Central Florida
- **Link**: https://www.crcv.ucf.edu/projects/real-world/
- **Size**: ~1,900 videos
- **Labels**: 13 crime categories
- **Format**: Videos

### 3. Meme/Image with Text

#### Hateful Memes Dataset
- **Source**: Facebook AI
- **Link**: https://ai.facebook.com/tools/hatefulmemes/
- **Size**: ~10,000 memes
- **Labels**: Hateful, Not hateful
- **Format**: Images with JSON annotations

---

## Video Datasets

### 1. Video Content Moderation

#### YouTube-8M
- **Source**: Google Research
- **Link**: https://research.google.com/youtube8m/
- **Size**: ~8 million videos
- **Labels**: 4,800+ categories
- **Format**: Video features

#### Kinetics-400
- **Source**: DeepMind
- **Link**: https://deepmind.com/research/open-source/kinetics
- **Size**: ~400,000 videos
- **Labels**: 400 human action classes
- **Format**: Videos

---

## Audio Datasets

### 1. Hate Speech in Audio

#### Audio MNIST
- **Source**: GitHub
- **Link**: https://github.com/soerenab/AudioMNIST
- **Size**: ~30,000 audio samples
- **Format**: WAV files

---

## Dataset Organization Structure

```
data/
├── text/
│   ├── hate_speech/
│   │   ├── train.csv
│   │   ├── test.csv
│   │   └── validation.csv
│   └── fake_news/
│       ├── train.csv
│       ├── test.csv
│       └── validation.csv
├── images/
│   ├── nsfw/
│   │   ├── safe/
│   │   └── unsafe/
│   ├── violence/
│   │   ├── violent/
│   │   └── non_violent/
│   └── memes/
│       ├── hateful/
│       └── normal/
└── videos/
    ├── samples/
    └── test/
```

---

## Data Preprocessing Steps

### Text Data
1. Remove URLs, mentions, hashtags
2. Convert to lowercase
3. Remove special characters
4. Tokenization
5. Remove stop words (optional)
6. Lemmatization/Stemming

### Image Data
1. Resize to standard dimensions (224x224)
2. Normalize pixel values (0-1)
3. Data augmentation (rotation, flip, zoom)
4. Convert to RGB format

### Video Data
1. Extract frames (1 fps or 5 fps)
2. Apply image preprocessing
3. Extract audio track
4. Convert audio to text (if needed)

---

## Dataset Download Instructions

### Using Kaggle API

1. Install Kaggle API:
```bash
pip install kaggle
```

2. Setup Kaggle credentials:
- Go to Kaggle Account Settings
- Create new API token
- Place kaggle.json in ~/.kaggle/

3. Download dataset:
```bash
kaggle datasets download -d <dataset-name>
```

### Manual Download

1. Visit dataset link
2. Click "Download" button
3. Extract ZIP file
4. Place in appropriate data/ folder

---

## Data Augmentation Techniques

### Text Augmentation
- Synonym replacement
- Random insertion
- Random swap
- Random deletion
- Back translation

### Image Augmentation
- Horizontal flip
- Rotation (±15°)
- Zoom (0.8-1.2x)
- Brightness adjustment
- Contrast adjustment

---

## Ethical Considerations

1. **Privacy**: Ensure no personal information in datasets
2. **Bias**: Check for demographic biases
3. **Consent**: Use only publicly available datasets
4. **Fairness**: Balance classes in training data
5. **Transparency**: Document data sources

---

## Dataset Statistics (Example)

### Hate Speech Dataset
- Total samples: 24,783
- Hate speech: 1,430 (5.8%)
- Offensive: 19,190 (77.4%)
- Neither: 4,163 (16.8%)

### Fake News Dataset
- Total articles: 44,898
- Fake: 23,481 (52.3%)
- Real: 21,417 (47.7%)

---

## Creating Custom Datasets

If existing datasets are insufficient:

1. **Web Scraping**
   - Use BeautifulSoup, Scrapy
   - Respect robots.txt
   - Rate limiting

2. **Manual Annotation**
   - Use tools like Label Studio
   - Multiple annotators for reliability
   - Inter-annotator agreement

3. **Synthetic Data**
   - Generate variations of existing data
   - Use GPT for text generation
   - Use GANs for image generation

---

## Dataset Licensing

Always check dataset licenses:
- MIT License
- Creative Commons
- Public Domain
- Academic Use Only

---

## References

1. Davidson, T., et al. (2017). Automated Hate Speech Detection
2. Shu, K., et al. (2017). Fake News Detection on Social Media
3. Kiela, D., et al. (2020). The Hateful Memes Challenge

---

## Notes

- Start with smaller datasets for prototyping
- Use data augmentation to increase dataset size
- Maintain separate test set (never use for training)
- Document all preprocessing steps
- Keep original data unchanged
