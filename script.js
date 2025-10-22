const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|;"<,>.?/'
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");
 
function handleSlider() {
    inputSlider.value = passwordLength;
    console.log("script");
    console.log("shakti sigh");
    console.log("hellow world");
    
    lengthDisplay.innerHTML=passwordLength;
    


}

function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`

}

function getRndInteger(min,max){
  return  Math.floor(Math.random() * (max-min))+min;
}
function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase()
{
   return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase()
{
   return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol() {
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;
    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8)
    {
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6)
    {
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00"); 
    }

}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = "copied";
    } catch (e) {
        copyMsg.innerHTML = "failed";
    }

    copyMsg.classList.add("active");
    setTimeout(() =>{
        copyMsg.classList.remove("active");
    },2000);
}

function shufflePassword(array)
{
    // fisher yates method
    for ( let i = array.length - 1; i>0 ; i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str= "";
    array.forEach((el) => (str+= el));
    return str;
}

function handleCheckboxChange() {
    checkCount =0;
    allcheckBox.forEach((checkbox)=>{
      if(checkbox.checked){
        checkCount ++; 
      }
    });
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allcheckBox.forEach ((checkbox)=>{
    checkbox.addEventListener("change",handleCheckboxChange);
})

inputSlider.addEventListener("input",(e)=>{
 passwordLength = e.target.value;
 handleSlider();
})

copyBtn.addEventListener("click",()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})



generateBtn.addEventListener("click", () => {
    if(checkCount==0){
        return;
    }
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    // to remove the all generated password -> password ="" , empty string
    password = "";

    let funcArr = [];
if(uppercaseCheck.checked)
    funcArr.push(generateUpperCase);
if(lowercaseCheck.checked)
    funcArr.push(generateLowerCase);
if(numbersCheck.checked)
    funcArr.push(generateRandomNumber);
if(symbolsCheck.checked)
    funcArr.push(generateSymbol);

    for(let i=0; i<funcArr.length;i++)
    {
        password += funcArr[i]();
    }

    // remaining elements addition
    for(let i=0;i<passwordLength-funcArr.length; i++)
    {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    // shuffle the password
    password = shufflePassword(Array.from(password));
    // show the password in the ui
    passwordDisplay.value = password;
    // to calculate the password strength
    calStrength();

});



    



 
