import {
  CatRepository,
  standardCatRepository,
} from '@app/data-access/cat.repository';
import { Cat } from './cat-schema';
import { isValidCatCreationInput } from './cat-validation';

// ️️️✅ Best Practice: The function factory pattern - Create functions through a factory that has it's dependencies passed down (IoC)
type CatCollectionFeature = {
  getCats: () => Cat[];
  createCat: (input: unknown) => void;
};

type CatCollectionFeatureFunctionFactory = (
  catRepository: CatRepository
) => CatCollectionFeature;

export const catCollectionFeatureFunctionFactory: CatCollectionFeatureFunctionFactory =
  (catRepository) => ({
    getCats() {
      return catRepository.getCats();
    },
    createCat(input) {
      isValidCatCreationInput(input);
      catRepository.createCat(input);
    },
  });

export const standardCatCollectionFeature = catCollectionFeatureFunctionFactory(
  standardCatRepository
);
