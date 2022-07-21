var song1="";
var song2="";
var leftwristx=0;
var leftwristy=0;
var rightwristx=0;
var rightwristy=0;
var scoreleftwrist=0;
var scorerightwrist=0;
song1status="";
function preload(){
song1=loadSound("song1.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose", gotposes);
}
function draw(){
image(video,0,0,600,500);
fill("red");
stroke("red");
if(scorerightwrist>0.2){
circle(rightwristx,rightwristy,20);
if(rightwristy>0&&rightwristy<=100){
document.getElementById("speed").innerHTML="speed=0.5x";
song1.rate(0.5);
}
else if(rightwristy>100&&rightwristy<=200){
    document.getElementById("speed").innerHTML="speed=1x";
    song1.rate(1);
    }
else if(rightwristy>200&&rightwristy<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song1.rate(1.5);
        }
else if(rightwristy>300&&rightwristy<=400){
            document.getElementById("speed").innerHTML="speed=2x";
            song1.rate(2);
            }
else if(rightwristy>400){
                document.getElementById("speed").innerHTML="speed=2.5x";
                song1.rate(2.5);
                }
}
if(scoreleftwrist>0.2){
circle(leftwristx,leftwristy,20);
innumberleftwristy=Number(leftwristy);
newleftwristy=floor(innumberleftwristy*2);
leftwristydivide=newleftwristy/1000;
document.getElementById("volume").innerHTML="volume="+leftwristydivide;
song1.setVolume(leftwristydivide);
}
}
function stgrade(){
song1.play();
}
function modelLoaded(){
console.log("poseNet is intialized");
}
function gotposes(results){
console.log(results);
if (results.length>0){
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("lwx="+leftwristx+"lwy="+leftwristy+"rwx="+rightwristx+"rwy="+rightwristy);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
}
}