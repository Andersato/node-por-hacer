const fs = require('fs')

let listadoPorHacer = []

let guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer)

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error('No se pudo grabar', err)
    });
}

let cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json')
    } catch (err) {
        listadoPorHacer = []
    }
}

let crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer)

    guardarDB()

    return porHacer
}

let getListado = () => {
    cargarDB()

    return listadoPorHacer
}

let actualizar = (descripcion, completado) => {

    cargarDB()

    let index = listadoPorHacer.findIndex(tarea => descripcion === tarea.descripcion)

    if (-1 === index) {
        return false
    }

    listadoPorHacer[index].completado = completado
    guardarDB()

    return true
}

let borrar = (descripcion) => {

    cargarDB()

    let index = listadoPorHacer.findIndex(tarea => descripcion === tarea.descripcion)

    if (-1 === index) {
        return false
    }

    listadoPorHacer.splice(index, 1)

    guardarDB()

    return true
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}