
const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.querySelector("#id").value;
    const name = document.querySelector("#name").value;

    try {
        let respuestaJSON;
        await fetch(`/api/items/update`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ id: id, name: name }),
        })
            .then(respuesta => {
                respuestaJSON = respuesta;
                return respuesta.json()
            })
            .then(resBack => {
                if (respuestaJSON.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: resBack.message
                    });
                    return;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: resBack.message
                    })
                    return;
                }
            })
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ups! Algo salio mal, vuelve a intentarlo'
        })
        return;
    }

})
