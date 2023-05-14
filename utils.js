class utils{
    sleep(msec){
        return new Promise(resolve => setTimeout(resolve, msec))
    }

    CastToBoolean(parameter){
        return (parameter === 'true');
    }
}

export default utils;
