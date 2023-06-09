from flask import Flask, request, jsonify, render_template
from sentiment_analysis import analyze_sentiment
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
  text = "This is my Python server."
  return render_template('index.html', text=text)

@app.route('/api/sentiment', methods=['POST'])
def sentiment():
  try:
    data = request.get_json()
    print(data)
    sentence = data.get('sentence')
    sentiment_scores = analyze_sentiment(sentence)
    return jsonify(sentiment_scores)
  except Exception as e:
    return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
  app.run(debug=True)
