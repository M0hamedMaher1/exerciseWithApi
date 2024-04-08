let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");

let product;
if(localStorage.getItem("itemat") == null){
    product = [];
    checkBtn();
}else{
    product = JSON.parse(localStorage.getItem("itemat"));
};

function displayThings(){
    let card = "";
    for(let i in product){
        card += `
        <tr>
        <td>${product[i].id}</td>
        <td>${product[i].title}</td>
        <td>${product[i].description}</td>
        <td>$${product[i].price}</td>
        <td>${product[i].count}</td>
        <td>${product[i].category}</td>
        <td><button onclick="deleteElmenet(${i})" class="btn btn-danger">Remove</button></td>
        </tr>
        `
    }
    tbody.innerHTML = card;
};
displayThings();

function checkBtn(){
    if(product.length == 0){
        deleteAll.style.display = "none";
    }else{
        deleteAll.style.display = "inline-block";
    };
};

deleteAll.addEventListener("click", function(){
    product.splice(0);
    localStorage.clear();
    checkBtn();
    displayThings();
});

function deleteElmenet(index){
    product.splice(index, 1);
    localStorage.setItem("itemat", JSON.stringify(product));
    checkBtn();
    displayThings();
};