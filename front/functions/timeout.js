export default timeout = ms => {
    return new Promise(res => setTimeout(res, ms));
}