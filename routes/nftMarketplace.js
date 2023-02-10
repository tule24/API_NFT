const express = require('express')
const router = express.Router()

const { mintNFT, updateNFT, getNFT, getAllNFT, deleteNFT, getNFTStats, getYearlyPlan } = require('../controllers/nftMarketplace')

// ROUTER NFTs
router.route('/').get(getAllNFT).post(mintNFT)
router.route('/:id').get(getNFT).patch(updateNFT).delete(deleteNFT)

router.route('/nft-stats').get(getNFTStats)
router.route('/yearly-plan/:year').get(getYearlyPlan)

module.exports = router