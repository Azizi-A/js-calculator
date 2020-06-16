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