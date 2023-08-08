import test from 'node:test';
import assert from 'node:assert';
import { catCreationSchema } from '@app/domain/cat-schema';

test('Cat Creation Schema Validation', async (t) => {
  await t.test(
    'When creating a cat with a valid name, the catCreationSchema returns a cloned value of the input',
    () => {
      // Arrange
      const input = { name: 'Fluffykins' };

      // Act
      const result = catCreationSchema.parse(input);

      // Assert
      assert.deepEqual(result, input);
    }
  );
  await t.test(
    'When creating a cat without a name, the catCreationSchema throws an error',
    () => {
      // Arrange
      const input = {};
      const catCreationValidation = () => catCreationSchema.parse(input);

      // Act and assert
      assert.throws(catCreationValidation);
    }
  );
});
