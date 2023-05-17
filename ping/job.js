export default (instance) => {
    return async function (req, res) {
        if (instance == undefined || instance == null) {
            res.status(500);
            res.send('Page instance down');
        }
        else {
            res.status(200);
            res.send('Page active');
        }
    }
} 