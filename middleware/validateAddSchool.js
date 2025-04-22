import { body,query } from 'express-validator';

const validateSchool = [
    body('name').notEmpty().withMessage('School name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('latitude').isFloat().withMessage('Latitude is required'),
    body('longitude').isFloat().withMessage('Longitude is required'),
]

const validateLocation = [
    query('latitude').isFloat().withMessage('Latitude is required and must be float'),
    query('longitude').isFloat().withMessage('Longitude is required and must be float')
  ]

export { validateSchool,validateLocation };