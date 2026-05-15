const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// API PUBLIK
const API_URL = "https://dummyjson.com/products/category/groceries";

let allProducts = [];

// FETCH API
async function fetchProducts() {

    try {

        loading.style.display = "block";

        const response = await fetch(API_URL);

        // ERROR HANDLING
        if(!response.ok){
            throw new Error("Gagal mengambil data API");
        }

        const data = await response.json();

        // UBAH DATA MENJADI MENU COFFEE
        const coffeeNames = [
            "Espresso Coffee",
            "Cappuccino",
            "Latte Coffee",
            "Americano",
            "Mocha Coffee",
            "Caramel Latte",
            "Vanilla Coffee",
            "Black Coffee"
        ];

        const coffeeImages = [
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348",
            "https://images.unsplash.com/photo-1517705008128-361805f42e86",
            "https://images.unsplash.com/photo-1521302080371-df0e8f5d92d3",
            "https://images.unsplash.com/photo-1459755486867-b55449bb39ff",
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
            "https://images.unsplash.com/photo-1498804103079-a6351b050096"
        ];

        allProducts = data.products.map((product,index)=>{

            return{

                ...product,

                title: coffeeNames[index % coffeeNames.length],

                thumbnail: coffeeImages[index % coffeeImages.length]
            }

        });

        displayProducts(allProducts);

        loading.style.display = "none";

    } catch(error){

        loading.style.display = "none";

        errorDiv.innerHTML = error.message;
    }
}

// TAMPILKAN MENU
function displayProducts(products){

    productContainer.innerHTML = "";

    if(products.length === 0){

        productContainer.innerHTML = `
            <h2>Menu tidak ditemukan</h2>
        `;

        return;
    }

    products.forEach(product=>{

        productContainer.innerHTML += `

            <div class="card">

                <img 
                    src="${product.thumbnail}" 
                    alt="${product.title}"
                >

                <div class="card-content">

                    <h3>${product.title}</h3>

                    <p class="price">
                        $${product.price}
                    </p>

                    <p class="rating">
                        ⭐ ${product.rating}
                    </p>

                    <p>
                        Stock: ${product.stock}
                    </p>

                    <button>
                        Order Now
                    </button>

                </div>

            </div>

        `;
    });
}

// SEARCH MENU
function filterProducts(){

    const keyword = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product=>

        product.title.toLowerCase().includes(keyword)

    );

    displayProducts(filtered);
}

// EVENT SEARCH
searchInput.addEventListener("keyup", filterProducts);

// JALANKAN API
fetchProducts();