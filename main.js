let times = document.getElementById('times');
let dice = document.querySelectorAll('.dice');
let rollButton = document.getElementById('rollButton'); 
let containerDiv = document.getElementById('container');

let numDice = 0;
let numTimes = 0;
rollButton.onclick = (e) =>{
    dice.forEach( (d) =>{
        if(d.checked){
            numDice = parseInt(d.id)
            console.log(numDice)
            d.checked = false;
        }
    })
    numTimes = parseInt(times.value);
    console.log(numTimes)
    times.value = "";
    e.preventDefault();
    createTable();
}

let lowBound = numDice;
let highBound = numDice * 6;

function rollDice(dice, times){
    let results = [];
    for(let i=0;i<times;i++){
        let resultArr = [];
        for(let j=0;j<dice;j++){
            let result = Math.floor(Math.random()*(5*dice) + dice + 1)
            console.log(result)
            resultArr.push(result)
        }
        console.log(resultArr)
        results.push(resultArr)
    }
    console.log(results)
    return results;
}

function findMode(a){
    a = a.slice().sort((x, y) => x - y);
  
    let bestStreak = 1;
    let bestElem = a[0];
    let currentStreak = 1;
    let currentElem = a[0];
  
    for (let i = 1; i < a.length; i++) {
      if (a[i-1] !== a[i]) {
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
          bestElem = currentElem;
        }
  
        currentStreak = 0;
        currentElem = a[i];
      }
  
      currentStreak++;
    }
  
    return currentStreak > bestStreak ? currentElem : bestElem;
  };



  function createTable(){
    let rollResults = rollDice(numDice, numTimes);
    let frequency = {};
    lowBound = numDice;
    highBound = numDice * 6;
    console.log(lowBound, highBound)
    for(let i=lowBound; i<=highBound; i++){
        frequency[i.toString()] = 0;
    }

    let formattedResults = [];
    let sum = 0;
    let doubles = 0;
    let triples = 0;
    rollResults.forEach( (d) =>{
        d.forEach( (c, index) =>{
            frequency[c.toString()]++;
            sum+=c;
            formattedResults.push(c);
            console.log(c, d[index+1])
            if(d.length>=2 && c==d[index+1]){
                doubles++
            }
            else if(d.length>=2 && c==d[index+2]){
                doubles++
            }
            else if(d.length==3 && c==d[index-1] && c==d[index+1]){
                triples++
            }
        })
    })
    console.log(frequency)
    formattedResults.sort(function(a, b){return a - b});
    console.log(formattedResults)


    //find mean, median, and mode
    let mean = Math.floor(sum/formattedResults.length);
    let median = 0;
    let length = formattedResults.length;
    if(length%2==0){
        median = (formattedResults[(length-2)/2] + formattedResults[(length)/2])/2
    }
    else{
        median = formattedResults[(length-1)/2];
    }
    let mode = findMode(formattedResults);
    
    let table1 = document.createElement("table");
    containerDiv.appendChild(table1);
    let headerRow = document.createElement("tr");
    let contentRow = document.createElement("tr");
    table1.append(headerRow, contentRow);
    if(numDice>=2){
        let doubleHeader = document.createElement("th");
        doubleHeader.innerHTML = "Doubles rolled"
        let doubleCell = document.createElement("td");
        doubleCell.innerHTML = doubles;
        headerRow.append(doubleHeader);
        contentRow.append(doubleCell);
    }
    if(numDice==3){
        let tripleHeader = document.createElement("th");
        tripleHeader.innerHTML = "Triples rolled"
        let tripleCell = document.createElement("td");
        tripleCell.innerHTML = triples;
        headerRow.appendChild(tripleHeader);
        contentRow.appendChild(tripleCell);
    }
    let meanHeader = document.createElement("th");
    meanHeader.innerHTML = "Mean"
    let medianHeader = document.createElement("th");
    medianHeader.innerHTML = "Median"
    let modeHeader = document.createElement("th");
    modeHeader.innerHTML = "Mode"
    headerRow.append(meanHeader, medianHeader, modeHeader)


    let meanCell = document.createElement("td");
    meanCell.innerHTML = mean
    let medianCell = document.createElement("td");
    medianCell.innerHTML = median
    let modeCell = document.createElement("td");
    modeCell.innerHTML = mode
    contentRow.append(meanCell, medianCell, modeCell)
    
    let table2 = document.createElement("table");
    containerDiv.appendChild(table2);
    let blankHeader = document.createElement("th");
    let frequencyHeader = document.createElement("th");
    frequencyHeader.innerHTML = "Frequency";
    table2.append(blankHeader, frequencyHeader)
    for(let i=lowBound; i<=highBound; i++){
        let row = document.createElement("tr");
        table2.appendChild(row)
        let cell1 = document.createElement("td");
        cell1.innerHTML = i;
        let cell2 = document.createElement("td");
        cell2.innerHTML = frequency[i.toString()];
        row.append(cell1, cell2)
    }
}