// =====================================
// DATA KERANJANG
// =====================================

let cart = [];



// =====================================
// FORMAT RUPIAH
// =====================================

function formatRupiah(number) {

    return new Intl.NumberFormat('id-ID', {

        style: 'currency',

        currency: 'IDR',

        minimumFractionDigits: 0

    }).format(number);

}



// =====================================
// TAMBAH PRODUK
// =====================================

function addProduct(name, price) {

    let existing = cart.find(
        item => item.name === name
    );


    if (existing) {

        existing.qty++;

    }

    else {

        cart.push({

            name: name,

            price: price,

            qty: 1

        });

    }


    displayCart();

}



// =====================================
// TAMPILKAN KERANJANG
// =====================================

function displayCart() {

    const cartElement =
        document.getElementById("cart");


    if (cart.length === 0) {

        cartElement.innerHTML = `

            <div class="empty">

                🛒

                <br><br>

                Belum ada produk

            </div>

        `;


        document.getElementById("total")
            .innerText = "Rp 0";


        document.getElementById("change")
            .innerText = "Rp 0";


        return;

    }


    cartElement.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

        let subtotal =
            item.price * item.qty;


        total += subtotal;


        cartElement.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <small>

                        ${item.qty}
                        x
                        ${formatRupiah(item.price)}

                    </small>

                </div>


                <div class="cart-right">

                    <strong>

                        ${formatRupiah(subtotal)}

                    </strong>


                    <button
                        class="delete"
                        onclick="removeProduct(${index})">

                        ✕

                    </button>

                </div>

            </div>

        `;

    });


    document.getElementById("total")
        .innerText = formatRupiah(total);


    calculateChange();

}



// =====================================
// HAPUS PRODUK
// =====================================

function removeProduct(index) {

    cart.splice(index, 1);

    displayCart();

}



// =====================================
// HITUNG TOTAL
// =====================================

function getTotal() {

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.qty;

    });


    return total;

}



// =====================================
// HITUNG KEMBALIAN
// =====================================

function calculateChange() {

    let total =
        getTotal();


    let payment =
        Number(
            document.getElementById("payment").value
        );


    let change =
        payment - total;


    if (change < 0 || !payment) {

        change = 0;

    }


    document.getElementById("change")
        .innerText = formatRupiah(change);

}



// =====================================
// CETAK STRUK
// =====================================

function printReceipt() {

    if (cart.length === 0) {

        alert(
            "Silakan pilih produk terlebih dahulu!"
        );

        return;

    }


    let total =
        getTotal();


    let payment =
        Number(
            document.getElementById("payment").value
        );


    if (!payment) {

        alert(
            "Masukkan uang pembayaran terlebih dahulu!"
        );

        return;

    }


    if (payment < total) {

        alert(
            "Uang pembayaran kurang!"
        );

        return;

    }


    let change =
        payment - total;


    // TANGGAL

    let date =
        new Date();


    document.getElementById("receiptDate")
        .innerText =
        date.toLocaleString("id-ID");


    // PRODUK

    let receiptItems =
        document.getElementById("receiptItems");


    receiptItems.innerHTML = "";


    cart.forEach(item => {

        let subtotal =
            item.price * item.qty;


        receiptItems.innerHTML += `

            <div class="receipt-item">

                <span>
                    ${item.name} x${item.qty}
                </span>

                <span>
                    ${formatRupiah(subtotal)}
                </span>

            </div>

        `;

    });


    // TOTAL

    document.getElementById("receiptTotal")
        .innerText =
        formatRupiah(total);


    // BAYAR

    document.getElementById("receiptPayment")
        .innerText =
        formatRupiah(payment);


    // KEMBALIAN

    document.getElementById("receiptChange")
        .innerText =
        formatRupiah(change);


    // CETAK

    window.print();

}



// =====================================
// TRANSAKSI BARU
// =====================================

function resetTransaction() {

    cart = [];


    document.getElementById("payment")
        .value = "";


    document.getElementById("total")
        .innerText = "Rp 0";


    document.getElementById("change")
        .innerText = "Rp 0";


    displayCart();

}



// =====================================
// PINDAH MENU
// =====================================

function showPage(pageName, menuElement) {

    // Sembunyikan kasir

    document.getElementById("kasirPage")
        .style.display = "none";


    // Sembunyikan produk

    document.getElementById("produkPage")
        .style.display = "none";


    // Sembunyikan transaksi

    document.getElementById("transaksiPage")
        .style.display = "none";


    // Sembunyikan laporan

    document.getElementById("laporanPage")
        .style.display = "none";



    // Tampilkan halaman yang dipilih

    if (pageName === "kasir") {

        document.getElementById("kasirPage")
            .style.display = "block";

    }


    else if (pageName === "produk") {

        document.getElementById("produkPage")
            .style.display = "block";

    }


    else if (pageName === "transaksi") {

        document.getElementById("transaksiPage")
            .style.display = "block";

    }


    else if (pageName === "laporan") {

        document.getElementById("laporanPage")
            .style.display = "block";

    }



    // Ubah menu aktif

    document.querySelectorAll(".menu")
        .forEach(menu => {

            menu.classList.remove("active");

        });


    menuElement.classList.add("active");

}