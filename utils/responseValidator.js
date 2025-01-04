class ResponseValidator {
    static validatePetStatus(pets, expectedStatus) {
      pets.forEach((pet) => {
        if (pet.status !== expectedStatus) {
          throw new Error(`Pet with ID ${pet.id} has unexpected status: ${pet.status}`);
        }
      });
    }
  
    static validateFourthPetName(pets, expectedName) {
      if (!pets[3]) {
        throw new Error('Less than 4 pets returned in the response.');
      }
      if (pets[3].name !== expectedName) {
        throw new Error(`Expected fourth pet name to be ${expectedName}, but got ${pets[3].name}`);
      }
    }
  }
  module.exports = ResponseValidator;
  