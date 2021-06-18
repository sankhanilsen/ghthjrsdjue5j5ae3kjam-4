rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
song1Status = "";
song2Status = "";
scoreRwrist = 0;
scoreLwrist = 0;

function setup() {
    canvas = createCanvas(650, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("model is loaded !");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLwrist = results[0].pose.keypoints[9].score;
        scoreRwrist = results[0].pose.keypoints[10].score;
        console.log("scoreLwrist= " + scoreLwrist + " scoreRwrist= " + scoreRwrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX= " + rightWristX + " rightWristY= " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX= " + leftWristX + " leftWristY= " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 650, 450);
    stroke('#ff0000');
    fill('#ff0000');
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    if (scoreLwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2Status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Stitches - Shawn Mendes";
        }
    }
    if (scoreRwrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1Status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Intentions - Justin Bieber";
        }
    }
}
song1 = "Intentions - Justin Bieber.mp3";
song2 = "Stitches - Shawn Mendes.mp3";

function preload() {
    song1 = loadSound('Intentions - Justin Bieber.mp3');
    song2 = loadSound('Stitches - Shawn Mendes.mp3');
}

function play() {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);

    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}