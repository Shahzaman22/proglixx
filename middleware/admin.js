module.exports = async (req, res,next) => {
    // console.log("REQ USER => ",req.user);
    if(req.user.userRole !== 'admin'){
        return res.status(403).send('Access denied. Only admin can access')
    }
    else{
        next()
    }
}