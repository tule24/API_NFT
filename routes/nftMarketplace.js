const express = require('express')
const router = express.Router()

const { mintNFT, listNFT, unlistNFT, updateNFT, buyNFT, getNFT, getAllNFT, getUserNFT, deleteNFT, getNFTStats, getYearlyPlan } = require('../controllers/nftMarketplace')

// ROUTER NFTs
router.route('/').get(getAllNFT).post(mintNFT)
router.route('/:id').get(getNFT).patch(updateNFT).delete(deleteNFT)
router.route('/:user').get(getUserNFT)

router.route('/nft-stats').get(getNFTStats)
router.route('/yearly-plan/:year').get(getYearlyPlan)

module.exports = router