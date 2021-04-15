const dataFetch = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState===4 && this.status===200){
        console.log(this.response);
        const res= this.response
        let data=JSON.parse(res);
        let restaurantsDetails = data.restaurantsDetails;
        let orderBookDetails = data.orderBookDetails;
        populateTable(orderBookDetails);
        createHeader(restaurantsDetails)
        }
    };
    xhttp.open('GET', 'https://run.mocky.io/v3/16375822-6d22-4d61-b131-6672e9e13884', true)
    xhttp.send();
}

function createHeader(restaurantsDetails){
    let details={
        companyName:`${restaurantsDetails.companyName}<br>`
        , address:restaurantsDetails.address
        , city:`City-${restaurantsDetails.city}`
        , state:` , State-${restaurantsDetails.state}<br>`
        , phone:`Phone Number-${restaurantsDetails.phone}`
        , email:` , Email-${restaurantsDetails.email} <br>`
        , gstNo:`GST NO-${restaurantsDetails.gstNo}`
    }
    Object.keys(details).forEach((item,index)=> {  
        let text = document.createElement('span')
        text.setAttribute('id',item)
        text.innerHTML=details[item];
        document.getElementById('head').appendChild(text)
    })
}

const populateTable = (data)=>{
    // console.log(data,"ooo")
    let items= data.orderItemsList
    let sub= data.sub_total;
    let disc= data.discount_amount;
    let grand_total=data.grand_total;
    let time= data.timestamp;
    
    document.getElementById('sub').innerHTML=sub;
    document.getElementById('dis').innerHTML=disc;
    document.getElementById('grand').innerHTML=grand_total;
    let filteredData= items.map((item,key)=>({
        serial:key+1,
        name:item.menu_name,
        price:item.menu_price,
        qty:item.menu_quantity,
        amt:item.menu_amount
    }))
    console.log(filteredData)
    filteredData.forEach((i,index)=>{
        let tr=document.createElement('tr');
        tr.setAttribute('id',`${index}_tb`)
        document.getElementById('tableBody').appendChild(tr)
        Object.keys(i).forEach(k=>{
            let td=document.createElement('td');
            console.log("kk",i[k],td,tr)
            td.innerHTML=i[k];
            document.getElementById(`${index}_tb`).appendChild(td)
        })
    })
}