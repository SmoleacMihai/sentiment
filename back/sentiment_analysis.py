import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

sid = SentimentIntensityAnalyzer()
nltk.download('vader_lexicon')

def analyze_sentiment(sentence):
  sentiment_scores = sid.polarity_scores(sentence)
  return sentiment_scores
