# Project Linting and Commit Guidelines

## Commit Linting with Commitlint

We use **Commitlint** to maintain a consistent commit message format across the project. This ensures a clear and meaningful commit history. Please adhere to the following guidelines:

### Commit Message Format

- **Type**: Defines the type of change being made. Valid types include:
  - `fix`: A bug fix
  - `feat`: A new feature
  - `docs`: Documentation updates
  - `style`: Code style changes (formatting, missing semi-colons, etc.)
  - `refactor`: Code changes that neither fix a bug nor add a feature
  - `test`: Adding or updating tests
  - `chore`: Changes to the build process or auxiliary tools and libraries

- **Subject**: A brief summary of the change, ideally less than 100 characters. It should be descriptive but concise.

### Examples

- Good: `feat: add user profile page`
- Good: `fix: resolve issue with login form validation`
- Bad: `update files` (too vague)
- Bad: `fix bug` (missing details)

**Note**: The commit message must include a type and a non-empty subject. Avoid using capital letters or punctuation (e.g., `!` or `?`) in the type.

### How to Use

1. Write your commit message according to the format above.
2. Commit your changes. If your commit message does not conform to the rules, the commit will be rejected, and you’ll need to correct it.

## ESLint Configuration

**ESLint** is used to ensure code quality and enforce coding standards across the project. Here’s what you need to know:

### ESLint Setup

- **File Types**: ESLint is configured to lint `.js` and `.jsx` files located in the `src` directory.

- **Ignored Files**: ESLint will ignore files and directories specified in the configuration:
  - `dist/` directory
  - `commitlint.config.js` (since it is not part of the source code)

### Running ESLint

- **To Check Code**: Run `npx eslint 'src/**/*.{js,jsx}'` to analyze the code for issues.
- **To Fix Issues**: Run `npx eslint 'src/**/*.{js,jsx}' --fix` to automatically fix linting issues where possible.
