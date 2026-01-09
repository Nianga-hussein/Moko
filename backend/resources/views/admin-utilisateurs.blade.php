<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Utilisateurs</title>

    <link rel="stylesheet" href="{{ asset('assets/css/vendor/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
</head>
<body>
<div class="container mt-5">
    <h2>Liste des utilisateurs</h2>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Rôle</th>
            <th>Vérifié</th>
        </tr>
        </thead>
        <tbody id="usersTable">
        <!-- JS remplira la table -->
        </tbody>
    </table>
</div>

<script>
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if(!token) {
        window.location.href = '{{ url("/login") }}';
        return;
    }

    try {
        const response = await fetch('{{ url("/api/users") }}', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if(response.ok){
            const users = await response.json();
            const tbody = document.getElementById('usersTable');
            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.full_name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone_number}</td>
                    <td>${user.role}</td>
                    <td>${user.is_verified ? 'Oui' : 'Non'}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error('Erreur API utilisateurs');
        }
    } catch(err){
        console.error('Erreur de connexion', err);
    }
});
</script>
</body>
</html>
