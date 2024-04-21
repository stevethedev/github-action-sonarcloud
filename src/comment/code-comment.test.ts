import { stripIndent } from "common-tags";
import codeComment, { accordion, p, type Props } from "./code-comment";

describe("codeComment", () => {
  it("should return the security comment", () => {
    const expected = stripIndent`
      <h2>Make sure that expanding this archive file is safe here.</h2>
      
      <p>Expanding archive files without controlling resource consumption is security-sensitive</p>
      <!-- No details -->
      
      <details>
      <summary><h3>What's the risk?</h3></summary>
      <section>
      <p>Successful Zip Bomb attacks occur when an application expands untrusted archive files without controlling the size of the expanded data, which can
      lead to denial of service. A Zip bomb is usually a malicious archive file of a few kilobytes of compressed data but turned into gigabytes of
      uncompressed data. To achieve this extreme <a href="https://en.wikipedia.org/wiki/Data_compression_ratio">compression ratio</a>, attackers will
      compress irrelevant data (eg: a long string of repeated bytes).</p>
      </section>
      </details>
      <details>
      <summary><h3>Assess the risk</h3></summary>
      <section>
      <h4>Ask Yourself Whether</h4>
      <p>Archives to expand are untrusted and:</p>
      <ul>
        <li> There is no validation of the number of entries in the archive. </li>
        <li> There is no validation of the total size of the uncompressed data. </li>
        <li> There is no validation of the ratio between the compressed and uncompressed archive entry. </li>
      </ul>
      <p>There is a risk if you answered yes to any of those questions.</p>
      </section>
      </details>
      <details>
      <summary><h3>How can I fix it?</h3></summary>
      <section>
      <h4>Recommended Secure Coding Practices</h4>
      <ul>
        <li> Define and control the ratio between compressed and uncompressed data, in general the data compression ratio for most of the legit archives is
        1 to 3. </li>
        <li> Define and control the threshold for maximum total size of the uncompressed data. </li>
        <li> Count the number of file entries extracted from the archive and abort the extraction if their number is greater than a predefined threshold, in
        particular it’s not recommended to recursively expand archives (an entry of an archive could be also an archive). </li>
      </ul>
      <h4>Sensitive Code Example</h4>
      <p>For <a href="https://github.com/npm/node-tar">tar</a> module:</p>
      <pre>
      const tar = require('tar');
      
      tar.x({ // Sensitive
        file: 'foo.tar.gz'
      });
      </pre>
      <p>For <a href="https://github.com/cthackers/adm-zip">adm-zip</a> module:</p>
      <pre>
      const AdmZip = require('adm-zip');
      
      let zip = new AdmZip("./foo.zip");
      zip.extractAllTo("."); // Sensitive
      </pre>
      <p>For <a href="https://stuk.github.io/jszip/">jszip</a> module:</p>
      <pre>
      const fs = require("fs");
      const JSZip = require("jszip");
      
      fs.readFile("foo.zip", function(err, data) {
        if (err) throw err;
        JSZip.loadAsync(data).then(function (zip) { // Sensitive
          zip.forEach(function (relativePath, zipEntry) {
            if (!zip.file(zipEntry.name)) {
              fs.mkdirSync(zipEntry.name);
            } else {
              zip.file(zipEntry.name).async('nodebuffer').then(function (content) {
                fs.writeFileSync(zipEntry.name, content);
              });
            }
          });
        });
      });
      </pre>
      <p>For <a href="https://github.com/thejoshwolfe/yauzl">yauzl</a> module</p>
      <pre>
      const yauzl = require('yauzl');
      
      yauzl.open('foo.zip', function (err, zipfile) {
        if (err) throw err;
      
        zipfile.on("entry", function(entry) {
          zipfile.openReadStream(entry, function(err, readStream) {
            if (err) throw err;
            // TODO: extract
          });
        });
      });
      </pre>
      <p>For <a href="https://github.com/maxogden/extract-zip">extract-zip</a> module:</p>
      <pre>
      const extract = require('extract-zip')
      
      async function main() {
        let target = __dirname + '/test';
        await extract('test.zip', { dir: target }); // Sensitive
      }
      main();
      </pre>
      <h4>Compliant Solution</h4>
      <p>For <a href="https://github.com/npm/node-tar">tar</a> module:</p>
      <pre>
      const tar = require('tar');
      const MAX_FILES = 10000;
      const MAX_SIZE = 1000000000; // 1 GB
      
      let fileCount = 0;
      let totalSize = 0;
      
      tar.x({
        file: 'foo.tar.gz',
        filter: (path, entry) =&gt; {
          fileCount++;
          if (fileCount &gt; MAX_FILES) {
            throw 'Reached max. number of files';
          }
      
          totalSize += entry.size;
          if (totalSize &gt; MAX_SIZE) {
            throw 'Reached max. size';
          }
      
          return true;
        }
      });
      </pre>
      <p>For <a href="https://github.com/cthackers/adm-zip">adm-zip</a> module:</p>
      <pre>
      const AdmZip = require('adm-zip');
      const MAX_FILES = 10000;
      const MAX_SIZE = 1000000000; // 1 GB
      const THRESHOLD_RATIO = 10;
      
      let fileCount = 0;
      let totalSize = 0;
      let zip = new AdmZip("./foo.zip");
      let zipEntries = zip.getEntries();
      zipEntries.forEach(function(zipEntry) {
          fileCount++;
          if (fileCount &gt; MAX_FILES) {
              throw 'Reached max. number of files';
          }
      
          let entrySize = zipEntry.getData().length;
          totalSize += entrySize;
          if (totalSize &gt; MAX_SIZE) {
              throw 'Reached max. size';
          }
      
          let compressionRatio = entrySize / zipEntry.header.compressedSize;
          if (compressionRatio &gt; THRESHOLD_RATIO) {
              throw 'Reached max. compression ratio';
          }
      
          if (!zipEntry.isDirectory) {
              zip.extractEntryTo(zipEntry.entryName, ".");
          }
      });
      </pre>
      <p>For <a href="https://stuk.github.io/jszip/">jszip</a> module:</p>
      <pre>
      const fs = require("fs");
      const pathmodule = require("path");
      const JSZip = require("jszip");
      
      const MAX_FILES = 10000;
      const MAX_SIZE = 1000000000; // 1 GB
      
      let fileCount = 0;
      let totalSize = 0;
      let targetDirectory = __dirname + '/archive_tmp';
      
      fs.readFile("foo.zip", function(err, data) {
        if (err) throw err;
        JSZip.loadAsync(data).then(function (zip) {
          zip.forEach(function (relativePath, zipEntry) {
            fileCount++;
            if (fileCount &gt; MAX_FILES) {
              throw 'Reached max. number of files';
            }
      
            // Prevent ZipSlip path traversal (S6096)
            const resolvedPath = pathmodule.join(targetDirectory, zipEntry.name);
            if (!resolvedPath.startsWith(targetDirectory)) {
              throw 'Path traversal detected';
            }
      
            if (!zip.file(zipEntry.name)) {
              fs.mkdirSync(resolvedPath);
            } else {
              zip.file(zipEntry.name).async('nodebuffer').then(function (content) {
                totalSize += content.length;
                if (totalSize &gt; MAX_SIZE) {
                  throw 'Reached max. size';
                }
      
                fs.writeFileSync(resolvedPath, content);
              });
            }
          });
        });
      });
      </pre>
      <p>Be aware that due to the similar structure of sensitive and compliant code the issue will be raised in both cases. It is up to the developer to
      decide if the implementation is secure.</p>
      <p>For <a href="https://github.com/thejoshwolfe/yauzl">yauzl</a> module</p>
      <pre>
      const yauzl = require('yauzl');
      
      const MAX_FILES = 10000;
      const MAX_SIZE = 1000000000; // 1 GB
      const THRESHOLD_RATIO = 10;
      
      yauzl.open('foo.zip', function (err, zipfile) {
        if (err) throw err;
      
        let fileCount = 0;
        let totalSize = 0;
      
        zipfile.on("entry", function(entry) {
          fileCount++;
          if (fileCount &gt; MAX_FILES) {
            throw 'Reached max. number of files';
          }
      
          // The uncompressedSize comes from the zip headers, so it might not be trustworthy.
          // Alternatively, calculate the size from the readStream.
          let entrySize = entry.uncompressedSize;
          totalSize += entrySize;
          if (totalSize &gt; MAX_SIZE) {
            throw 'Reached max. size';
          }
      
          if (entry.compressedSize &gt; 0) {
            let compressionRatio = entrySize / entry.compressedSize;
            if (compressionRatio &gt; THRESHOLD_RATIO) {
              throw 'Reached max. compression ratio';
            }
          }
      
          zipfile.openReadStream(entry, function(err, readStream) {
            if (err) throw err;
            // TODO: extract
          });
        });
      });
      </pre>
      <p>Be aware that due to the similar structure of sensitive and compliant code the issue will be raised in both cases. It is up to the developer to
      decide if the implementation is secure.</p>
      <p>For <a href="https://github.com/maxogden/extract-zip">extract-zip</a> module:</p>
      <pre>
      const extract = require('extract-zip')
      
      const MAX_FILES = 10000;
      const MAX_SIZE = 1000000000; // 1 GB
      const THRESHOLD_RATIO = 10;
      
      async function main() {
        let fileCount = 0;
        let totalSize = 0;
      
        let target = __dirname + '/foo';
        await extract('foo.zip', {
          dir: target,
          onEntry: function(entry, zipfile) {
            fileCount++;
            if (fileCount &gt; MAX_FILES) {
              throw 'Reached max. number of files';
            }
      
            // The uncompressedSize comes from the zip headers, so it might not be trustworthy.
            // Alternatively, calculate the size from the readStream.
            let entrySize = entry.uncompressedSize;
            totalSize += entrySize;
            if (totalSize &gt; MAX_SIZE) {
              throw 'Reached max. size';
            }
      
            if (entry.compressedSize &gt; 0) {
              let compressionRatio = entrySize / entry.compressedSize;
              if (compressionRatio &gt; THRESHOLD_RATIO) {
                throw 'Reached max. compression ratio';
              }
            }
          }
        });
      }
      main();
      </pre>
      <h4>See</h4>
      <ul>
        <li> OWASP - <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/">Top 10 2021 Category A1 - Broken Access Control</a> </li>
        <li> OWASP - <a href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/">Top 10 2021 Category A5 - Security Misconfiguration</a> </li>
        <li> OWASP - <a href="https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control">Top 10 2017 Category A5 - Broken Access Control</a>
        </li>
        <li> OWASP - <a href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration">Top 10 2017 Category A6 - Security
        Misconfiguration</a> </li>
        <li> CWE - <a href="https://cwe.mitre.org/data/definitions/409">CWE-409 - Improper Handling of Highly Compressed Data (Data Amplification)</a> </li>
        <li> <a href="https://www.bamsoftware.com/hacks/zipbomb/">bamsoftware.com</a> - A better Zip Bomb </li>
      </ul>
      </section>
      </details>
    `;

    const rule = {
      name: "Expanding archive files without controlling resource consumption is security-sensitive",
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cp\u003EArchives to expand are untrusted and:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E There is no validation of the number of entries in the archive. \u003C/li\u003E\n  \u003Cli\u003E There is no validation of the total size of the uncompressed data. \u003C/li\u003E\n  \u003Cli\u003E There is no validation of the ratio between the compressed and uncompressed archive entry. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003ESuccessful Zip Bomb attacks occur when an application expands untrusted archive files without controlling the size of the expanded data, which can\nlead to denial of service. A Zip bomb is usually a malicious archive file of a few kilobytes of compressed data but turned into gigabytes of\nuncompressed data. To achieve this extreme \u003Ca href="https://en.wikipedia.org/wiki/Data_compression_ratio"\u003Ecompression ratio\u003C/a\u003E, attackers will\ncompress irrelevant data (eg: a long string of repeated bytes).\u003C/p\u003E',
        },
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Define and control the ratio between compressed and uncompressed data, in general the data compression ratio for most of the legit archives is\n  1 to 3. \u003C/li\u003E\n  \u003Cli\u003E Define and control the threshold for maximum total size of the uncompressed data. \u003C/li\u003E\n  \u003Cli\u003E Count the number of file entries extracted from the archive and abort the extraction if their number is greater than a predefined threshold, in\n  particular it’s not recommended to recursively expand archives (an entry of an archive could be also an archive). \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://github.com/npm/node-tar\"\u003Etar\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\nconst tar = require('tar');\n\ntar.x({ // Sensitive\n  file: 'foo.tar.gz'\n});\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://github.com/cthackers/adm-zip\"\u003Eadm-zip\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\nconst AdmZip = require('adm-zip');\n\nlet zip = new AdmZip(\"./foo.zip\");\nzip.extractAllTo(\".\"); // Sensitive\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://stuk.github.io/jszip/\"\u003Ejszip\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\nconst fs = require(\"fs\");\nconst JSZip = require(\"jszip\");\n\nfs.readFile(\"foo.zip\", function(err, data) {\n  if (err) throw err;\n  JSZip.loadAsync(data).then(function (zip) { // Sensitive\n    zip.forEach(function (relativePath, zipEntry) {\n      if (!zip.file(zipEntry.name)) {\n        fs.mkdirSync(zipEntry.name);\n      } else {\n        zip.file(zipEntry.name).async('nodebuffer').then(function (content) {\n          fs.writeFileSync(zipEntry.name, content);\n        });\n      }\n    });\n  });\n});\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://github.com/thejoshwolfe/yauzl\"\u003Eyauzl\u003C/a\u003E module\u003C/p\u003E\n\u003Cpre\u003E\nconst yauzl = require('yauzl');\n\nyauzl.open('foo.zip', function (err, zipfile) {\n  if (err) throw err;\n\n  zipfile.on(\"entry\", function(entry) {\n    zipfile.openReadStream(entry, function(err, readStream) {\n      if (err) throw err;\n      // TODO: extract\n    });\n  });\n});\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://github.com/maxogden/extract-zip\"\u003Eextract-zip\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\nconst extract = require('extract-zip')\n\nasync function main() {\n  let target = __dirname + '/test';\n  await extract('test.zip', { dir: target }); // Sensitive\n}\nmain();\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://github.com/npm/node-tar\"\u003Etar\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\nconst tar = require('tar');\nconst MAX_FILES = 10000;\nconst MAX_SIZE = 1000000000; // 1 GB\n\nlet fileCount = 0;\nlet totalSize = 0;\n\ntar.x({\n  file: 'foo.tar.gz',\n  filter: (path, entry) =&gt; {\n    fileCount++;\n    if (fileCount &gt; MAX_FILES) {\n      throw 'Reached max. number of files';\n    }\n\n    totalSize += entry.size;\n    if (totalSize &gt; MAX_SIZE) {\n      throw 'Reached max. size';\n    }\n\n    return true;\n  }\n});\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://github.com/cthackers/adm-zip\"\u003Eadm-zip\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\nconst AdmZip = require('adm-zip');\nconst MAX_FILES = 10000;\nconst MAX_SIZE = 1000000000; // 1 GB\nconst THRESHOLD_RATIO = 10;\n\nlet fileCount = 0;\nlet totalSize = 0;\nlet zip = new AdmZip(\"./foo.zip\");\nlet zipEntries = zip.getEntries();\nzipEntries.forEach(function(zipEntry) {\n    fileCount++;\n    if (fileCount &gt; MAX_FILES) {\n        throw 'Reached max. number of files';\n    }\n\n    let entrySize = zipEntry.getData().length;\n    totalSize += entrySize;\n    if (totalSize &gt; MAX_SIZE) {\n        throw 'Reached max. size';\n    }\n\n    let compressionRatio = entrySize / zipEntry.header.compressedSize;\n    if (compressionRatio &gt; THRESHOLD_RATIO) {\n        throw 'Reached max. compression ratio';\n    }\n\n    if (!zipEntry.isDirectory) {\n        zip.extractEntryTo(zipEntry.entryName, \".\");\n    }\n});\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://stuk.github.io/jszip/\"\u003Ejszip\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\nconst fs = require(\"fs\");\nconst pathmodule = require(\"path\");\nconst JSZip = require(\"jszip\");\n\nconst MAX_FILES = 10000;\nconst MAX_SIZE = 1000000000; // 1 GB\n\nlet fileCount = 0;\nlet totalSize = 0;\nlet targetDirectory = __dirname + '/archive_tmp';\n\nfs.readFile(\"foo.zip\", function(err, data) {\n  if (err) throw err;\n  JSZip.loadAsync(data).then(function (zip) {\n    zip.forEach(function (relativePath, zipEntry) {\n      fileCount++;\n      if (fileCount &gt; MAX_FILES) {\n        throw 'Reached max. number of files';\n      }\n\n      // Prevent ZipSlip path traversal (S6096)\n      const resolvedPath = pathmodule.join(targetDirectory, zipEntry.name);\n      if (!resolvedPath.startsWith(targetDirectory)) {\n        throw 'Path traversal detected';\n      }\n\n      if (!zip.file(zipEntry.name)) {\n        fs.mkdirSync(resolvedPath);\n      } else {\n        zip.file(zipEntry.name).async('nodebuffer').then(function (content) {\n          totalSize += content.length;\n          if (totalSize &gt; MAX_SIZE) {\n            throw 'Reached max. size';\n          }\n\n          fs.writeFileSync(resolvedPath, content);\n        });\n      }\n    });\n  });\n});\n\u003C/pre\u003E\n\u003Cp\u003EBe aware that due to the similar structure of sensitive and compliant code the issue will be raised in both cases. It is up to the developer to\ndecide if the implementation is secure.\u003C/p\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://github.com/thejoshwolfe/yauzl\"\u003Eyauzl\u003C/a\u003E module\u003C/p\u003E\n\u003Cpre\u003E\nconst yauzl = require('yauzl');\n\nconst MAX_FILES = 10000;\nconst MAX_SIZE = 1000000000; // 1 GB\nconst THRESHOLD_RATIO = 10;\n\nyauzl.open('foo.zip', function (err, zipfile) {\n  if (err) throw err;\n\n  let fileCount = 0;\n  let totalSize = 0;\n\n  zipfile.on(\"entry\", function(entry) {\n    fileCount++;\n    if (fileCount &gt; MAX_FILES) {\n      throw 'Reached max. number of files';\n    }\n\n    // The uncompressedSize comes from the zip headers, so it might not be trustworthy.\n    // Alternatively, calculate the size from the readStream.\n    let entrySize = entry.uncompressedSize;\n    totalSize += entrySize;\n    if (totalSize &gt; MAX_SIZE) {\n      throw 'Reached max. size';\n    }\n\n    if (entry.compressedSize &gt; 0) {\n      let compressionRatio = entrySize / entry.compressedSize;\n      if (compressionRatio &gt; THRESHOLD_RATIO) {\n        throw 'Reached max. compression ratio';\n      }\n    }\n\n    zipfile.openReadStream(entry, function(err, readStream) {\n      if (err) throw err;\n      // TODO: extract\n    });\n  });\n});\n\u003C/pre\u003E\n\u003Cp\u003EBe aware that due to the similar structure of sensitive and compliant code the issue will be raised in both cases. It is up to the developer to\ndecide if the implementation is secure.\u003C/p\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://github.com/maxogden/extract-zip\"\u003Eextract-zip\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\nconst extract = require('extract-zip')\n\nconst MAX_FILES = 10000;\nconst MAX_SIZE = 1000000000; // 1 GB\nconst THRESHOLD_RATIO = 10;\n\nasync function main() {\n  let fileCount = 0;\n  let totalSize = 0;\n\n  let target = __dirname + '/foo';\n  await extract('foo.zip', {\n    dir: target,\n    onEntry: function(entry, zipfile) {\n      fileCount++;\n      if (fileCount &gt; MAX_FILES) {\n        throw 'Reached max. number of files';\n      }\n\n      // The uncompressedSize comes from the zip headers, so it might not be trustworthy.\n      // Alternatively, calculate the size from the readStream.\n      let entrySize = entry.uncompressedSize;\n      totalSize += entrySize;\n      if (totalSize &gt; MAX_SIZE) {\n        throw 'Reached max. size';\n      }\n\n      if (entry.compressedSize &gt; 0) {\n        let compressionRatio = entrySize / entry.compressedSize;\n        if (compressionRatio &gt; THRESHOLD_RATIO) {\n          throw 'Reached max. compression ratio';\n        }\n      }\n    }\n  });\n}\nmain();\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A01_2021-Broken_Access_Control/\"\u003ETop 10 2021 Category A1 - Broken Access Control\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A05_2021-Security_Misconfiguration/\"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control\"\u003ETop 10 2017 Category A5 - Broken Access Control\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration\"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/409\"\u003ECWE-409 - Improper Handling of Highly Compressed Data (Data Amplification)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"https://www.bamsoftware.com/hacks/zipbomb/\"\u003Ebamsoftware.com\u003C/a\u003E - A better Zip Bomb \u003C/li\u003E\n\u003C/ul\u003E",
        },
      ],
    };

    const hotspot = {
      message: "Make sure that expanding this archive file is safe here.",
    };

    const getRuleDescription = (key: string): string =>
      rule.descriptionSections
        ?.find((section) => section.key === key)
        ?.content.replace(/<h(\d)>/gi, (_, n) => `<h${2 + Number.parseInt(n)}>`)
        .replace(/<\/h(\d)>/gi, (_, n) => `</h${2 + Number.parseInt(n)}>`) ??
      "";

    const props: Props = {
      title: hotspot.message,
      brief: rule.name,
      sections: [
        {
          title: "What's the risk?",
          content: getRuleDescription("root_cause"),
        },
        {
          title: "Assess the risk",
          content: getRuleDescription("assess_the_problem"),
        },
        {
          title: "How can I fix it?",
          content: getRuleDescription("how_to_fix"),
        },
      ],
    };

    const actual = codeComment(props);

    expect(actual).toBe(expected);
  });
});

