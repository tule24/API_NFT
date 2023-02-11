const express = require('express')
const router = express.Router()

const { mintNFT, updateNFT, getNFT, getAllNFT, deleteNFT, getNFTStats, getYearlyPlan } = require('../controllers/nftMarketplace')
const {authMiddleware, restrictMiddleware} = require('../middlewares')

// ROUTER NFTs
router.route('/').get(getAllNFT).post(authMiddleware, mintNFT)
router.route('/:id').get(getNFT).patch(authMiddleware, updateNFT).delete(authMiddleware, restrictMiddleware("admin"), deleteNFT)

router.route('/nft-stats').get(getNFTStats)
router.route('/yearly-plan/:year').get(getYearlyPlan)

module.exports = router