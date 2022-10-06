const obj = {
  Trainee: '실습생',
  Junior: '초급',
  MidLevel: '중급',
  Senior: '고급'
}


const textApi = (text) => {
  if (obj[text]) {
    return obj[text];
  }
  return '';
}

export default textApi;