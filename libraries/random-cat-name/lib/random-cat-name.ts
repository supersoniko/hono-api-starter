const CAT_NAMES = ['Fluffykins', 'Lucy', 'Coco'];

export function getRandomCatName() {
  return CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)];
}
