import templateIncident from './templatesJS/templateIncident.js'
import createIncident from './create-incident.js'

const getIncidents = async function () {
  let url = '/valle-verde/api/incidentes'
  const data = await fetch(url)
  const incidentes = data.json()
  return incidentes
}

const getUserAuth = async function () {
  let url = '/valle-verde/api/auth/user'
  const data = await fetch(url)
  const user = data.json()
  return user
}

const updateIncident = async function (id, body) {
  let url = `/valle-verde/api/${id}/incidentes`
  const data = await fetch(url, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const incidente = data.json()
  return incidente
}

const createComment = async function (id, body) {
  let url = `/valle-verde/api/comment/${id}/incident`
  const data = await fetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const comment = data.json()
  return comment
}

const _incidentsFeed = function (data, user) {
  let postIncident = $('#post-incident')
  postIncident.innerHTML = ''

  data.map(incident  => {
    postIncident.append(templateIncident(incident, user))

    $(`#open-pots-incidents-${incident.id}`).on("click", function(){
      $(this).next(`#options-incident-${incident.id}`).toggleClass("active");
      return false;
    })

    if(user.id == incident.residente.user.id) {
      document.querySelector(`#opts-ed-incidents-${incident.id}`).style.display = 'block'
    }

    $(`#descripcion-incident-elem-${incident.id}`).hide()

    document.querySelector(`#editarInicident-${incident.id}`).addEventListener('click', function () {
      $(`#descripcion-incident-elem-${incident.id}`).show(300)
      $(`#descripcion-incident-${incident.id}`).hide(300)
    })

    document.querySelector(`#btnEdit${incident.id}`).addEventListener('click', function () {
      let input = document.querySelector(`#des-input-incident-${incident.id}`)
      let body = { descripcion: input.value }
      
      updateIncident(incident.id, body)
        .then(response => {
          $(`#descripcion-incident-elem-${incident.id}`).hide(300)
          $(`#descripcion-incident-${incident.id}`).show(300)
          document.querySelector(`#descripcion-incident-${incident.id}`).textContent = body.descripcion
          document.querySelector(`#des-input-incident-${incident.id}`).value = body.descripcion
        })
    })

    document.querySelector(`#btnCancel${incident.id}`).addEventListener('click', function () {
      $(`#descripcion-incident-elem-${incident.id}`).hide(300)
      $(`#descripcion-incident-${incident.id}`).show(300)
    })

    $(`#postCommentId-${incident.id}`).hide()
    document.querySelector(`#go_comment_incident-${incident.id}`).addEventListener('click', function () {
      $(`#postCommentId-${incident.id}`).show(300)
    })

    let inputComment = document.querySelector(`#inputComment-${incident.id}`)
    inputComment.addEventListener('keypress', function (e) {
      if (e.key === 'Enter' && inputComment.value != undefined && inputComment.value != '') {
        createComment(incident.id, { descripcion: inputComment.value })
          .then(response => {
            if (incident.comentarios.length > 0) {
              document.querySelector(`#img-user-comment-photo-${incident.id}`).src = response.residente.user.url_imagen
              document.querySelector(`#username-user-comment-photo-${incident.id}`).href = `/perfil/usuario/${response.residente.user.username}`
              document.querySelector(`#username-user-comment-photo-${incident.id}`).textContent = `${response.residente.user.nombres} ${response.residente.user.apellidos}`
              document.querySelector(`#created-comment-photo-${incident.id}`).textContent = moment(new Date(response.createdAt), "YYYYMMDD").fromNow()
              document.querySelector(`#description-comment-photo-${incident.id}`).textContent = response.descripcion
            } else {
              $(`#go_comment_incident-${incident.id}`).hide(300)
              $(`#comment-area-${incident.id}`).append(`
                <div class="post_topbar">
                  <div class="usy-dt">
                    <img id="img-user-comment-photo-${incident.id}" src="${response.residente.user.url_imagen}" width="40" height="40" alt="">
                    <div class="usy-name">
                      <h3><a id="username-user-comment-photo-${incident.id}" href="/perfil/usuario/${response.residente.user.username}">${response.residente.user.nombres} ${response.residente.user.apellidos}</a></h3>
                      <span><img src="images/clock.png" alt=""><span id="created-comment-photo-${incident.id}">${moment(new Date(response.createdAt), "YYYYMMDD").fromNow()}</span></span>
                    </div>
                  </div>
                </div>
                <div class="reply-area">
                  <p id="description-comment-photo-${incident.id}">${response.descripcion}</p>
                  <span id="go_comment_incident-${incident.id}"><i class="la la-mail-reply"></i>Comentar</span>
                </div>
              `)
            }

            inputComment.value = ''
          })
      }
    })
  })
}

const drawIncidents = async function (data) {
  const user = await getUserAuth()

  _incidentsFeed(data, user)
}

window.addEventListener('load', function () {
  $('#pelaje_animal_perdido').tagEditor({
    placeholder: 'Agregue descripciones del pelaje del animal y de enter'
  })
  
  $('#raza_animal_perdido').tagEditor({
    placeholder: 'Agregue la raza del animal'
  })
  
  $('#des_sospechoso').tagEditor({
    placeholder: 'Describa al sospechoso y de enter'
  })
  
  $('#pertenencias_hurtadas').tagEditor({
    placeholder: 'Agregue las pertenencias hurtadas y de enter'
  })

  getIncidents()
    .then(res => {
      drawIncidents(res).then(response => response)
    })

  let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
  //let socket = io('http://localhost:5000', { 'forceNew': true })
  socket.on('data', async function (data) {
    if (data.success == 1) {
      let postIncident = $('#post-incident')
      const user = await getUserAuth()

      postIncident.prepend(templateIncident(data.response, user))
      
      if(user.id == data.response.residente.user.id) {
        document.querySelector(`#opts-ed-incidents-${data.response.id}`).style.display = 'block'
      }

      $(`#open-pots-incidents-${data.response.id}`).on("click", function() {
        $(this).next(`#options-incident-${data.response.id}`).toggleClass("active");
        return false;
      })

      $(`#descripcion-incident-elem-${data.response.id}`).hide()
      
      document.querySelector(`#editarInicident-${data.response.id}`).addEventListener('click', function () {
        $(`#descripcion-incident-elem-${data.response.id}`).show(300)
        $(`#descripcion-incident-${data.response.id}`).hide(300)
      })

      document.querySelector(`#btnEdit${data.response.id}`).addEventListener('click', function () {
        let input = document.querySelector(`#des-input-incident-${data.response.id}`)
        let body = { descripcion: input.value }
        updateIncident(data.response.id, body)
          .then(response => {
            $(`#descripcion-incident-elem-${data.response.id}`).hide(300)
            $(`#descripcion-incident-${data.response.id}`).show(300)
            document.querySelector(`#descripcion-incident-${data.response.id}`).textContent = body.descripcion
            document.querySelector(`#des-input-incident-${data.response.id}`).value = body.descripcion
        })
      })

      document.querySelector(`#btnCancel${data.response.id}`).addEventListener('click', function () {
        $(`#descripcion-incident-elem-${data.response.id}`).hide(300)
        $(`#descripcion-incident-${data.response.id}`).show(300)
      })

      $(`#postCommentId-${data.response.id}`).hide()

      document.querySelector(`#go_comment_incident-${data.response.id}`).addEventListener('click', function () {
        $(`#postCommentId-${data.response.id}`).show(300)
      })

      let inputComment = document.querySelector(`#inputComment-${data.response.id}`)
      inputComment.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && inputComment.value != undefined && inputComment.value != '') { 
          createComment(data.response.id, { descripcion: inputComment.value })
          .then(response => {
            if (data.response.comentarios.length > 0) {
              document.querySelector(`#img-user-comment-photo-${data.response.id}`).src = response.residente.user.url_imagen
              document.querySelector(`#username-user-comment-photo-${data.response.id}`).href = `/perfil/usuario/${response.residente.user.username}`
              document.querySelector(`#username-user-comment-photo-${data.response.id}`).textContent = `${response.residente.user.nombres} ${response.residente.user.apellidos}`
              document.querySelector(`#created-comment-photo-${data.response.id}`).textContent = moment(new Date(response.createdAt), "YYYYMMDD").fromNow()
              document.querySelector(`#description-comment-photo-${data.response.id}`).textContent = response.descripcion
            } else {
              $(`#go_comment_incident-${data.response.id}`).hide(300)
              $(`#comment-area-${data.response.id}`).append(`
                <div class="post_topbar">
                  <div class="usy-dt">
                    <img id="img-user-comment-photo-${data.response.id}" src="${response.residente.user.url_imagen}" width="40" height="40" alt="">
                    <div class="usy-name">
                      <h3><a id="username-user-comment-photo-${data.response.id}" href="/perfil/usuario/${response.residente.user.username}">${response.residente.user.nombres} ${response.residente.user.apellidos}</a></h3>
                      <span><img src="images/clock.png" alt=""><span id="created-comment-photo-${data.response.id}">${moment(new Date(response.createdAt), "YYYYMMDD").fromNow()}</span></span>
                    </div>
                  </div>
                </div>
                <div class="reply-area">
                  <p id="description-comment-photo-${data.response.id}">${response.descripcion}</p>
                  <span id="go_comment_incident-${data.response.id}"><i class="la la-mail-reply"></i>Comentar</span>
                </div>
              `)
            }

            inputComment.value = ''
          })
        }
      })
    }
  })

  createIncident()
}, false)
