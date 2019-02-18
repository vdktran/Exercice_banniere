function Product(name, price, img, like, html) {

    this.name = name;
    this.price = price;
    this.img = img;
    this.like = like; 
    this.html = html;
}

var bag = new Product("sac", 100, "https://mosaic03.ztat.net/vgs/media/catalog-sm/EV/45/1H/0D/6Q/11/EV451H0D6-Q11@11.jpg", false);
var tshirt = new Product("t-shirt", 20, "https://blog.codepen.io/wp-content/uploads/2017/03/codepen.jpg", false);
var shoes = new Product("chaussures", 50, "https://brightledshoes.com/wp-content/uploads/2017/01/gold-led-light-up-shoes.jpg", false);

var products = [bag, tshirt, shoes];

function createCard (product, index) {

    product.html = document.createElement("div");
    product.html.className = "card";
    product.html.id = "card"+index;

    product.html.image = document.createElement("img");
    product.html.image.src = product.img;

    product.html.buyicon = document.createElement("i");
    product.html.buyicon.textContent = " Ajouter au panier";
    product.html.buyicon.className = "fas fa-shopping-cart";
    product.html.buyicon.id = "buyicon"+index;

    product.html.likeicon = document.createElement("i");
    product.html.likeicon.className = "far fa-heart";
    product.html.likeicon.id = "likeicon"+index;

    product.html.prixaffiche = document.createElement('p');
    product.html.prixaffiche.innerHTML = product.price+"€";

    document.getElementById("banniere").appendChild(product.html);
    document.getElementById(product.html.id).appendChild(product.html.image);
    document.getElementById(product.html.id).appendChild(product.html.prixaffiche);
    document.getElementById(product.html.id).appendChild(product.html.likeicon);
    document.getElementById(product.html.id).appendChild(product.html.buyicon);
}

function addlike(i) {
    if(products[i].like == false) {
        products[i].like = true;
        products[i].html.likeicon.className = "fas fa-heart";
        localStorage.setItem("Likes", products[i].name);
        document.getElementById("shownwishlist").insertAdjacentHTML('afterbegin', localStorage.getItem("Likes")+"</br>");
    }
    else{
        products[i].like = false;
        products[i].html.likeicon.className = "far fa-heart";
        localStorage.removeItem("Likes", products[i].name);
    }

    console.log("j\'aime "+products[i].name+" est "+products[i].like)
}

function buying(i) {
    console.log("j'ai acheté "+products[i].name);
    localStorage.setItem("Panier", products[i].name);
    document.getElementById("shownpanier").insertAdjacentHTML('afterbegin', localStorage.getItem("Panier")+"</br>");
}

products.forEach(function (prod, i) {
    
    createCard(prod, i);


     document.getElementById("likeicon"+i).addEventListener('click', function () {
        addlike(i);
     });


     document.getElementById("buyicon"+i).addEventListener('click', function () {
        buying(i);
     });
});

document.getElementById("iconpanier").addEventListener('click', function () {
    if (document.getElementById("shownpanier").style.visibility === "visible") {
        document.getElementById("shownpanier").style.visibility = "hidden";
    }
    else if (document.getElementById("shownpanier").style.visibility === "hidden") {
        document.getElementById("shownpanier").style.visibility = "visible";
    }
    else {
        document.getElementById("shownpanier").style.visibility = "hidden";
    }
})

document.getElementById("iconwishlist").addEventListener('click', function () {
    if (document.getElementById("shownwishlist").style.visibility === "visible") {
        document.getElementById("shownwishlist").style.visibility = "hidden";
    }
    else if (document.getElementById("shownwishlist").style.visibility === "hidden") {
        document.getElementById("shownwishlist").style.visibility = "visible";
    }
    else {
        document.getElementById("shownwishlist").style.visibility = "hidden";
    }
})
