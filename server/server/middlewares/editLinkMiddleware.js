import { check, validationResult } from 'express-validator';
import LinkValidator from '../utils/linkValidator.js';
import IpValidator from '../utils/ipValidator.js';
import hasWhiteSpace from '../utils/hasWhiteSpace.js'
import formatLink from '../utils/formatLink.js';


export const editLinkValidation = [
    check('data.originalLink', 'the originalLink must exists').exists(),
    check('data.originalLink', 'the originalLink must be a string').isString().custom((value, {req})=>{
      if(hasWhiteSpace(req.data.originalLink)) {
        throw new Error('Link validation failed');
      }
      let formattedLink = formatLink(req.data.originalLink);
      let res = LinkValidator(formattedLink);
      if(!res.status) {
        throw new Error('Link validation failed');
      }
      return true;
   }),
    check('data.originalLink', 'the originalLink must have length at least 1').isLength({ min: 1 }),
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
  
  export function handleEditLinkValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  };