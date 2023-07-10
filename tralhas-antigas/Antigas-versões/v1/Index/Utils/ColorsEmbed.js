function Random() {
    const SetColor = parseInt(Math.floor(Math.random() * 16777215).toString(16));
    return SetColor;
}

function Green() {
    const SetColor = parseInt('008000');
    return SetColor;
}

function Red() {
    const SetColor = parseInt('FF0000');
    return SetColor;
}

function Blue() {
    const SetColor = parseInt('0099FF');
    return SetColor;
}

function Yellow() {
    const SetColor = parseInt('FFFF00');
    return SetColor;
}

function Pink() {
    const SetColor = parseInt('FFC0CB');
    return SetColor;
}

function LimeGreen() {
    const SetColor = parseInt('00FF00');
    return SetColor;
}

module.exports = {
    Random,
    Green,
    Red,
    Blue,
    Yellow,
    Pink,
    LimeGreen,
};
