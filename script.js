let selectedX ='';
let activeB=null;
document.querySelectorAll('.x-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (activeB) {
            activeB.classList.remove('active');
        }
        activeB = e.target;
        activeB.classList.add('active');
        selectedX = activeB.value;
        document.getElementById('selectedX').value = selectedX;
    })
})

document.getElementById('coordinates').addEventListener('submit', (submit) => {
    let x=selectedX;
    let y = document.getElementById('getY').value.trim().replace(',', '.');
    let chr=document.querySelector('input[name="R"]:checked');
    let r = chr ? chr.value : '';

    if (!validate(x, y, r)) {
        submit.preventDefault()
        return
    }

    submit.preventDefault();
    res(x, y, r);

})

function validate(x, y, r){
    if (x==='' || isNaN(x)){
        alert("Выберите значение X");
        return false;
    }

    if (y==='' || isNaN(y) || isNaN(y)>5 || isNaN(y) <-5 || isNaN(y)){
        alert("Y должно быть числом в диапазоне от -5 до 5")
        return false;
    }

    if (r==='' || isNaN(r) || r<=0){
        alert("Выберите значение R")
        return false;
    }
    return true;
}

function res(x, y, r) {
    let numX = parseFloat(x);
    let numY = parseFloat(y);
    let numR = parseFloat(r);

    let resSuccess=((numX<=numR && numY<=numR/2 && numX>=0 && numY>=0) || (numX>=0 && numY<=0 && numY>=numX-numR) || (numX*numX+numY*numY<=numR*numR && numX<=0 && numY<=0));
    let result=resSuccess ? "попадание" : "промах";
    let currentTime = new Date().toLocaleTimeString();

    let newRow = `
        <tr>
            <td>${x}</td>
            <td>${y}</td>
            <td>${r}</td>
            <td>${result}</td>
            <td>${currentTime}</td>
            <td>0.001s</td>
        </tr>
    `;

    let output = document.getElementById('output');
    if (output) {
        output.innerHTML = newRow+output.innerHTML;
    }
}