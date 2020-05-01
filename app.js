const argv = require('./config/yargs').argv
const colors = require('colors')
const porHacer = require('./por-hacer/por-hacer')

let comando = argv._[0]

switch (comando) {
    case 'listar':
        let listado = porHacer.getListado()

        for (let tarea of listado) {
            console.log('============Por hacer==========='.green)
            console.log(tarea.descripcion)
            console.log('Estado: ', tarea.completado)
            console.log('================================\n'.green)
        }
        break;
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion)

        console.log(tarea);

        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado)

        if (actualizado) {
            console.log('La tarea se ha actualizado correctamente')
        } else {
            console.log('La tarea no existe');
        }
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion)

        if (borrado) {
            console.log('La tarea se ha borrado correctamente')
        } else {
            console.log('La tarea no existe');
        }
        break;
    default:
        console.log('Comando no reconocido'.red);
}