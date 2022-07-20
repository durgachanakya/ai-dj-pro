song1 ="";
song2 = "";

leftWristx = 0;
leftWristy = 0;

rightWristx = 0;
rightWristy = 0;

scoreLeftwrist =0;
scoreRightwrist =0;

status1 = "";
status2 = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log("posenet is initialised");
}

function draw(){
    image(video,0,0,500,500);

    status1 = song1.isPlaying();
    status2 = song2.isPlaying();

    fill("lightgreen");
    stroke("lightgreen");

    if(scoreRightwrist > 0.2){
        circle(rightWristx,rightWristy,20);
        song2.stop();

        if(status1 == false){
            song1.play();
            document.getElementById("emptytag").innerHTML = "song 1 is playing";
        }
    }

    if(scoreLeftwrist > 0.2){
        circle(leftWristx,leftWristy,20);
        song1.stop();

        if(status2 == false){
            song2.play();
            document.getElementById("emptytag").innerHTML = "song 2 is playing";
        }
    }
}

function gotPoses(results){
    if(results.length > 0)
    {
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;

      leftWristx = results[0].pose.leftWrist.x;
      leftWristy = results[0].pose.leftWrist.y;

      rightWristx = results[0].pose.rightWrist.x;
      rightWristy = results[0].pose.rightWrist.y;
    }
}

