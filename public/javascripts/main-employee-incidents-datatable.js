$(document).ready(function() {
  $('#atentions-table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: "/incidentes-atendidos/api/all",
    },
    columns: [
      { data : "id" },
      { data : "incidente.descripcion" },
      { data : "incidente.tipo.tipo" },
      { data : "incidente.tipo.gravedad" },
      { data : "incidente.estado" },
      {
        data: "incidente.id",
        title: "Ver",
        render:function (data, type, row) {
          return `<a href="/valle-verde/${data}/incidente" class="btn btn-info"><i class="fa fa-eye"></i></a>`;
        },
      }
   ],
   order: [[ 0, 'desc' ]],
    "language": {
      "sLengthMenu":     "Mostrar _MENU_ registros",
      "sZeroRecords":    "No se encontraron resultados",
      "sEmptyTable":     "Ningún dato disponible en esta tabla =(",
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix":    "",
      "sSearch":         "Buscar:",
      "sUrl":            "",
      "sInfoThousands":  ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
      }
    }
  })
})
