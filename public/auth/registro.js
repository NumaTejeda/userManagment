const form = document.querySelector('#form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const pass = document.querySelector('#pass').value;

    try {
        const respuesta = await fetch('/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, pass: pass })
        })
        const data = await respuesta.json();
        if (respuesta.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: data.message,
                timer: 4000,
                timerProgressBar: true
            });
            setTimeout(() => {
                window.location.href = data.redirect;
            }, 3000)
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: data.error,
                timer: 5000,
                timerProgressBar: true
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: error,
            timer: 5000,
            timerProgressBar: true
        });
    }
})