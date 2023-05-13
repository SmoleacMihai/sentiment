import { useEffect, useState } from 'react'
import getImagePathByCompound from './utils/getImagePathByCompound';
import { fetchSentiment } from './fetchers/fetchSentiment';
import { useMutation } from 'react-query';
import PieChart from './components/PieChart';
import { Stack } from '@mui/material';
import getConditions from './static/getSusListArray'
import { DivWrapper, TextInput } from './components/styled/App/index.styled';

const App = () => {
  const [result, setResult] = useState(null);
  const [sentence, setSentence] = useState('');
  const [imgSrc, setImgSrc] = useState('public/assets/neutral.svg');

  const mutation = useMutation(fetchSentiment, {
    onSuccess: (data) => {
      console.log(data);
      setResult(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(()=>{
    setImgSrc(getImagePathByCompound(result?.compound));

    if (sentence === '') {
      setImgSrc("public/assets/neutral.svg")
    }

    if(getConditions(sentence).some(condition => condition)){
      setImgSrc("public/assets/sus.svg")
    }
    
  }, [sentence, result])

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSentence(value);
    mutation.mutate(value);
    
  };

  return (
    <DivWrapper>
      <TextInput type="text" name="sentence" value={sentence} onChange={handleInputChange}/>
      <Stack>
        <img src={imgSrc} alt="emojiface" />
        {result && (
          <PieChart result={result}/>
        )}
      </Stack>
    </DivWrapper>
  )
}

export default App;
