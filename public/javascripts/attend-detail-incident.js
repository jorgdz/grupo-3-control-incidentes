const goAttend = async (id) => {
  let url = `/valle-verde/api/${id}/incidentes/attention`
  const data = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const attend = data.json()
  return attend
}

const attend = function (id) {
  goAttend (id)
    .then(response => {
      let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
      //let socket = io('http://localhost:5000', { 'forceNew': true })
      socket.on('connect', async function () {
        socket.emit('data', {
          success: '2',
          response: response
        })
      })
      socket.on('disconnect', function () {})

      $('#attend-incident').hide(300)
    })
}

document.querySelector('#attend-incident').addEventListener('click', function () {
  let id = window.location.pathname.split('/')[2]
  attend(id)
  
  document.querySelectorAll('.go-attend').forEach(elem => {
    elem.textContent = 'ATENDIENDOSE'
  })

  alert('ATENDIÉNDOSE')
})
