document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var referral = document.getElementById('referral').value;

    // Perform your login logic here (validate credentials)
    if (username === "test" && password === "password") {
        console.log('Login successful!');
        // Redirect to the next page (dashboard.html) with the referral code as a URL parameter
        window.location.href = `dashboard.html?referral=${encodeURIComponent(referral)}`;
    } else {
        alert('Invalid username or password');
    }
});

function handleCredentialResponse(response) {
    // Parse the JWT token
    var data = jwt_decode(response.credential);

    // Log the user information
    console.log('Google ID:', data.sub);
    console.log('Full Name:', data.name);
    console.log('Given Name:', data.given_name);
    console.log('Family Name:', data.family_name);
    console.log('Image URL:', data.picture);
    console.log('Email:', data.email);

    // Redirect to the next page (dashboard.html) with the referral code (if available) as a URL parameter
    var referral = document.getElementById('referral') ? document.getElementById('referral').value : '';
    window.location.href = `dashboard.html?referral=${encodeURIComponent(referral)}`;
}

function jwt_decode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
