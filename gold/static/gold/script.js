const apiKey = 'z76BMS-VRisQJSHsNX2N';
const container = document.querySelector('#container');

var url = `https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD?column_index=1&api_key=${apiKey}`

var time = new Date();

var nasdaq = document.querySelector('#nasdaq');
nasdaq.textContent = "Fetching the data...";

fetch(url)
    .then(response => {
        return response.json();
        })
    .then(json => {
        theData = json;
        console.log(theData);
        nasdaq.innerHTML = `The price of Gold as of ${theData.dataset.data[0][0]} is $${theData.dataset.data[0][1]} per Troy Oz`;
        })
    .catch(err => {
        console.log(err);
        nasdaq.innerHTML = "There was an error recieving the data, please try again later";
    })

function convert() {
    let val = document.querySelector('#value');
    let unit = document.querySelector('#unit');
    let err = false;

    if (Number.isNaN(Number.parseFloat(val.value)) || val.value < 0 || !['T', 'g', 't_oz', 'kg', 'lb', 'oz'].includes(unit.value)) {
        err = true;
        console.log("error");
    }

    if (val.value != 1) {
        var s = "s";
    } else {
        var s = "";
    }

    let div = document.createElement('div');
    div.setAttribute("class", "green stuff-box");
    div.addEventListener('click', () => {
        div.remove();
    })

    let p = document.createElement('p');
    if (err) {
        div.setAttribute("class", "red stuff-box");
        p.innerHTML = `An error occured, check your inputs. Input can't be empty, a string, or negative`;
    } else {
        fetch(`http://localhost:8000/unitconv/convert?from=${unit.value}&to=t_oz&value=${val.value}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                unitconv = json
                console.log(unitconv);
                p.innerHTML = `At ${time} ${val.value} ${unit.value}${s} of Gold is worth $${(Math.round((unitconv.value * theData.dataset.data[0][1]) * 100)/100).toLocaleString()}`;
            })
            .catch(err => {
                console.log(err);
                div.setAttribute("class", "red stuff-box");
                p.innerHTML = `At ${time} there was an error recieving the data, please try again later`;
            })
    }

    div.appendChild(p);
    container.prepend(div);
}