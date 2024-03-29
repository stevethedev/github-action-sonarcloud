import { exec, getExecOutput } from "@actions/exec";
import path from "path";
import semver from "semver";
import packageJson from "../package.json" assert { type: "json" };

const { version } = packageJson;
const versionMajor = semver.major(version);
const versionMinor = semver.minor(version);

const tag = `v${version}`;
const minorTag = `v${versionMajor}.${versionMinor}`;
const releaseLine = `v${versionMajor}`;

const __dirname = path.dirname(new URL(import.meta.url).pathname);
process.chdir(path.join(__dirname, ".."));

const main = async () => {
  const { exitCode, stderr } = await getExecOutput(
    `git`,
    ["ls-remote", "--exit-code", "origin", "--tags", `refs/tags/${tag}`],
    {
      ignoreReturnCode: true,
    },
  );
  if (exitCode === 0) {
    console.log(
      `Action is not being published because version ${tag} is already published`,
    );
    return;
  }
  if (exitCode !== 2) {
    throw new Error(`git ls-remote exited with ${exitCode}:\n${stderr}`);
  }

  // get the list of tags
  await exec("git", ["fetch", "--tags"]);
  const { stdout } = await getExecOutput("git", ["tag", "-l"]);
  const tags = stdout
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => semver.valid(x));
  const maxTag = semver.maxSatisfying(tags, "*");
  const maxTagMajor = semver.major(maxTag);
  const maxTagMinor = semver.minor(maxTag);

  if (versionMajor >= maxTagMajor && versionMinor >= maxTagMinor) {
    await exec("git", ["tag", "-f", "latest"]);
  }

  await exec("git", ["checkout", "--detach"]);
  await exec("git", ["add", "--force", "dist"]);
  await exec("git", ["commit", "-m", tag]);

  await exec("changeset", ["tag"]);
  await exec("git", ["tag", "-f", minorTag]);

  await exec("git", [
    "push",
    "--force",
    "--follow-tags",
    "origin",
    `HEAD:refs/heads/${releaseLine}`,
  ]);
};

main().then(() => {
  console.log("Action published");
});
