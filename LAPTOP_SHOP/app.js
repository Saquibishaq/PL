document.addEventListener("DOMContentLoaded", function() {
    // Handle Registration
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email-register").value;
            const password = document.getElementById("password-register").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
           
            alert("Registered as " + name);
            window.location.href = "login.html"; 
        });
    }
    // Handle Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            alert("Logged in as " + email);
            window.location.href = "shop.html";     
        });
    }

    

    // Cart ka code  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updateCartDisplay = () => {
        const cartItems = document.querySelector(".cart-items");
        if (cartItems) {
            cartItems.innerHTML = ""; 
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.className = "cart-item";
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button data-index="${index}" class="remove-item">Remove</button>
                `;
                cartItems.appendChild(itemElement);
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const addToCartButtons = document.querySelectorAll(".product button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productElement = button.parentElement;
            const name = productElement.querySelector("h3").textContent;
            const price = productElement.querySelector("p").textContent.replace("₹", "");
            const image = productElement.querySelector("img").src;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }
            updateCartDisplay();
            alert("Added to cart: " + name);
        });
    });

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartDisplay();
            alert("Item removed from cart");
        }
    });

    updateCartDisplay();
});
