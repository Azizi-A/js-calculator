// Initalise variables
let input = '';
let output = '';
let calculator = document.querySelector('#calculator')
let displayOutput = document.querySelector('#display-output');
let displayIntput = document.querySelector('#display-input')

// Initalise display
const updateDisp = () => {
    displayIntput.textContent = input;
    displayOutput.textContent = output;
}
const clearDisp = () => {
    input = '';
    output = '';
    updateDisp()
}
updateDisp()

/*-----Calculator display changes-----*/
calculator.addEventListener('click',(e) => {
    // find which button has been pressed
    let btnName = e.target.getAttribute('id') || e.target.parentElement.getAttribute('id')

    if (btnName == 'clear') { clearDisp(); }
    else if (btnName == 'equals') { output = parsePlusSeparExpr(input); }

    // number buttons
    else if (btnName == 'decimal') { input += '.'; }
    if (btnName == 'zero') { input += '0'; }
    if (btnName == 'one') { input += '1'; }
    if (btnName == 'two') { input += '2'; }
    if (btnName == 'three') { input += '3'; }
    if (btnName == 'four') { input += '4'; }
    if (btnName == 'five') { input += '5'; }
    if (btnName == 'six') { input += '6'; }
    if (btnName == 'seven') { input += '7'; }
    if (btnName == 'eight') { input += '8'; }
    if (btnName == 'nine') { input += '9'; }
    // operator buttons
    if (btnName == 'divide') { input += '/'; }
    if (btnName == 'multiply') { input += '*'; }
    if (btnName == 'add') { input += '+'; }
    if (btnName == 'subtract') { input += '-'; }

    console.log('btn ID is', btnName)
    updateDisp()
})

/*-----Calculator Logic-----*/
// parse * / - +
const parsePlusSeparExpr = (expression) => {
    // convert string to array of no.s
    const arr = split(expression, '+').map(parseMinusSeparExpr);
    // sum array
    const result = arr.reduce((tot, no) => tot + no);
    return result;
}
// parse * / -
const parseMinusSeparExpr = (expression) => {
    // convert string to array of no.s
    const arr = split(expression, '-').map(parseDivisionSeparExpr);
    // minus array
    const result = arr.reduce((tot, no) => tot - no);
    return result;
}
// parse both * /
const parseDivisionSeparExpr = (expression) => {
    // convert string to array of no.s
    const arr = split(expression, '/').map(parseMultiplicationSeparExpr);
    // divide array
    const result = arr.reduce((tot, no) => tot / no);
    return result;
}
// parse strings only of no.s and * opperation
const parseMultiplicationSeparExpr = (expression) => {
    // convert string to array of no.s or pass back through functions for parts in brackets 
    const arr = split(expression, '*').map((numStr) => {
        return numStr[0] === '(' ? parsePlusSeparExpr(numStr.substr(1, numStr.length - 2)) : Number(numStr)
    });
    // multiply array
    const result = arr.reduce((tot, no) => tot * no);
    return result;
}

// split expression by opperator but don't split in parentheses
const split = (expression, operator) => {
    const result = [];
    let braces = 0;
    let currentChunk = "";
    for (let i = 0; i < expression.length; i++) {
        const curCh = expression[i];
        if (curCh == '(') { braces++; }
        else if (curCh == ')') { braces--; }

        if (braces == 0 && operator == curCh) {
            result.push(currentChunk);
            currentChunk = "";
        } else { currentChunk += curCh; }
    }
    if (currentChunk != "") {
        result.push(currentChunk);
    }
    return result;
};