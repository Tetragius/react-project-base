class ValidationService {
    validateInput = (value) => value.length > 10;
}

export default new ValidationService();