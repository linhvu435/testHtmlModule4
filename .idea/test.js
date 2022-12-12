function show() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products",
        //xử lý khi thành công
        success: function (data) {
            let str = "";
            for (let i = 0; i < data.length; i++) {

                str += "<tr>"
                str += `<div>`
                str += `<td>${data[i].id}</td>`
                str += `<td>${data[i].name}</td>`
                str += `<td><img src="${data[i].img}" height="150" width="200"></td>`
                str += `<td>${data[i].price}</td>`
                str += `<td>${data[i].amount}</td>`
                str += `<td><input type="number" value="1"  min="1" id="${data[i].id}" ></td>`
                str += `<td><button onclick="putInCart('${data[i].id}','${data[i].name}','${data[i].img}','${data[i].price}')">cho vao gio hang</button></td>`
                str += `</div>`
                str += "</tr>"
            }
            // location.href = "ChiTietSanPham.html"
            document.getElementById("tbody").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}


show();

class Product {
    id;
    name;
    img;
    price;
    amount;

    constructor(id,name,img,price,amount) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.amount = amount;

    }
}

let ProductList =[]
function putInCart(id,name,img,price){
    let str = '<table align="center">'
    let buy = new Product(id,name,img,price,$("#"+id).val())
    ProductList.push(buy);
    console.log(ProductList)
}

function showCart(){
    let str = '<table align="center">'
    for (let i = 0; i < ProductList.length; i++) {
        str += `
            <tr>
            <td><img  style="width: 500px;height: 500px" src="${ProductList[i].img}"> ${ProductList[i].name} ${ProductList[i].price} ${ProductList[i].amount} ${ProductList[i].price*ProductList[i].amount}</td> <br>
            <td><button onclick="xoa(${i})">Bỏ Khỏi Giỏ Hàng</button></td>
            </tr>
          `
    }

    str += '</table>  <p style="font-size: 50px"> Tổng Tiền  = ' + productPrice() + 'Triệu</p>  <button onclick="buyProduct()">Thanh Toan</button>';

    document.getElementById('tbody').innerHTML = str
}

function xoa(index)
{
    ProductList.splice(index,1)
    showCart();
}

function productPrice(){
    let sum =0
    for(let i = 0; i<ProductList.length;i++)
    {
        sum += parseFloat(ProductList[i].price*ProductList[i].amount)
    }
    return sum
}

function buyProduct(){

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/products",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(ProductList),
            success: function () {

            }
        });

}