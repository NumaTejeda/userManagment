
const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.querySelector("#id").value;

    const confirmed = await Swal.fire({
        title: "¿Estás seguro? Esta acción es irreversible.",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Estoy seguro',
        cancelButtonText: 'No estoy seguro',
        icon: 'warning',
        reverseButtons: true,
        timer: 10000,
        timerProgressBar: true,
    });

    if (confirmed.isConfirmed) {
        try {
            const response = await fetch(`api/items/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ id: id })
            });

            const { status } = response;
            const data = await response.json();

            if (status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: data.message,
                    timer: 3000,
                    timerProgressBar: true
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: data.message,
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: '¡Ups! Algo salió mal, vuelve a intentarlo',
                timer: 5000,
                timerProgressBar: true
            });
            console.error(e);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Cancelado',
            text: 'Usuario no eliminado :)',
            timer: 3000,
            timerProgressBar: true
        });
    }
});
