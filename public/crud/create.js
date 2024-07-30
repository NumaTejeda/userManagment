
const formCreateUser = document.getElementById("form");

formCreateUser.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const pass = document.querySelector("#pass").value;

    try {
        const respuesta = await fetch('api/items/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, pass: pass })
        });
        // console.log(respuesta)

        const result = await respuesta.json();
        console.log(result)
        console.log(respuesta)
        if (respuesta.status === 200) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: result.message
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: result.error
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: '¡Error desde el catch!',
            text: 'Ocurrió un error al enviar la solicitud.'
        });
        console.log(error);
    }
});
