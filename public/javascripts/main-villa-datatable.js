$(document).ready(function() {
  $('#villas-table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: "/villas/api/all",
    },
    columns: [
      { data : "id" },
      { data : "bloque.nombre" },
      { data : "numero" },
      { data : "referencia" },
      { data : "direccion" },
      {
        data: "id",
        title: "Editar",
        render:function (data, type, row) {
          return `<a href="/villas/${data}/editar" class="btn btn-info"><i class="fa fa-pencil"></i></a>`;
        },
      },
      { 
        data: "id",
        title: "Borrar", 
        render:function (data, type, row) {
          return `<a href="/villas/${data}/borrar" onclick="event.preventDefault(); (confirm('¿ ESTAS SEGURO QUE DESEAS ELIMINAR ESTA VILLA ?')) ? document.getElementById('delete-form-${data}').submit() : false;" class="btn btn-danger"><i class="fa fa-trash"></i></a>
          <form id="delete-form-${data}" action="/villas/${data}/borrar" method="POST" style="display: none;"></form>`;
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
