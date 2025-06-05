console.log(faceapi)

const run = async()=>{

    //loading the models is going to use await
    const stream = await navigator.mediaDevices.getUserMedia({
        video : true,
        audio : false
    })
    const videFeed = document.getElementById("video-feed");
    videFeed.srcObject = stream


       
//we need to load our model
// pre-train machine learing fro our facial deataction!
 await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri("./models")
    ])
  //make the canvas the samesize and in the same location as our  vide feed
    const canvas = document.getElementById('canvas')
     canvas.style.left = videFeed.offsetLeft
     canvas.style.top = videFeed.offsetTop
     canvas.height = videFeed.height;
     canvas.width = videFeed.width

     //facial deataction weith points 
    setInterval(async() => {
        //get the video feed and hand it to detact allfaces method 
        let faceData = await faceapi.detectAllFaces(videFeed).withFaceLandmarks().withFaceDescriptors().withAgeAndGender().withFaceExpressions()
        console.log(faceData);

      canvas.getContext('2d').clearRect(0,0, canvas.width , canvas.height)

         faceData = faceapi.resizeResults(faceData , videFeed)
         faceapi.draw.drawDetections(canvas , faceData)
         faceapi.draw.drawFaceLandmarks(canvas , faceData);
         faceapi.draw.drawFaceExpressions(canvas , faceData) 
         

         //aask ai guss the age and gender with confidernce level
           faceData.forEach(face =>{
            const {age  , gender , genderProbability} = face;
            const genderText = `${gender} -${Math.round(genderProbability *100)/100*100}`
            const ageText = `${Math.round(age)} years`
            const textField = new faceapi.draw.DrawTextField([genderText , ageText] , face.detection.box.topRight);
            textField.draw(canvas)
         })

     }, 200);

    
}


run()