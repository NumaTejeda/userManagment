async function fetchProtectedData() {
    try {
        const response = await fetch('/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
}
// Llamar a la función para probar la solicitud protegida
fetchProtectedData();

const logOut = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin'
    })
    console.log(response)
    if (response.ok) {
        console.log('Sesión cerrada correctamente');
        // Realizar cualquier acción adicional después de cerrar sesión, como redireccionar a la página de inicio de sesión
        window.location.href = '/login.html';
    } else {
        console.error('Error al cerrar sesión');
    }
}