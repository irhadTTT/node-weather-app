//dohvatis podatke iz forme na indexu.hbs
const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#para1");
const messageTwo = document.querySelector("#para2");

form.addEventListener("submit", (event)=>{
    event.preventDefault();//preventuje refresh stranice
    const location = search.value;
    messageTwo.textContent = "";
    messageOne.textContent = "Loading data...";
    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = "";
                messageTwo.textContent = data.location + ":"+ data.forecast;
            }
        })
    })
});