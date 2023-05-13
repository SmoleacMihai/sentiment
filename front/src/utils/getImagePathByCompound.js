const imgPaths = {
  happy: "public/assets/happy.svg",
  semiHappy: "public/assets/semiHappy.svg",
  neutral: "public/assets/neutral.svg",
  sad: "public/assets/myface.svg",
  verySad: "public/assets/myfaceathome.svg",
}

const getImagePathByCompound = (compound) => {
  if (compound >= 0.5 && compound <= 1) {
    return imgPaths.happy;
  } else if (compound > 0.2 && compound < 0.5) {
    return imgPaths.semiHappy;
  } else if (compound >= -0.2 && compound <= 0.2) {
    return imgPaths.neutral;
  } else if (compound > -0.5 && compound < -0.2) {
    return imgPaths.sad;
  } else if (compound >= -1 && compound <= -0.5) {
    return imgPaths.verySad;
  }
  
  return imgPaths.neutral;
};

export default getImagePathByCompound;