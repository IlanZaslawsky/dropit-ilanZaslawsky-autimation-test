const { test, expect } = require('@playwright/test');
const APIHelpers = require('../helpers/apiHelpers');
const ResponseValidator = require('../helpers/responseValidator');
const petData = require('../data/petData');

test.describe('Petstore API Tests', () => {
  const api = new APIHelpers('https://petstore.swagger.io/v2');

  test('Create, Update, and Find Pets', async () => {
    // Step 1: Create a new pet
    const createResponse = await api.createPet(petData.newPet);
    expect(createResponse.ok()).toBeTruthy();
    const createdPet = await createResponse.json();
    expect(createdPet.name).toBe(petData.newPet.name);
    expect(createdPet.status).toBe(petData.newPet.status);

    // Step 2: Update the pet's status to "sold"
    const updateResponse = await api.updatePet(petData.updatedPet);
    expect(updateResponse.ok()).toBeTruthy();
    const updatedPet = await updateResponse.json();
    expect(updatedPet.status).toBe(petData.updatedPet.status);

    // Step 3: Find pets by status "available" and validate the fourth pet name
    const availablePetsResponse = await api.findPetsByStatus('available');
    expect(availablePetsResponse.ok()).toBeTruthy();
    const availablePets = await availablePetsResponse.json();
    expect(availablePets.length).toBeGreaterThan(3);
    ResponseValidator.validateFourthPetName(availablePets, 'Puff');
    console.log('Fourth pet object:', availablePets[3]);

    // Step 4: Find pets by status "sold" and validate all returned pets have the expected status
    const soldPetsResponse = await api.findPetsByStatus('sold');
    expect(soldPetsResponse.ok()).toBeTruthy();
    const soldPets = await soldPetsResponse.json();
    expect(soldPets.length).toBeGreaterThan(0);
    ResponseValidator.validatePetStatus(soldPets, 'sold');
  });
});
