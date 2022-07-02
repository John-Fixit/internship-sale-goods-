
const item = (req, res) => {
    const quantity = [
        { name: 'phone', qty: '20', price: '20000', isAvailable: true },
        { name: 'battery', qty: '10', price: '20000', isAvailable: true },
        { name: 'charger', qty: '50', price: '20000', isAvailable: true }
    ]
    res.send({ quantity: quantity })
}
const qtyPrice = (req, res) => {
    console.log(req.body);
    const userqty = req.body.userQuantity;
    const customer = req.body.customername
    const qtyNumber = parseInt(req.body.numberOfGood)
    const qtyAvailable = parseInt(req.body.qtyAvailable)
    const qtyPrice = parseInt(req.body.goodPrice)
    console.log(userqty, customer, qtyNumber, qtyAvailable,);
    if (qtyAvailable < qtyNumber) {
        res.send({ message: `Dear ${customer} the ${userqty} available is not upto ${qtyNumber}`, status: false, isAvailable: true })
    }
    else if (qtyNumber < 1) {
        res.send({ message: `Dear ${customer} the Number of ${userqty} you entered is invalid `, status: false, isAvailable: true })
    }
    else {
        const price = (qtyNumber) * (qtyPrice)
        console.log(price);
        res.send({ message: `Dear ${customer} your total price quote for ${qtyNumber} ${userqty} is #${price}`, status: true, isAvailable: true})
    }
}
module.exports = { item, qtyPrice }