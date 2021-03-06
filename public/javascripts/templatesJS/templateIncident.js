export default function template (obj, user) {
  let createdTime = moment(new Date(obj.createdAt), "YYYYMMDD").fromNow()
  let createdTimeComment = ''
  
  if (obj.comentarios.length > 0) {
    createdTimeComment = moment(new Date(obj.comentarios[obj.comentarios.length - 1].createdAt), "YYYYMMDD").fromNow()
  }

  let iconStatus = 'fa fa-check-square'
  if (obj.estado == 'NO ATENDIDO') {
    iconStatus = 'fa fa-square'
  }

  let colorGravedad = ''
  if (obj.tipo.gravedad == 'NO TAN GRAVE') {
    colorGravedad = 'bg-warning text-white'
  } else if (obj.tipo.gravedad == 'LEVES') {
    colorGravedad = 'bg-success text-white'
  } else if (obj.tipo.gravedad == 'GRAVE') {
    colorGravedad = 'bg-danger text-white'
  } else if (obj.tipo.gravedad == 'NO CATEGORIZADO') {
    colorGravedad = 'bg-secondary text-white'
  }

  let imgIncident = ''
  if (obj.adjuntos.length > 0) {
    imgIncident += `<div class="row"><div class="col-lg-12 col-md-12">
      <a href="/valle-verde/${obj.id}/incidente">
        <img style="width:100%;" src="${obj.adjuntos[0].url}">
      </a>
    </div></div>`
  }

  let comments = 'Sin comentarios'
  if (obj.comentarios.length > 0 && obj.comentarios.length < 2) {
    comments = `${obj.comentarios.length} comentario`
  } else {
    comments = `${obj.comentarios.length} comentarios`
  }

  let existComments = ''
  let noExistComments = ''

  if (obj.comentarios.length > 0) {
    existComments = `
      <div class="post_topbar">
        <div class="usy-dt">
          <img id="img-user-comment-photo-${obj.id}" src="${obj.comentarios[obj.comentarios.length - 1].residente.user.url_imagen}" width="40" height="40" alt="">
          <div class="usy-name">
            <h3><a id="username-user-comment-photo-${obj.id}" href="/perfil/usuario/${obj.comentarios[obj.comentarios.length - 1].residente.user.username}">${obj.comentarios[obj.comentarios.length - 1].residente.user.nombres} ${obj.comentarios[obj.comentarios.length - 1].residente.user.apellidos}</a></h3>
            <span><img src="images/clock.png" alt=""><span id="created-comment-photo-${obj.id}">${createdTimeComment}</span></span>
          </div>
        </div>
      </div>
      <div class="reply-area">
        <p id="description-comment-photo-${obj.id}">${obj.comentarios[obj.comentarios.length - 1].descripcion}</p>
        <span id="go_comment_incident-${obj.id}"><i class="la la-mail-reply"></i>Comentar</span>
      </div>
    `
  } else {
    noExistComments = `<a href="#!" style="float:left;" id="go_comment_incident-${obj.id}"><i class="la la-mail-reply"></i>Comentar</a>`
  }

  let elem = `<div class="post-bar animate-incident">
    <div class="post_topbar">
      <div class="usy-dt">
        <img src="${obj.residente.user.url_imagen}" width=40 height=40 alt="">
        <div class="usy-name">
          <h3><a href="/perfil/usuario/${obj.residente.user.username}">${obj.residente.user.nombres} ${obj.residente.user.apellidos}</a></h3>
          <span><img src="/images/clock.png" alt="">${createdTime}</span>
        </div>
      </div>
      <div class="ed-opts" id="opts-ed-incidents-${obj.id}" style="display:none;">
        <a href="#" title="" class="ed-opts-open" id="open-pots-incidents-${obj.id}"><i class="la la-ellipsis-v"></i></a>
        <ul class="ed-options" id="options-incident-${obj.id}">
          <li><a href="#!" id="editarInicident-${obj.id}" title="">Editar</a></li>
          <li>
            <a href="/valle-verde/incidente/${obj.id}/borrar" onclick="event.preventDefault(); (confirm('¿ ESTAS SEGURO QUE DESEAS BORRAR ESTE INCIDENTE ?')) ? document.getElementById('delete-form-${obj.id}').submit() : false;" title="">Borrar</a>
            <form id="delete-form-${obj.id}" action="/valle-verde/incidente/${obj.id}/borrar" method="POST" style="display: none;"></form>
          </li>
        </ul>
      </div>
    </div>
    <div class="epi-sec">
      <ul class="descp">
        <li><span><i class="fa fa-home"></i> Villa: ${obj.residente.villa.numero} - ${obj.residente.villa.bloque.nombre}</span></li>
        </ul>
      <ul class="descp">
        <li><span><i class="${iconStatus}"></i> ${obj.estado}</span></li>
      </ul>
    </div>
    <div class="job_descp">
      <ul class="skill-tags">
        <li><a class="${colorGravedad}" href="#">${obj.tipo.gravedad}</a></li>
        <li><a href="#">${obj.tipo.tipo}</a></li>
      </ul>

      <a href="/valle-verde/${obj.id}/incidente">
        <p id="descripcion-incident-${obj.id}">${obj.descripcion}</p>
      </a>
      <div id="descripcion-incident-elem-${obj.id}">
        <div class="col-lg-12">
          <input type="text" class="form-control" id="des-input-incident-${obj.id}" value="${obj.descripcion}">
          <br>
          <button class="btn btn-info" type="button" id="btnEdit${obj.id}">Editar</button>
          <button class="btn btn-danger" type="button" id="btnCancel${obj.id}">Cancelar</button>
        </div>
      </div>
      <br>
      ${imgIncident}
     
    </div>
    <div class="job-status-bar">
      ${noExistComments}
      <a href="/valle-verde/${obj.id}/incidente" class="com" id="comment_incident-${obj.id}"><i class="fa fa-comment-alt"></i> ${comments}</a>
    </div>

    <div class="comment-area" id="comment-area-${obj.id}">
      ${existComments}
    </div>
    
    <div class="postcomment" id="postCommentId-${obj.id}">
      <div class="row" style="position: relative; padding-top: 20px;width:100%;">
        <div class="col-md-3">
          <div class="usy-dt">
            <img src="${user.url_imagen}" width="40" height="40" alt="">
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group">
            <input type="text" class="form-control" id="inputComment-${obj.id}" placeholder="Escriba un comentario">
          </div>
        </div>
      </div>
    </div>

  </div>`

  return elem
}
