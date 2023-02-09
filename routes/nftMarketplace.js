const express = require('express')
const router = express.Router()

const { mintNFT, listNFT, unlistNFT, updatePriceNFT, buyNFT, getTotalNFT, getNFT, getAllNFT, getUserNFT } = require('../controllers/nftMarketplace')

router.route('/').get(getAllNFT).get(getTotalNFT).post(mintNFT)
router.route('/:id').get(getNFT).patch(listNFT).patch(unlistNFT).patch(updatePriceNFT).patch(buyNFT)
router.route('/:user').get(getUserNFT)

module.exports = router