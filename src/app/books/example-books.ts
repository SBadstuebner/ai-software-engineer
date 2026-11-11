import { Book } from './book';

export const EXAMPLE_BOOKS: readonly Book[] = [
  {
    id: '9780000000002',
    isbn: '9780000000002',
    title: 'Angular Patterns in Practice',
    subtitle: 'Building maintainable standalone applications',
    author: 'Alex Morgan',
    publisher: 'Workshop Press',
    numPages: 312,
    price: '€29.90',
    cover: '/covers/angular-patterns.svg',
    abstract:
      'A practical tour of standalone components, routing, dependency injection, and reactive application design. Each chapter develops a small feature and explains the decisions that keep it easy to test and change.',
    userId: 1
  },
  {
    id: '9780000000019',
    isbn: '9780000000019',
    title: 'TypeScript Without Guesswork',
    subtitle: 'Clear types for dependable web applications',
    author: 'Sam Rivera',
    publisher: 'Workshop Press',
    numPages: 248,
    price: '€24.90',
    cover: '/covers/typescript-without-guesswork.svg',
    abstract:
      'Learn how strict TypeScript turns uncertain data into explicit, readable application code. The examples cover domain models, narrowing, generics, API boundaries, and useful compiler settings.',
    userId: 1
  },
  {
    id: '9780000000026',
    isbn: '9780000000026',
    title: 'Accessible Interfaces by Design',
    subtitle: 'Inclusive patterns for modern web teams',
    author: 'Jordan Lee',
    publisher: 'Workshop Press',
    numPages: 276,
    price: '€27.50',
    cover: '/covers/accessible-interfaces.svg',
    abstract:
      'Build interfaces that work with keyboards, screen readers, touch, and different viewport sizes. This field guide connects semantic HTML and visual design with practical testing techniques.',
    userId: 1
  }
];
