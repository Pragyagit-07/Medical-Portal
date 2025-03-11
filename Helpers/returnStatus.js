/*make susre always pass :code, error, res, message values and in additional to those if you want to pass more data,
just pass  object as fourth argument */

function returnStatus(res,  code, error, message, additionalData){
  return res.status(code).json({
    error: error,
  message: message,
  status: code,
  ...additionalData,

});
}
      module.exports = returnStatus;