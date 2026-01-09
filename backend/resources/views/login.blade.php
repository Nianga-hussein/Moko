﻿<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>FlyNow | Se connecter</title>

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/media/LOGO.jpg') }}">

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('assets/css/vendor/font-awesome.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/fonts/icomoon/style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/vendor/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/vendor/slick.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/vendor/slick-theme.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/vendor/aksVideoPlayer.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">

    <style>
        body { background-color: #f0f0f0; }
    </style>
</head>

<body class="o-scroll" id="js-scroll">

    <div id="main-wrapper" class="main-wrapper overflow-hidden">

        <section class="signup bg-white">
            <div class="row align-items-center justify-content-center">
                <div class="col-lg-5 col-md-9 col-sm-10 p-0">
                    <div class="container-fluid">
                        <div class="form-block">
                            <a href="{{ url('/') }}" class="color-primary h6 mb-30">&lt; Retour à l'accueil</a>
                            <h2 class="mb-30 light-black">Se connecter</h2>

                            <h5 class="or mb-8">ou</h5>
                            <h6 class="mb-24 text-center">Connectez-vous avec votre adresse e-mail</h6>

                            <form id="loginForm" class="form-group contact-form">
                                @csrf
                                <div class="row">
                                    <div class="col-sm-12 mb-24">
                                        <input type="email" class="form-control" id="email" name="email" required placeholder="E-mail">
                                    </div>
                                    <div class="col-sm-12 mb-24">
                                        <input type="password" class="form-control" id="password" name="password" required placeholder="Mot de passe">
                                    </div>
                                    <div class="col-12 d-flex justify-content-end">
                                        <button type="submit" class="cus-btn small-pad mb-24">Se connecter</button>
                                        <div id="message" class="alert-msg ml-3"></div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div class="col-lg-7 p-0">
                    <div class="img-block">
                        <img src="{{ asset('assets/media/images/application.png') }}" alt="">
                    </div>
                </div>
            </div>
        </section>

    </div>

    <!-- JS -->
    <script src="{{ asset('assets/js/vendor/jquery-3.6.3.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/slick.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/jquery-appear.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/jquery-validator.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/aksVideoPlayer.js') }}"></script>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = 'Connexion en cours...';
            messageDiv.style.color = 'black';

            try {
                const response = await fetch('{{ url("/api/login") }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({email, password})
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    messageDiv.style.color = 'green';
                    messageDiv.textContent = 'Connexion réussie !';
                } else {
                    const error = await response.json();
                    messageDiv.style.color = 'red';
                    messageDiv.textContent = error.message;
                }
            } catch (err) {
                messageDiv.style.color = 'red';
                messageDiv.textContent = 'Erreur de connexion au serveur';
            }
        });
    </script>

</body>
</html>
