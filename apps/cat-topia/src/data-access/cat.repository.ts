import { Cat, CatCreationInput } from '@app/domain/cat-schema';

// ️️️✅ Best Practice: The function factory pattern - Create functions through a factory that has it's dependencies passed down (IoC)
export type CatRepository = {
  getCats: () => Cat[];
  createCat: (input: CatCreationInput) => void;
};
type CatRepositoryFunctionFactory = () => CatRepository;

const cats: Cat[] = [];

export const catRepositoryFunctionFactory: CatRepositoryFunctionFactory =
  () => ({
    getCats() {
      return cats;
    },
    createCat(input) {
      cats.push({ ...input, id: cats.length + 1 });
    },
  });

export const standardCatRepository = catRepositoryFunctionFactory();
