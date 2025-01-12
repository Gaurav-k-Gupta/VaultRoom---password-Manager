const { savePassword, getCredentials, updateCredential, deleteCredential } = require('../Controllers/AuthControllers.jsx');

const router = require('express').Router();

router.post('/save',savePassword);
router.post('/fetch',getCredentials);
router.post('/update',updateCredential);
router.post('/delete',deleteCredential);


module.exports = router;