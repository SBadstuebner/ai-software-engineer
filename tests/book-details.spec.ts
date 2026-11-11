import { expect, test } from '@playwright/test';

const isbn = '9780134655536';
const exampleIsbn = '9780000000002';
const exampleTitle = 'Angular Patterns in Practice';
const book = {
  id: isbn,
  isbn,
  title: 'Node.js, MongoDB and Angular Web Development',
  subtitle: 'The definitive guide to the MEAN stack',
  author: 'Brad Dayley',
  publisher: 'Pearson',
  numPages: 640,
  price: '$39.99',
  cover: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
  abstract: 'A practical guide to building web applications.',
  userId: 1
};

test('navigates from a book card to its details page', async ({ page }) => {
  await page.route(/^http:\/\/localhost:4730\/books(?:\?.*)?$/, route => route.fulfill({ json: [book] }));
  await page.route(`http://localhost:4730/books/${isbn}`, route => route.fulfill({ json: book }));

  await page.goto('/');
  await page.getByRole('link', { name: `View details for ${book.title}` }).click();

  await expect(page).toHaveURL(`/books/${isbn}`);
  await expect(page.getByRole('heading', { level: 1, name: book.title })).toBeVisible();
});

test('provides navigable example books when the API collection is empty', async ({ page }) => {
  await page.route(/^http:\/\/localhost:4730\/books(?:\?.*)?$/, route => route.fulfill({ json: [] }));
  await page.route(`http://localhost:4730/books/${exampleIsbn}`, route =>
    route.fulfill({ status: 404, contentType: 'application/json', body: '{}' })
  );

  await page.goto('/');
  await page.getByRole('link', { name: `View details for ${exampleTitle}` }).click();

  await expect(page).toHaveURL(`/books/${exampleIsbn}`);
  await expect(page.getByRole('heading', { level: 1, name: exampleTitle })).toBeVisible();
  await expect(page.getByRole('img', { name: `Cover of ${exampleTitle}` })).toBeVisible();
  await expect(page.getByText('A practical tour of standalone components', { exact: false })).toBeVisible();
});

test('loads and displays a book when its details URL is opened directly', async ({ page }) => {
  await page.route(`http://localhost:4730/books/${isbn}`, route => route.fulfill({ json: book }));

  await page.goto(`/books/${isbn}`);

  await expect(page.getByRole('heading', { level: 1, name: book.title })).toBeVisible();
  await expect(page.getByText(book.subtitle)).toBeVisible();
  await expect(page.getByText(`by ${book.author}`)).toBeVisible();
  await expect(page.getByText(book.publisher, { exact: true })).toBeVisible();
  await expect(page.getByText(book.isbn, { exact: true })).toBeVisible();
  await expect(page.getByText(String(book.numPages), { exact: true })).toBeVisible();
  await expect(page.getByText(book.price, { exact: true })).toBeVisible();
  await expect(page.getByText(book.abstract)).toBeVisible();
  await expect(page.getByRole('img', { name: `Cover of ${book.title}` })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to book collection' })).toHaveAttribute('href', '/');
});

test('shows a not-found state when the API returns 404', async ({ page }) => {
  await page.route('http://localhost:4730/books/missing-isbn', route =>
    route.fulfill({ status: 404, contentType: 'application/json', body: '{}' })
  );

  await page.goto('/books/missing-isbn');

  await expect(page.getByRole('heading', { name: 'Book not found' })).toBeVisible();
  await expect(page.getByText('The requested book does not exist or is no longer available.')).toBeVisible();
});

test('shows a request-error state when the API is unavailable', async ({ page }) => {
  await page.route('http://localhost:4730/books/unavailable-isbn', route => route.abort('connectionrefused'));

  await page.goto('/books/unavailable-isbn');

  await expect(page.getByRole('heading', { name: 'Unable to load book' })).toBeVisible();
  await expect(page.getByText('The book service could not be reached. Please try again later.')).toBeVisible();
});
