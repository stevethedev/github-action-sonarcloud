# GitHub Action - SonarCloud

This action integrates SonarCloud feedback into a GitHub Repository.

## Required Permissions

- `pull-requests: write` or `issues: write` to create comments on pull requests

## Configuration Options

| Option             | Description                                                              | Default                      | Required |
| ------------------ | ------------------------------------------------------------------------ | ---------------------------- | -------- |
| `commentId`        | The comment ID (numeric)                                                 |                              | No       |
| `githubToken`      | The GitHub token                                                         |                              | Yes      |
| `sonarProjectFile` | The SonarCloud project file                                              | `./sonar-project.properties` | No       |
| `sonarProjectKey`  | The SonarCloud project key (read from the `sonarProjectFile` by default) |                              | No       |
| `sonarToken`       | The SonarCloud bearer token                                              |                              | Yes      |
| `sonarUrl`         | The SonarCloud URL                                                       | `https://sonarcloud.io`      | No       |
