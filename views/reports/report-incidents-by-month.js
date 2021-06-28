module.exports = function templateIncidentsByMonthReport (incidentes, mes) {
    let count = incidentes.length
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let rows = ''

    incidentes.map(incidente => {
        rows += `
        <tr>
            <td>${incidente.descripcion}</td>
            <td>${incidente.tipo}</td>
            <td>${incidente.gravedad}</td>
            <td>${incidente.estado}</td>
            <td>${incidente.createdAt}</td>
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
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
                <div style="float:left; background:floralwhite;">
                    <p><strong>Incidentes del mes de ${meses[mes - 1]}</strong></p>
                    <p>Cantidad de incidentes: ${count}</p>
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
                        <th>Gravedad</th>
                        <th>Estado</th>
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
