import axios from 'axios'
const APICall = async (url: string, method: string, data?: {}) => {

  let headerData = {}

  const result = await axios(`${url}`, {
    method,
    headers: headerData,
    data,
  })
  console.log('APIrestul',result);
  const response = await result.data
  console.log('APIresponse',response);
  if (!response) {
    throw new Error(JSON.stringify(response))
  }
  console.log('APIresponse22222',response);
  return response
}
export default APICall