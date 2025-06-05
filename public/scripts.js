console.log(faceapi)

const run = async()=>{

    //loading the models is going to use await
    const stream = await navigator.mediaDevices.getUserMedia({
        video : true,
        audio : false
    })
    const videFeed = document.getElementById("video-feed");
    videFeed.srcObject = stream
}   
//we need to load our model
// pre-train machine learing fro our facial deataction!
  const model =    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri("./models")
    ])

run()