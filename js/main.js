window.addEventListener("scroll", function () {
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if (x > 200) {
        nav.style.transform = "translateY(0)";
    } else {
        nav.style.transform = "translateY(calc(-100% + -1px))";
    };
});

let row = document.querySelector(".products-row");
let spanCount = document.querySelector(".fa-cart-shopping span");
let cart2 = document.querySelector(".cart h3 span");

let list = [];

let cart;
if (localStorage.getItem("itemat") == null) {
    cart = [];
} else {
    cart = JSON.parse(localStorage.getItem("itemat"));
    spanCount.innerHTML = cart.length;
};

let getData = async function () {
    let api = await fetch("https://dummyjson.com/products");
    let response = await api.json();
    let products = response.products;
    list = products;
    displayProducts(products);
};
getData();

function displayProducts(take) {
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="card">
        <div class="image">
            <img src="${item.images[0]}" alt="">
            <img src="${item.images[1]}" alt="" class="img2">
            <div class="icons">
                <div class="icon" onclick="addToWish()">
                    <i class="fa-regular fa-heart"></i>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-layer-group"></i>
                </div>
                <div class="icon" onclick="openInfo(${index})">
                    <i class="fa-regular fa-eye"></i>
                </div>
            </div>
        </div>
        <div class="card-body">
            <h3>${item.title}</h3>
            <div class="card-mid">
                <div class="stars">
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                    <div class="star"><i class="fa-solid fa-star"></i></div>
                </div>
                <h4>(1 review)</h4>
            </div>
            <span class="price">
            $${item.price}
            </span>
            <span class="in">
                <i class="fa-solid fa-check"></i> ${item.stock} products <span>on stock</span>
            </span>
            <button class="buy" onclick="addToCart(${index})">
                add to cart
            </button>
        </div>
    </div>
        `
    });
    row.innerHTML = card;
};

function addToCart(index) {
    let choosenProduct = list[index];
    let final = cart.find((item) => item.id == choosenProduct.id)
    if (final) {
        final.count++;
    } else {
        cart.push({
            ...choosenProduct,
            count: 1
        });
    };
    list[index].stock.innerText--;
    spanCount.innerHTML = cart.length;
    localStorage.setItem("itemat", JSON.stringify(cart));
};

let counts = document.querySelectorAll(".click span");

let counter = 0;

function addToWish(){
    counter++;
    counts.forEach((item) => {
        item.innerHTML = counter;
    });
};

function searchProduct(searching){
    let card = "";
    list.forEach((item, index) => {
        if(item.title.includes(searching.trim())){
            card += `
            <div class="card">
            <div class="image">
                <img src="${item.images[0]}" alt="">
                <img src="${item.images[1]}" alt="" class="img2">
                <div class="icons">
                    <div class="icon">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <div class="icon" onclick="openInfo(${index})">
                        <i class="fa-regular fa-eye"></i>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h3>${item.title}</h3>
                <div class="card-mid">
                    <div class="stars">
                        <div class="star"><i class="fa-solid fa-star"></i></div>
                        <div class="star"><i class="fa-solid fa-star"></i></div>
                        <div class="star"><i class="fa-solid fa-star"></i></div>
                        <div class="star"><i class="fa-solid fa-star"></i></div>
                        <div class="star"><i class="fa-solid fa-star"></i></div>
                    </div>
                    <h4>(1 review)</h4>
                </div>
                <span class="price">
                $${item.price}
                </span>
                <span class="in">
                    <i class="fa-solid fa-check"></i> ${item.stock} products <span>on stock</span>
                </span>
                <button class="buy" onclick="addToCart(${index})">
                    add to cart
                </button>
            </div>
        </div>
            `
        };
    });
    row.innerHTML = card;
};

let overlay = document.querySelector(".overlay");
let left = document.querySelector(".left");
let name1 = document.querySelector(".right-info h3");
let desc = document.querySelector(".right-info p");
let close2 = document.querySelector(".close2");

function openInfo(index){
    overlay.style.display = "flex";
    let src = list[index].images[0];
    left.style.backgroundImage = `url(${src})`;
    let title = list[index].title;
    name1.textContent = title;
    let descr = list[index].description;
    desc.textContent = descr;
}

close2.addEventListener("click", function(){
    overlay.style.display = "none";
});

let bars = document.querySelector(".bars");
let close1 = document.querySelector(".close");
let aside = document.querySelector(".aside1");

bars.addEventListener("click", function(){
    aside.style.transform = "translateX(0)";
});

close1.addEventListener("click", function(){
    aside.style.transform = "translateX(calc(-100% + -2px))";
});