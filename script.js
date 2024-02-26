//-------------------CAT API-------------------
// const URL = "https://cat-fact.herokuapp.com/facts";
// // const URL = "https://dog.ceo/api/breeds/image/random";

// let h1= document.querySelector("h1");
// let button= document.querySelector("button");

// async function getFacts()
// {
//     let catFact = await fetch(URL);
//     let facts = await catFact.json();

//     let rand = Math.floor(Math.random()*5);
//     h1.innerText = facts[rand].text;
    
// }

// button.addEventListener("click",getFacts);

//-------------------CAT API-------------------

const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let dropdowns = document.querySelectorAll(".drop_down select");
let flags = document.querySelectorAll(".drop_down img");
let btn = document.querySelector("#submit");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg =  document.querySelector("#msg");

window.addEventListener("load", ()=>
{
    getExchangeRate();
});

for (const dropdown of dropdowns)
{
    for (let code in countryList)
    {
        // console.log(code, countryList[code])
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        dropdown.append(newOption);
        if (newOption.value === "USD" && dropdown.name==="from") 
        {
            newOption.selected = "selected";
            // flags[0].setAttribute();
        } 
        else if (newOption.value === "PKR" && dropdown.name==="to")
        {
            newOption.selected = "selected";   
        }
    }
    dropdown.addEventListener("change", (evt)=>
    {
        updateFlag(evt.target);
    });
}

function updateFlag(event)
{
    let currencyCode = event.value;
    let countryCode = countryList[currencyCode];
    // console.log(countryCode);

    let flag = event.parentElement.querySelector("img");
    // console.log(flag);
    flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", async (event)=>
{
    event.preventDefault();
    getExchangeRate();
});

async function getExchangeRate()
{
    let amount = document.querySelector("form input");
    if(amount.value < 1 || amount.value == "")
    {
        amount.value = 1;
    }
    // console.log(amount.value);
    // console.log(fromCurr.value, toCurr.value);
    
    let newURL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    
    // console.log(newURL);
    let response = await fetch(newURL);
    let rate = await response.json();
    let exchangeRate = rate[toCurr.value.toLowerCase()];
    // console.log(exchangeRate);
    msg.innerText = `${amount.value}${fromCurr.value} = ${(amount.value * exchangeRate).toFixed(3)}${toCurr.value}`;
}