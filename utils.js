class utils{
    sleep(msec){
        return new Promise(resolve => setTimeout(resolve, msec))
    }
}

export default utils;
