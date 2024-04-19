# github-action-sonarcloud

## 0.5.2

### Patch Changes

- 3ae6c28: Treat the inability to validate task-status as an assumption that it's ready

## 0.5.1

### Patch Changes

- 85a9df8: Short-circuit rule-fetching when there are no rules to fetch
- 4f9ef5d: Add more descriptive error messages while parsing API responses

## 0.5.0

### Minor Changes

- 0fb44ce: Decorate PR files

## 0.4.2

### Patch Changes

- 756c1fe: Prevented task-validation failure from prematurely ending the scan

## 0.4.1

### Patch Changes

- 0d1053e: Add better error messages

## 0.4.0

### Minor Changes

- b087bd0: Consolidated the rendering logic

### Patch Changes

- eac6f85: Moved the type-checking to an external library

## 0.3.7

### Patch Changes

- 20eb365: Wait for analysis to finish before decorating the PR

## 0.3.6

### Patch Changes

- Fix weird comment phrasing and spacing

## 0.3.5

### Patch Changes

- 3714e3a: Add icons to issue types

## 0.3.4

### Patch Changes

- d58baae: Fix a bug where every issue was being reported in validation logic

## 0.3.3

### Patch Changes

- Fix broken parsing on Sonar Issues

## 0.3.2

### Patch Changes

- Mark most issue-values as optional

## 0.3.1

### Patch Changes

- Fixed a bug in the issue-parsing behavior

## 0.3.0

### Minor Changes

- a9f071c: Add comments about issues discovered in a pull-request

### Patch Changes

- f49e229: Prevent non-PR checks from failing

## 0.2.13

### Patch Changes

- f1e209a: Remove duplicate status messages

## 0.2.12

### Patch Changes

- Add icons to comments

## 0.2.11

### Patch Changes

- 456a7de: Add coverage and line-density as percentage values
- 5caa52b: Add icons for pass/fail states
- b7aba0b: Use first-class icons in the generated comments

## 0.2.10

### Patch Changes

- 6309f88: Fix comment-lookup functionality

## 0.2.9

### Patch Changes

- 7cbe651: Fix the comment body list

## 0.2.8

### Patch Changes

- 9e9157e: Update the way the status is reported

## 0.2.7

### Patch Changes

- 8155cd0: Fix the letter rating comparators

## 0.2.6

### Patch Changes

- 7e26892: Fix percentage parsing

## 0.2.5

### Patch Changes

- b0e54d9: Set the comment ID on new comments

## 0.2.4

### Patch Changes

- 384a446: Added a link to the Pull Request analysis to the generated comment

## 0.2.3

### Patch Changes

- 4c78b11: Fix a bug where the pull-request value isn't being read

## 0.2.2

### Patch Changes

- 37be3bc: Added documentation to indicate the required permissions to run the action

## 0.2.1

### Patch Changes

- 245a468: Fixed a bug where comments could not be created

## 0.2.0

### Minor Changes

- c6e5843: Add comment-writing and gate-checking

## 0.1.4

### Patch Changes

- 9229c2b: Added logging line to validate SonarCloud credentials

## 0.1.3

### Patch Changes

- 6bd95ed: Fixed code coverage collection

## 0.1.2

### Patch Changes

- 47e5576: Fix version comparison in publishing script

## 0.1.1

### Patch Changes

- 22b0ce8: Fix the broken inputs file

## 0.1.0

### Minor Changes

- 0cba049: Add validation step to the action.
