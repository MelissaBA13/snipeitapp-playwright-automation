import { test as base, expect, Page } from '@playwright/test';

type Fixtures = {
  page: Page;
};

export const test = base.extend<Fixtures>({
});

export { expect };
