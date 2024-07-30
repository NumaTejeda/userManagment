fetch('api/items/items')
    .then(response => response.json())
    .then(items => {
        let ul = document.querySelector('#items');
        if (items.length > 0) {
            items.forEach(element => {
                const li = document.createElement('li');
                li.textContent = `Id: ${element.id_user} ---> name: ${element.user_name}`
                ul.appendChild(li);
            });
            return;
        } else {
            div.textContent = "Nada por aquí"
            return;
        }
    })
    .catch(error => console.error('Error fetching items:', error));