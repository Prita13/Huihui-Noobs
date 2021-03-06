let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Pizza',
        tag: 'pizza',
        price: 200,
        inCart: 0
    },
    {
        name: 'Spaghetti',
        tag: 'spaghetti',
        price: 250,
        inCart: 0
    },
    {
        name: 'Lasagne',
        tag: 'lasagne',
        price: 400,
        inCart: 0
    },
    {
        name: 'Penne Pasta',
        tag: 'penne pasta',
        price: 250,
        inCart: 0
    },
    {
        name: 'Ravioli',
        tag: 'ravioli',
        price: 250,
        inCart: 0
    },
    {
        name: 'Noodles',
        tag: 'noodles',
        price: 200,
        inCart: 0
    },
    {
        name: 'Taco',
        tag: 'taco',
        price: 300,
        inCart: 0
    },
    {
        name: 'Shrimp Fry',
        tag: 'shrimp fry',
        price: 400,
        inCart: 0
    },
    {
        name: 'Chilli Chicken',
        tag: 'chilli chicken',
        price: 350,
        inCart: 0
    },
    {
        name: 'Tequila Sunrise',
        tag: 'tequila sunrise',
        price: 300,
        inCart: 0
    },
    {
        name:'Sweet Poison',
        tag: 'sweet poison',
        price: 350,
        inCart: 0
    },
    {
        name: 'Rainbow paradise',
        tag: 'rainbow paradise',
        price: 400,
        inCart: 0

    }
]
for(i=0; i<carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }

    
}

function displayCart(){
   let cartItems = localStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);
   let productContainer = document.querySelector(".products");
   let cartCost = localStorage.getItem('totalCost');
   if( cartItems && productContainer){
       productContainer.innerHTML = '';
       Object.values(cartItems).map(item => {
           productContainer.innerHTML += `
           <div class="product">
              <ion-icon name="close-circle-outline"></ion-icon>
              <img src="./images/${item.tag}.png">
              <span>${item.name}</span>
           </div> 
           <div class="price">Sc${item.price},00</div> 
           <div class="quantity">
                <ion-icon name="caret-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-circle"></ion-icon>
                
           </div> 
           <div class="total">
               Sc${item.inCart * item.price},00
           </div>
           `;
       });

       productContainer.innerHTML += `
       <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">
              Basket Total
          </h4>
          <h4 class="basketTotal">
               Sc${cartCost},00
          </h4>    
       `;
   }
}

onLoadCartNumbers();
displayCart();