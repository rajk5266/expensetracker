const express = require('express')
const router = express.Router()

const appcontroller = require('../controllers/appcontroller')
router.get('/', appcontroller.showhtmlFile)

router.get('/actionendpoint', appcontroller.getExpensesList)

router.post('/actionendpoint', appcontroller.addExpense)

router.delete('/actionendpoint/:expenseID', appcontroller.deleteExpense)

router.put('/actionendpoint/:updateId', appcontroller.updateExpense)
module.exports = router