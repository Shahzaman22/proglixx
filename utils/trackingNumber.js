const trackingNumberr = () => {
    let digits = "123456789"
    let trackingNumber = ""

    for (let i = 0; i < 5; i++) {
      trackingNumber += digits[Math.floor(Math.random() * 4)]
    }
    console.log(trackingNumber)
    return trackingNumber;
   
  }
  
exports.trackingNumberr = trackingNumberr