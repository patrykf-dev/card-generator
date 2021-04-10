cardImageSrc = null;

function refreshBtnOnClick() {
    redrawCard("La Ura Giga", "15", "Lorem ipsum Lorem ipsum Lorem ipsum", "1000");
}

function handlePasteEvent(imageBlob) {
    var URLObj = window.URL || window.webkitURL;
    cardImageSrc = URLObj.createObjectURL(imageBlob);
    redrawCard("La Ura Giga", "15", "Lorem ipsum Lorem ipsum Lorem ipsum", "1000");
}

function getCanvasCtx() {
    var canvas = document.getElementById('main-canvas');
    return canvas.getContext('2d');
}

function redrawCard() {
    cardName = document.getElementById("txtName").value;
    manaNeutral = document.getElementById("txtManaNeutral").value;
    manaClass = document.getElementById("txtManaClass").value;
    description = document.getElementById("txtMsg").value;
    power = document.getElementById("txtPower").value;
    red = document.getElementById("txtRed").value;
    green = document.getElementById("txtGreen").value;
    blue = document.getElementById("txtBlue").value;
    if (red == "") red = 255;
    if (green == "") green = 255;
    if (blue == "") blue = 255;

    var canvas = document.getElementById('main-canvas');
    canvas.width = 600;
    canvas.height = 800;
    canvas.crossOrigin = "Anonymous";
    var ctx = getCanvasCtx();

    var template = new Image();
    template.onload = function () {
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ', 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "28pt Verdana";
        ctx.fillText(cardName, 25, 72);

        var manaClassX = 495;
        var manaNeutralX = 554;
        if(manaClass.length > 1)
            manaClassX -= 12;
        if(manaNeutral.length > 1)
            manaNeutralX -= 12;
        ctx.fillText(manaClass, manaClassX, 51);
        ctx.fillText(manaNeutral, manaNeutralX, 51);
        ctx.fillText(power, 482, 767);
        ctx.font = "16pt Verdana";

        var originalLines = description.split('\n');

        var lineY = 492;
        for (var j = 0; j < originalLines.length; j++) {
            var lines = wordWrap(originalLines[j], 50).split('\n');
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 25, lineY);
                lineY += 23;
            }
        }

        if (cardImageSrc != null) {
            var cardImage = new Image();
            cardImage.onload = function () {
                ctx.drawImage(cardImage, 18, 106, 563, 352);
            };
            cardImage.src = cardImageSrc;
        }
    };
    template.src = '/static/template13.png';
}

function retrieveImageFromClipboardAsBlob(pasteEvent, callback) {
    if (pasteEvent.clipboardData == false) {
        if (typeof (callback) == "function") {
            callback(undefined);
        }
    }

    var items = pasteEvent.clipboardData.items;

    if (items == undefined) {
        if (typeof (callback) == "function") {
            callback(undefined);
        }
    }

    for (var i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") == -1) continue;
        // Retrieve image on clipboard as blob
        var blob = items[i].getAsFile();

        if (typeof (callback) == "function") {
            callback(blob);
        }
    }
}

function wordWrap(str, maxWidth) {
    var newLineStr = "\n";
    done = false;
    res = '';
    while (str.length > maxWidth) {
        found = false;
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

    }

    return res + str;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
};