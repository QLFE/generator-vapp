var models="phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone";
var deviceInfo={model:"unknown",os:"unknown",manufacturer:"unknown",os_version:"unknown"};

models.split("|").forEach(function(e,i){
    if((navigator.userAgent.match(new RegExp(e)))){
        deviceInfo["model"]=e;
        return false;
    }
    return true;
});

if(deviceInfo["model"]=="Android"){
    deviceInfo["os"]="Android";
    deviceInfo["os_version"]=navigator.userAgent.match(/Android (.*);/i)[1];
}
else if("iPhone|iPod|ios|iPad".match(new RegExp(deviceInfo["model"]))){
    deviceInfo["manufacturer"]="Apple";
    deviceInfo["os"]="iOS";
    deviceInfo["os_version"]=navigator.userAgent.match(/iPhone OS (\d+_\d+) like/i)[1];
}

export default deviceInfo;