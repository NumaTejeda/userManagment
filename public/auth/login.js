const form = document.querySelector('#form');
const inputUser = document.querySelector('#user');
const inputPassA = document.querySelector('#pass');
const inputPassB = document.querySelector('#pass2');

const compararContraseñas = (a, b) => {
    return a === b
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user_name = inputUser.value;
    const user_pass = inputPassA.value;
    const user_pass2 = inputPassB.value;


    const exactlyPass = compararContraseñas(user_pass, user_pass2);
    try {
        if (exactlyPass) {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    // 'authorization': `Bearer ${token}`
                    // 'accept': 'application/json',
                },
                body: JSON.stringify({ user_name: user_name, user_pass: user_pass })
            })
            const data = await response.json()
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Inicio de secion exitoso!',
                    timer: 3000,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: data.error,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Verifica tu contraseña',
                timer: 2000,
                timerProgressBar: true,
            });
        }
    } catch (error) {
        console.error(error);
    }
});