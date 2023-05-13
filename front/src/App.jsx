import { useEffect, useState } from 'react'
import './App.css'
import getImagePathByCompound from './utils/getImagePathByCompound';

const App = () => {
  const [result, setResult] = useState(null);
  const [imgSrc, setImgSrc] = useState("public/assets/neutral.svg");
  const [sentence, setSentence] = useState('');

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/sentiment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sentence })
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        setResult(data);
        setImgSrc(getImagePathByCompound(result.compound))
      } catch (error) {
        console.error('Error fetching sentiment:', error);
      }
    };

    if (sentence !== '') {
      fetchSentiment();
    }
  }, [sentence]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="sentence" onChange={(e) => setSentence(e.target.value)}/>
      </form>

      {result && (
        <div>
          <p>Compound: {result.compound}</p>
          <p>Negativity: {result.neg}</p>
          <p>Positivity: {result.pos}</p>
          <p>Neutrality: {result.neu}</p>
        </div>
      )}
      <img src={imgSrc} alt="emojiface" />

    </div>
    </>
  )
}

export default App
