export const fetchSentiment = async (sentence) => {
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
    return data;
  } catch (error) {
    console.error('Error fetching sentiment:', error);
    throw error;
  }
};