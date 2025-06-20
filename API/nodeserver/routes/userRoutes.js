const {Router} = require('express');
const {validateUserToken, validateGeneralUserToken} = require('../middleware/validateToken');

const {
    registerUser,
    updateUser,
    loginUser
} = require('../controller/userController');

const {
    createEvent,
    updateEvent,
    getAllAvailableEvents,
    getEventsWithAccessibilityC
} = require('../controller/eventController');

const { 
    getSectionsByEvent,
    getAvailableSeatsBySection
} = require('../controller/seatCreationController');

const { 
    createSale 
} = require('../controller/saleController');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/user/:id', updateUser);

router.post('/event/create', createEvent);
router.put('/event/update/:id', updateEvent);
router.get('/event/available', getAllAvailableEvents);
router.get('/event/accessibility', getEventsWithAccessibilityC);

router.get('/sections/:idEvent', getSectionsByEvent);
router.get('/seats/:idSection', getAvailableSeatsBySection)

router.post('/sale/create', createSale);

module.exports = router;
