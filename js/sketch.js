let faceapi;
let detections = []

let video;
let canvas;
let capture
function setup() {
    canvas = createCanvas(480, 360);
    var constraints = {
        audio: false,
        video: {

            facingMode: "environment",
            frameRate: 10
        }
    };
    capture = createCapture(constraints);
    capture.elt.setAttribute('playsinline', '');
    // capture.elt.setAttribute('playsinline', '')
    capture.hide();

    const faceOptions = {
        withLandmarks: true,
        withExpressions: true,
        withDescriptors: false,
        minConfidence: 0.5
    }
    faceapi = ml5.faceApi(
        capture,
        faceOptions,
        faceReady
    )

}

function faceReady() {
    faceapi.detect(gotFaces)
}

function gotFaces(error, result) {
    if (error) {
        console.log(error)
        return
    }
    detections = result;
    console.log(detections)

    clear()
    // drawBoxes(detections)
    drawExpressions(detections, 20, 25, 14)
    // image(capture, 0, 0)


    faceapi.detect(gotFaces);
}


function drawBoxes(detections) {
    if (detections.length > 0) {
        for (let f = 0; f < detections.length; f++) {
            let { _x, _y, _width, _height } = detections[0].alignedRect._box;

            stroke(44, 169, 225)
            strokeWeight(1);
            noFill()
            rect(_x, _y, _width, _height);
        }
    }
}
function drawExpressions(detections, x, y, textYSpace) {
    if (detections.length > 0) {
        let { neutral, happy, angry, sad, disgusted, surprised, fearful }
            = detections[0].expressions;
        textFont('Helvetica Neue');
        textSize(14);
        noStroke();
        fill(44, 169, 225);

        text("neutral:       " + nf(neutral * 100, 2, 2) + "%", x, y);
        text("happiness: " + nf(happy * 100, 2, 2) + "%", x, y + textYSpace);
        text("anger:        " + nf(angry * 100, 2, 2) + "%", x, y + textYSpace * 2);
        text("sad:            " + nf(sad * 100, 2, 2) + "%", x, y + textYSpace * 3);
        text("disgusted: " + nf(disgusted * 100, 2, 2) + "%", x, y + textYSpace * 4);
        text("surprised:  " + nf(surprised * 100, 2, 2) + "%", x, y + textYSpace * 5);
        text("fear:           " + nf(fearful * 100, 2, 2) + "%", x, y + textYSpace * 6);
    } else {//If no faces is detected: 顔が1つも検知されていなかったら
        text("neutral: ", x, y);
        text("happiness: ", x, y + textYSpace);
        text("anger: ", x, y + textYSpace * 2);
        text("sad: ", x, y + textYSpace * 3);
        text("disgusted: ", x, y + textYSpace * 4);
        text("surprised: ", x, y + textYSpace * 5);
        text("fear: ", x, y + textYSpace * 6);
    }
}
