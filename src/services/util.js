const epCatch = (res, err, status = 500) => {
    res
        .status(500)
        .json({
            error: err.message
        })
}

module.exports = {
    epCatch
}