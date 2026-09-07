# Project Linting and Commit Guidelines

## Commit Linting with Commitlint

We use Commitlint to maintain a consistent commit message format across the project.

## Commit Message Format

- `fix`: a bug fix
- `feat`: a new feature
- `docs`: documentation updates
- `style`: code style changes
- `refactor`: code changes that neither fix a bug nor add a feature
- `test`: adding or updating tests
- `chore`: build process, tooling, or maintenance changes

Examples:

- Good: `feat: add user profile page`
- Good: `fix: resolve login form validation`
- Bad: `update files`
- Bad: `fix bug`

## Local Checks

Run the same checks used by CI before opening a pull request:

```sh
npm run format:check
npm run lint -- --max-warnings=0
npm run typecheck
npm run build
```

## ESLint

ESLint checks TypeScript and React source files in `src`:

```sh
npm run lint
npm run lint:fix
```

Generated build output in `dist/` is ignored.
