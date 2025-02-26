let session = pl.create(1000);

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const program = e.target.result;
        console.log(program);
        session.consult(program, {
            success: () => { 
                document.getElementById('output').innerText = 'Programa cargado correctamente\n'; 
            },
            error: (err) => { 
                document.getElementById('output').innerText = 'Error al cargar el programa\n' + err; 
            }
        });
    };
    reader.readAsText(file);
});

function runQuery() {
    const query = document.getElementById('queryInput').value;
    document.getElementById('output').innerText = ''; //Se limpia la consola de salida
    //console.log("Consulta: ", query);
    session.query(query, {
        success: () => { 
            let found = false; //Se inicializa la variable found en false
            session.answers(x => {
                if (x === false) {
                    if (!found) {
                        document.getElementById("output").innerText += `Consulta: ${query}\n Falso o no se encontraron resultados\n`;
                    }
                } else {
                    found = true; //Para que no se encicle
                    document.getElementById("output").innerText = `Consulta: ${query}\n Verdadero.\n`;
                }
            });
        },
        fail: () => { document.getElementById('output').innerText += 'No hay respuesta\n'; },
        error: () => { document.getElementById('output').innerText += 'Error al realizar la consulta\n'; }
    });
}

