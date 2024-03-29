export default function template (obj) {
	let createdTime = moment(new Date(obj.createdAt), "YYYYMMDD").fromNow()

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

	let elem = `<div class="post-bar animate-incident">
		<div class="post_topbar">
		<div class="usy-dt">
			<img src="${obj.residente.user.url_imagen}" width=40 height=40 alt="">
			<div class="usy-name">
			<h3>Publicado por: <a href="/perfil/usuario/${obj.residente.user.username}">${obj.residente.user.nombres} ${obj.residente.user.apellidos}</a></h3>
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
			<li><a class="${colorGravedad}" href="/valle-verde/${obj.id}/incidente">${obj.tipo.gravedad}</a></li>
			<li><a href="#">${obj.tipo.tipo}</a></li>
		</ul>

		<a href="/valle-verde/${obj.id}/incidente">
			<p id="descripcion-incident-${obj.id}">${obj.descripcion}</p>
		</a>
		<br>

		${imgIncident}

		</div>
		
	</div>`

	return elem
}
