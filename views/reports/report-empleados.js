module.exports = function template (employee, atendidos) {
    let count = atendidos.length

    let rows = ''

    atendidos.map(atendido => {
        rows += `
        <tr>
            <td>${atendido.incidente.descripcion}</td>
            <td>${atendido.incidente.tipo.tipo}</td>
            <td>${atendido.incidente.estado}</td>
            <td>${atendido.createdAt}</td>
            <td>${atendido.incidente.createdAt}</td>
        </tr>
        `
    })

    const elem = `<!doctype html>
    <html>
       <head>
            <meta charset="utf-8">
            <title>PDF Result Template</title>
            <style>
                *{
                    font-family:sans-serif;
                }
                h1 {
                    color: green;
                }
                
                table {
                    table-layout: fixed;
                    width: 100%;
                    border-collapse: collapse;
                    border: 3px solid purple;
                    font-size: 14px;
                }
                
                thead th:nth-child(1) {
                    width: 30%;
                }
                
                thead th:nth-child(2) {
                    width: 20%;
                }
                
                thead th:nth-child(3) {
                    width: 19%;
                }
                
                thead th:nth-child(4) {
                    width: 35%;
                }
                
                thead th:nth-child(5) {
                    width: 35%;
                }
                
                th, td {
                    padding: 20px;
                }

                html {
                    font-family: 'helvetica neue', helvetica, arial, sans-serif;
                }
                
                thead th, tfoot th {
                    font-family: 'Rock Salt', cursive;
                }
                
                th {
                    letter-spacing: 2px;
                }
                
                td {
                    letter-spacing: 1px;
                }
                
                tbody td {
                    text-align: center;
                }
                
                tfoot th {
                    text-align: right;
                }

                tbody tr:nth-child(odd) {
                    background-color: #ff33cc;
                }
                
                tbody tr:nth-child(even) {
                    background-color: #e495e4;
                }
                  
            </style>
        </head>
        <body>
            <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
                <div style="float:left; background:floralwhite;">
                    <p><strong style="color:#ff33cc;">Reporte de:</strong> ${employee.user.nombres} ${employee.user.apellidos}</p>
                    <p><strong style="color:#ff33cc;">Correo del empleado:</strong> ${employee.user.email}</p>
                    <p><strong style="color:#ff33cc;">Cantidad de incidentes atendidos:</strong> ${count}</p>
                </div>
                <div style="float:right; background:floralwhite;">
                    <p><img src="${employee.user.url_imagen}" style="border-radius: 100%; width: 85px;" /></p>
                </div>
            </div>
            <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
                <p style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">Página {{page}} de {{pages}}</p>
            </div>
            </hr>
            <table>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Fecha de atencion</th>
                        <th>Fecha del incidente</th>
                    </tr>
                <thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </body>
    </html>`

    return elem
}
