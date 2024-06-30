import { check, validationResult } from 'express-validator';
import LinkValidator from '../utils/linkValidator.js';
import IpValidator from '../utils/ipValidator.js';

export const addLinkValidation = [
    check('data.links', 'the links must exists').exists(),
    check('data.links', 'the links must be array').isArray().custom((value, {req})=>{
      let res = LinkValidator(req.data.links);
      if(!res.status) {
        throw new Error('Link validation failed');
      }
      return true;
    }),
    check('data.links', 'the links must have at least one entry').isLength({ min: 1 }),
    check('data.category', 'the category must exist').exists(),
    check('data.category', 'the category must be a string').isString(),
    check('data.category', 'the category must have length at least 1').isLength({ min: 1 }),
    check('data.description', 'the description must exist').exists(),
    check('data.description', 'the description must be a string').isString(),
    check('data.description', 'the description must have length at least 1').isLength({ min: 1 }),
    check('data.allowedips', 'the allowedips must exists').exists(),
    check('data.allowedips', 'the allowedips must be array').isArray().custom((value, {req})=>{
      let res = IpValidator(req.data.allowedips);
      if(!res.status) {
        throw new Error('IP validation failed');
      }
      return true;
   }),
  ];
  
export function handleAddLinkValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  };