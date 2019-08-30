//const cursos = document.querySelector('#lista-cursos');
const cursos = document.getElementById('lista-cursos');
const carrito = document.getElementById('carrito');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

listeners();

function listeners(){
    //Se ejecuta cuando click en add carrito
    cursos.addEventListener('click', getDataCurso);    
    //se ejecuta cuando se elimina un curso del carrito
    //usando delegation
    carrito.addEventListener('click', eliminarCurso);
    //Se ejecuta al click en btn vaciar-carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    //Al cargar página debe cargar lista carrito desde localStorage
    document.addEventListener('DOMContentLoaded',leerLocalStorage);

}

function getDataCurso(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('agregar-carrito')) {

        // console.log(e.target.dataset.imagen);
        // console.log(e.target.dataset.precio);
        // console.log(e.target.dataset.titulo);
        
        const infoCurso = {
            id: e.target.dataset.id,
            imagen: e.target.dataset.imagen,
            titulo: e.target.dataset.titulo,
            precio: e.target.dataset.precio
        }
        //console.log(infoCurso);
        insertarCarrito(infoCurso);
    }
    //console.log(btnClick.getAttribute("columns"));
}

//Add carrito de compras
function insertarCarrito(curso){
    listaCursos.innerHTML += `
        <tr>
            <td class="align-middle">
                <img class="img-fluid" src="${curso.imagen}" alt="Card image cap">
            </td>
            <td>${curso.titulo}</td>
            <td class="align-middle">${curso.precio}</td>
            <td class="align-middle">
                <a href="#" class="" data-id="${curso.id}">
                    <i class="fas fa-times-circle text-danger fa-2x borrar-curso"></i>
                </a>
            </td>
        </tr>`;  
        
    //Guardar curso LocalStorage
    guardarCursoLocalStorage(curso);
    
}

//Elimina curso de carrito de compras
function eliminarCurso(e){
    e.preventDefault();
    let idcurso;
    //console.log(e.target);    
    if (e.target.classList.contains('borrar-curso')) {
        //console.log(e.target.parentElement.dataset.id);
        idcurso = e.target.parentElement.dataset.id;
        e.target.parentElement.parentElement.parentElement.remove();

        //Eliminar De LocalStorage
        eliminarCursoLocalStorage(idcurso);
    }
}

//Elimina curso de Local Storage
function eliminarCursoLocalStorage(id){

    let listaCursos = obtenerCursosLocalStorage();

    listaCursos.forEach(function (element, index) {
        if (element.id === id) {
            listaCursos.splice(index, 1);
            console.log(element);
        }
    });
    //console.log(listaCursos);
    addLocalStorage(listaCursos);
}

//Vacia todo el carrito de compras
function vaciarCarrito(e){
    e.preventDefault();
    // #1 Forma lenta
    // listaCursos.innerHTML = '';
    // return false;

    //#2 Forma correcta recomendada
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    vaciarLocalStorage();
    return false;
}

function vaciarLocalStorage(){
    localStorage.clear();
}

function guardarCursoLocalStorage(curso){
    //Guarda cursos JSON existentes
    let cursos;
    //obtiene cursos localStorage
    cursos = obtenerCursosLocalStorage();
    //agrego nuevo curso a objeto JSON existente
    cursos.push(curso);
    //convierto arreglo objetos JSON a Texto
    let cursosCadena = JSON.stringify(cursos);
    //vuelvo a guardar en localstorage
    localStorage.setItem('cursos',cursosCadena);
}

function addLocalStorage(cursos){
    //convierto arreglo objetos JSON a Texto
    let cursosCadena = JSON.stringify(cursos);
    //vuelvo a guardar en localstorage
    localStorage.setItem('cursos',cursosCadena);
}

//Verifica si hay algo ya en LocalStorage, retorna un JSON
function obtenerCursosLocalStorage(){
    let cursosLS;

    //comprobamos si hay cursos en LocalStorage
    if (localStorage.getItem('cursos') === null) {
        //No hay nada, declaramos vacio
        cursosLS = [];
    }else{
        //Si hay algo en LocalStorage, lo obtenemos y guardamos
        //( texto a arreglo objetos JSON )
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//lee datos localstorage y carga carrito
function leerLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    
    cursosLS.forEach(curso => {
        listaCursos.innerHTML += `
        <tr>
            <td class="align-middle">
                <img class="img-fluid" src="${curso.imagen}" alt="Card image cap">
            </td>
            <td>${curso.titulo}</td>
            <td class="align-middle">${curso.precio}</td>
            <td class="align-middle">
                <a href="#" class="" data-id="${curso.id}">
                    <i class="fas fa-times-circle text-danger fa-2x borrar-curso"></i>
                </a>
            </td>
        </tr>`;  
    });
}