window.addEventListener('load', function () {
  let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
  //let socket = io('http://localhost:5000', { 'forceNew': true })

  socket.on('data', async function (data) {
    if (data.success == 3) { 
      console.log(data.response)
    }
  })
}, false)
