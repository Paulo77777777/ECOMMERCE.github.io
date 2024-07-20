//carrinho

let CartIcon = document.querySelector('#cart-icon')
let Cart = document.querySelector('.cart')
let ClosseCart = document.querySelector('#closse-cart')
// abrir carrinho
CartIcon.onclick = () => {
  Cart.classList.add("active");
};
// fechar carrinho
ClosseCart.onclick = () => {
  Cart.classList.remove("active");
};


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
function ready() {
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons);
    for (var i = 0; i < reomveCartButtons.length; i++) {
        var button = reomveCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //alterações de quantidade 
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for (var i = 0; i < quantityInputs.length; i++){
     var input = quantityInputs[i];
     input.addEventListener("change",quantityChanged);
     
    }
    // adicionar ao carrinho
    var addCart = document.getElementsByClassName("add-cart")
    for (var i = 0; i < addCart.length; i++){
      var button = addCart[i]
      button.addEventListener("click",addCartClicked)
    }
    
    
}

//botão de compra 

document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);


//botão comprar 
function buyButtonClicked() {
  alert("seu pedido está feito");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updetetotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updetetotal();
}
    //alterações de quantidade 
    
function quantityChanged(evet) {
  var input = event.target;
  if(isNaN(input.value) || input.value <=0){
    input.value = 1;
  }
  updetetotal();
}

// Função para adicionar ao carrinho
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('Você já adicionou este item ao carrinho');
      return;
    }
  }

  var cartBoxContent = `
    <img class="cart-img" src="${productImg}" />
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- remover do carrinho-->
    <i class='bx bxs-trash-alt cart-remove'></i>
  `;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}

// Atualizar total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("R$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }

  document.getElementsByClassName("total-price")[0].innerText = "R$" + total.toFixed(2);
}

// Função para remover item do carrinho
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Função para alterar a quantidade
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Event listeners para adicionar ao carrinho
document.addEventListener("DOMContentLoaded", function() {
  var addCartButtons = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCartButtons.length; i++) {
    addCartButtons[i].addEventListener("click", addCartClicked);
  }
});

//atualizar total

function updetetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace( "R$",""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
    
    //se o preço tiver algum valor quebrado
    
  }
    total = Math.round(total * 100) / 100;
    
    document.getElementsByClassName("total-price")[0].innerText =  "R$" + total;
    
    
  

}
