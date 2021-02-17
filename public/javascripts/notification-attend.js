let countNotify = document.querySelector('#count_notify')
let blockNotify = document.querySelector('#block-notify')

const getUserAuth = async function () {
  let url = '/valle-verde/api/auth/user'
  const data = await fetch(url)
  const user = data.json()
  return user
}

window.addEventListener('load', function () {
  let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
  //let socket = io('http://localhost:5000', { 'forceNew': true })

  socket.on('data', async function (data) {
    const user = await getUserAuth()

    if (data.success == 2 && data.response.incidente.residente_id == user.residente.id) {
      
      // Notificación
      countNotify.classList.remove('d-none')
      countNotify.textContent = parseInt(countNotify.textContent) + 1

      $('.nott-list').prepend(`
        <div class="notfication-details">
            <div class="noty-user-img">
                <img src="${data.response.empleado.user.url_imagen}" alt="">
            </div>
            <div class="notification-info">
                <h3><a href="/valle-verde/${data.response.incidente_id}/incidente" title="">${data.response.empleado.user.nombres} ${data.response.empleado.user.apellidos}</a> ${data.response.incidente.descripcion.substr(0, 34)}.</h3>
                <br>
                <span>${moment(new Date(data.response.createdAt), "YYYYMMDD").fromNow()}</span>
            </div>
        </div>
      `)
    }
  })
}, false)

blockNotify.addEventListener('click', function () {
  countNotify.classList.add('d-none')
  countNotify.textContent = 0
})
