import { body } from "express-validator"



/**
 * Validation field name
 */
export const nameVld = () => {
    return body('name').exists().withMessage('Не существует')
    .isString().withMessage('Не строка')
    .trim().isLength({min: 1, max: 45}).withMessage('Не корректная длина значения')
}

/**
 * Validation field email
 */
export const emaiVld = () => {
    return body('email').exists().withMessage('Не существует')
    .isString().withMessage('Не строка')
    .isEmail().withMessage('Не корректный email')
    .trim().isLength({min: 6, max: 50}).withMessage('Не корректная длина значения')
}


/**
 * Validation field phone
 */
export const phoneVld = () => {
    
    return body('phone').exists().withMessage('Не существует')
    .isString().withMessage('Не строка')
    .trim().isLength({min: 7, max: 25}).withMessage('Не корректная длина значения')
    .matches(/^[0-9 +()]+$/).withMessage('Не корректны номер телефона')    
}

/**
 * Validation field message
 */
export const messageVld = () => {
    return body('message').exists().withMessage('Не существует')
    .isString().withMessage('Не строка')
    .trim().isLength({min: 0, max: 545}).withMessage('Слишком длинное значение поля')
}




// exam custom
export const validBodyPostsExistBlogId = () => {
    return body('blogId').exists().withMessage('Не существует')
    .isString().withMessage('Is not string type')
    .custom(async () => {
        const blogId = null;
        if (!blogId) {
            throw new Error(""); 
        }
        return true;
    });
}

//-------------------------------------------------------------------------------------------------------


