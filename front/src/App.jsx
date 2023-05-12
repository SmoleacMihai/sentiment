import { useEffect, useState } from 'react'
import './App.css'



function App() {
  const [result, setResult] = useState(null);
  const [sentence, setSentence] = useState('');

  useEffect(() => {
    const analyzeSentiment = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/sentiment`, {
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
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
      }
    };

    if (sentence !== '') {
      analyzeSentiment();
    }
  }, [sentence]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const sentence = e.target.elements.sentence.value;
    setSentence(sentence);
  };
  console.log(result);

  return (
    <>
      <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="sentence" />
        <button type="submit">Analyze</button>
      </form>

      {result && (
        <div>
          <p>Compound: {result.compound}</p>
          <p>Negativity: {result.neg}</p>
          <p>Positivity: {result.pos}</p>
          <p>Neutrality: {result.neu}</p>
        </div>
      )}
    </div>
    </>
  )
}

export default App
