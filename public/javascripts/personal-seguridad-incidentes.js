const getIncidents = async function () {
  let url = '/valle-verde/api/incidentes/employee'
  const data = await fetch(url)
  const incidentes = data.json()
  return incidentes
}

window.addEventListener('load', function () {
  getIncidents()
    .then(res => {
      console.log(res)
    })

  //let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
  let socket = io('http://localhost:5000', { 'forceNew': true })

  socket.on('data', async function (data) {
    if (data.success == 1) {
      console.log(data.response)
    }
  })
})