describe("p", () => {
  it("should return the correct string", () => {
    const expected = "<p>text</p>";

    const actual = p({ content: "text" });

    expect(actual).toBe(expected);
  });
});

describe("accordion", () => {
  it("should return the correct string", () => {
    const expected = stripIndent`
      <details>
      <summary><h3>Root cause</h3></summary>
      <section>
      <p>Successful Zip Bomb attacks occur when an application expands untrusted archive files without controlling the size of the expanded data, which can
      lead to denial of service. A Zip bomb is usually a malicious archive file of a few kilobytes of compressed data but turned into gigabytes of
      uncompressed data. To achieve this extreme <a href="https://en.wikipedia.org/wiki/Data_compression_ratio">compression ratio</a>, attackers will
      compress irrelevant data (eg: a long string of repeated bytes).</p>
      </section>
      </details>
        `;

    const actual = accordion({
      title: "Root cause",
      content:
        '\u003Cp\u003ESuccessful Zip Bomb attacks occur when an application expands untrusted archive files without controlling the size of the expanded data, which can\nlead to denial of service. A Zip bomb is usually a malicious archive file of a few kilobytes of compressed data but turned into gigabytes of\nuncompressed data. To achieve this extreme \u003Ca href="https://en.wikipedia.org/wiki/Data_compression_ratio"\u003Ecompression ratio\u003C/a\u003E, attackers will\ncompress irrelevant data (eg: a long string of repeated bytes).\u003C/p\u003E',
    });

    expect(actual).toBe(expected);
  });
});
