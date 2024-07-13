const express = require('express');
const router = express.Router();
const {getRefs,addRef,deleteRef,updateRefs} = require('../controllers/refController');

router.get('/getrefs', getRefs);
router.post('/addref',addRef)
router.delete('/deleteref',deleteRef)
router.patch('/updateref',updateRefs)
module.exports = router;




// const express = require('express');
// const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Hello from referral routes!');
});

module.exports = router;
