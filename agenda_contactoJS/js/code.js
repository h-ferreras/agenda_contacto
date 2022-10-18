const url = 'http://www.raydelto.org/agenda.php'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalcontacto = new bootstrap.Modal(document.getElementById('modalContacto'))
const formcontacto = document.querySelector('form')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const telefono = document.getElementById('telefono')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
    nombre.value = ''
    apellido.value = ''
    telefono.value = ''
    modalcontacto.show()
    opcion = 'crear'
})
const mostrar = (contactos) => {
    contactos.forEach(contacto => {
        resultados += `<tr>
                            
                            <td>${contacto.nombre}</td>
                            <td>${contacto.apellido}</td>
                            <td>${contacto.telefono}</td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
let idForm = 0

formcontacto.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        

        fetch(url, {
  method: 'POST', 
  headers: {

    
  },
  body: JSON.stringify({
    nombre:nombre.value,
    apellido:apellido.value,
    telefono:telefono.value
}),
})
.then( response => response.json() )
.then( data => {
    const nuevocontacto = []
    nuevocontacto.push(data)
    mostrar(nuevocontacto)
    
    
})
    }
    if(opcion=='editar'){    
        
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                apellido:apellido.value,
                telefono:telefono.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalcontacto.hide()
 })
