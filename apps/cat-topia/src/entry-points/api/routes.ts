import { Hono } from 'hono';

import { logger } from '@hono-starter-api/logger';
import { standardCatCollectionFeature } from '@app/domain/cat-collection.feature';
import { getRandomCatName } from '@hono-starter-api/random-cat-name';

export function defineRoutes(app: Hono) {
  app.get('/', (c) => c.text(`${getRandomCatName()} meow`));

  const cats = new Hono();

  cats.get('/', (c) => {
    logger.info('Retrieving the whole cat collecion');

    return c.json(standardCatCollectionFeature.getCats());
  });

  cats.post('/', async (c) => {
    const body = (await c.req.json()) as unknown;

    standardCatCollectionFeature.createCat(body);

    return c.body(null, 204);
  });

  app.route('/cats', cats);
}
