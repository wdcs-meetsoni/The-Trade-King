
const responseMapping =(code,msg)=>{
    return{
        responseCode: code,
        responseMessage: msg
    }
}

const responseMappingWithData = (code, msg, data)=> {

    return {
      responseCode: code,
      responseMessage: msg,
      responseData: data,
    };
  }

module.exports = {
    responseMapping,
    responseMappingWithData
}