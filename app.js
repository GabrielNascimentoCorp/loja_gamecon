const productsPs = document.querySelectorAll(".slider-games-ps .product-ps")
let counterPs = 0 

function leftPs(){

    if(counterPs == 0){
        counterPs = productsPs.length - 1
    }else {
        counterPs--
    }

    scroll()

}

function rightPs(){

    if(counterPs == productsPs.length - 1){
        counterPs = 0
    }else{
        counterPs++
    }

    scroll()
}

function scroll(){
    productsPs.forEach(function(item){
        item.style.transform = `translateX(-${counterPs * 300}px)`
    })
}

const productsXbox = document.querySelectorAll(".slider-games-xbox .product-xbox");
let counterXbox = 0;

function leftXbox() {

  if (counterXbox === 0) {
    counterXbox = productsXbox.length - 1;
  } else {
    counterXbox--;
  }

  scrollXbox();
}

function rightXbox() {

  if (counterXbox === productsXbox.length - 1) {
    counterXbox = 0;
  } else {
    counterXbox++;
  }

  scrollXbox();
}

function scrollXbox() {
  productsXbox.forEach(function(item) {
    item.style.transform = `translateX(-${counterXbox * 300}px)`;
  });
}

const productsNintendo = document.querySelectorAll(".slider-games-nintendo .product-nintendo");
let counterNintendo = 0;

function leftNintendo() {

  if (counterNintendo === 0) {
    counterNintendo = productsNintendo.length - 1;
  } else {
    counterNintendo--;
  }

  scrollNintendo();
}

function rightNintendo() {

  if (counterNintendo === productsNintendo.length - 1) {
    counterNintendo = 0;
  } else {
    counterNintendo++;
  }

  scrollNintendo();
}

function scrollNintendo() {
  productsNintendo.forEach(function(item) {
    item.style.transform = `translateX(-${counterNintendo * 300}px)`;
  });
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    const cartCountElement = document.querySelector('.shoppingcart h3');
    let cartCount = parseInt(cartCountElement.textContent.replace(/\D/g, '')); // Remove todos os caracteres não numéricos
    cartCount++;
    cartCountElement.textContent = `(${cartCount})`;
  }
  
  // Adiciona um ouvinte de evento para todos os botões com a classe "addToCart"
  document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', updateCartCount);
  });

// ----------

// Armazena os itens do carrinho
let cart = [];

// Função para adicionar um item ao carrinho
function addToCart(event) {
    const productElement = event.target.closest('.product-ps, .product-xbox, .product-nintendo'); // Seleciona o produto
    const title = productElement.querySelector('.title h3').textContent;
    const price = parseFloat(productElement.querySelector('.price').textContent.replace('R$', '').trim());
    const image = productElement.querySelector('img').src;

    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.title === title);

    if (existingProduct) {
        // Se o produto já estiver no carrinho, aumenta a quantidade
        existingProduct.quantity += 1;
    } else {
        // Caso contrário, adiciona o produto ao carrinho
        cart.push({
            title,
            price,
            image,
            quantity: 1
        });
    }

    renderCart(); // Renderiza o carrinho
}

// Função para renderizar o carrinho
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpa os itens do carrinho

    // Renderiza cada item do carrinho
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-info">
                <h3>${item.title}</h3>
                <div class="price">R$ ${item.price.toFixed(2)}</div>
                <div>
                    <label for="quantity-${item.title}">Quantidade:</label>
                    <input id="quantity-${item.title}" type="number" value="${item.quantity}" min="1">
                    <button class="remove" onclick="removeFromCart('${item.title}')">Remover</button>
                </div>
            </div>
        `;

        // Evento para atualizar a quantidade do item
        const quantityInput = itemElement.querySelector('input');
        quantityInput.addEventListener('input', () => updateQuantity(item.title, quantityInput.value));

        cartItemsContainer.appendChild(itemElement);
    });

    // Atualiza o total do carrinho
    updateTotal();
}

// Função para atualizar a quantidade de um item
function updateQuantity(title, quantity) {
    const product = cart.find(item => item.title === title);
    if (product) {
        product.quantity = parseInt(quantity);
    }
    updateTotal();
}

// Função para remover um item do carrinho
function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    renderCart();
}

// Função para calcular o total do carrinho
function updateTotal() {
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Adiciona os produtos ao carrinho ao clicar no botão "Adicionar ao Carrinho"
document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Event listener para finalizar a compra
document.getElementById('checkout').addEventListener('click', () => {
    alert('Compra finalizada!');
    cart = []; // Limpa o carrinho após a compra
    renderCart();
});


// modal teste 

// Função para abrir o carrinho (modal)
function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
}

// Função para fechar o carrinho (modal)
function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

// Função para adicionar itens ao carrinho
// Supondo que você tenha uma lógica para adicionar itens ao carrinho
let cartItems = [];
const cartCountElement = document.querySelector('.shoppingcart h3');

function addItemToCart(item) {
    cartItems.push(item);
    updateCartDisplay();
}

// Atualiza o número de itens no carrinho e o total
function updateCartDisplay() {
    cartCountElement.innerText = `(${cartItems.length})`; // Atualiza a quantidade de itens
    updateCartItems();
    updateTotalPrice();
}

// Exibe os itens do carrinho
function updateCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Limpa os itens

    cartItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <div class="price">${item.price}</div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
}

// Atualiza o preço total
function updateTotalPrice() {
    let totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('R$ ', '').replace(',', '.')), 0);
    document.getElementById("total-price").innerText = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
} 

