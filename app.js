const charLength=document.querySelector('input[type="range"]')
const charLengthDisplay=document.querySelector('.char_length_val')
const generateBtn=document.querySelector('.generate_btn')
const arrowIcon=document.querySelector('.fa-arrow-right')
const strengthBars=document.querySelectorAll('.strength_bar')
const uppercaseBtn=document.querySelector('.uppercase')
const lowercaseBtn=document.querySelector('.lowercase')
const numberBtn=document.querySelector('.number')
const symbolBtn=document.querySelector('.symbol')
const checkedBoxes=document.querySelectorAll('input[type="checkbox"]')
const passwordDisplay=document.querySelector('.display')
const copyIcon=document.querySelector('#copy_icon')
const lowerAlphabets='abcdefghijklmnopqrstuvwxyz'
const upperAlphabets='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const number=[0,1,2,3,4,5,6,7,8,9]
const symbol='!@#$%^&*()_+}{}[]<>?/|\~'
let upperLimit=charLength.value;
let strength=0

charLength.addEventListener('input',(event)=>{
    charLengthDisplay.textContent=event.target.value
    upperLimit=event.target.value
})

function strengthSetter(color,level){
    for(let strength of strengthBars){
        strength.style.background='#262626'
    }
    let idx=0;
    while(idx<level){
        strengthBars[idx].style.background=color
        idx+=1;
    }
}
function strengthCalculator(){
    let checkedCount=0;
    for(let box of checkedBoxes){
        if(box.checked){
            checkedCount+=1;
        }
    }
    if(checkedCount===1 && upperLimit<=6){
        strengthSetter('red',1)
    }
    else if(checkedCount===2 || (upperLimit<=8 && upperLimit>6)){
        strengthSetter('orangered',2)
    }
    else if(checkedCount===3 || (upperLimit<=10 && upperLimit>8)){
        strengthSetter('yellow',3)
    }
    else if(checkedCount===4 || upperLimit>10){
        strengthSetter('green',4)
    }
}

function randomizer(data){
    let random=Math.floor(Math.random()*data.length)
    let value=data[random]
    return value
}

function reshuffle(data){
    let number=data.length
    let shuffleNumber=Math.floor(Math.random()*number)
    let shuffleCount=0
    let temp=0
    while(shuffleCount<shuffleNumber){
        let idx=Math.floor(Math.random()*number)
        let idx1=Math.floor(Math.random()*number)
        if(idx===idx1){
            continue
        }
        temp=data[idx]
        data[idx]=data[idx1]
        data[idx1]=temp
        shuffleCount+=1
    }
    return data
}

function generatePassword(){
    let password=[]
    while((password.length+1)<=upperLimit){
        if(uppercaseBtn.checked){
            password.push(randomizer(upperAlphabets))
        }
        if(lowercaseBtn.checked){
            password.push(randomizer(lowerAlphabets))
        }
        if(numberBtn.checked){
            password.push(randomizer(number))
        }
        if(symbolBtn.checked){
            password.push(randomizer(symbol))
        }
    }
    password=reshuffle(password)
    passwordDisplay.textContent=password.join('')
}

function copyPassword(){
    navigator.clipboard.writeText(passwordDisplay.textContent)
}



generateBtn.addEventListener('mouseenter',()=>{
    arrowIcon.style.setProperty('--fa-display','inline-block')
})

generateBtn.addEventListener('mouseleave',()=>{
    arrowIcon.style.setProperty('--fa-display','none')
})

generateBtn.addEventListener('click',()=>{
    let checkedCount=0;
    for(let box of checkedBoxes){
        if(box.checked){
            checkedCount+=1;
        }
    }
    if(checkedCount!==0){
        generatePassword()
        strengthCalculator()
    }else{
        document.querySelector('.copy_alert').style.display='block'
        document.querySelector('.copy_alert').style.color='red'
        document.querySelector('.copy_alert').textContent='SELECT ATLEAST ONE CHECKBOX'
        
        setTimeout(()=>{
            document.querySelector('.copy_alert').style.display='none'
            document.querySelector('.copy_alert').style.color='rgb(0, 136, 0)'
            document.querySelector('.copy_alert').textContent='COPIED!'
        },2000)
    }
})

copyIcon.addEventListener('click',()=>{
    if(passwordDisplay.textContent!==''){
        copyPassword()
        document.querySelector('.copy_alert').style.display='block';
    }
})
