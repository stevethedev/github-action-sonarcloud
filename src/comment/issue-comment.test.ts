import { type Rule } from "@/main/get-rules";
import { type IssueWithUrl } from "@/main/validate-issues";
import { stripIndent } from "common-tags";
import issueComment from "./issue-comment";

describe("issueComment", () => {
  it("should return the issue comment", () => {
    const issue: IssueWithUrl = {
      actions: [],
      comments: [],
      impacts: [],
      tags: [],
      transitions: [],
      key: "key",
      rule: "python:S6660",
      severity: "severity",
      component: "component",
      project: "project",
      line: 1,
      hash: "hash",
      textRange: {
        startLine: 1,
        endLine: 1,
        startOffset: 17,
        endOffset: 36,
      },
      flows: [],
      status: "OPEN",
      message: "Use the `isinstance()` function here.",
      effort: "5min",
      url: "url",
    };
    const rule: Rule = {
      name: '"isinstance()" should be preferred to direct type comparisons',
      description: {
        introduction:
          "\u003Cp\u003EThis rule raises an issue when performing direct type comparisons instead of using the \u003Ccode\u003Eisinstance()\u003C/code\u003E function.\u003C/p\u003E",
        resources:
          '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Python Documentation - \u003Ca href="https://docs.python.org/3/library/functions.html#isinstance"\u003EisInstance() function\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Style Guide for Python Code - \u003Ca href="https://peps.python.org/pep-0008/"\u003EPEP8\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        rootCause:
          '\u003Cp\u003EIn Python, using the \u003Ccode\u003Eisinstance()\u003C/code\u003E function is generally preferred over direct type comparison for several reasons:\u003C/p\u003E\n\u003Col\u003E\n  \u003Cli\u003E \u003Cstrong\u003ECompatibility with inheritance:\u003C/strong\u003E \u003Ccode\u003Eisinstance()\u003C/code\u003E considers inheritance hierarchy, whereas direct type comparison does\n  not. This means that \u003Ccode\u003Eisinstance()\u003C/code\u003E can handle cases where an object belongs to a subclass of the specified type, making your code more\n  flexible and robust. It allows you to write code that can work with objects of different but related types. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003ESupport for duck typing:\u003C/strong\u003E Python follows the principle of "duck typing," which focuses on an object’s behavior rather than its\n  actual type. \u003Ccode\u003Eisinstance()\u003C/code\u003E enables you to check if an object has certain behavior (by checking if it belongs to a particular class or\n  subclass) rather than strictly requiring a specific type. This promotes code reusability and enhances the flexibility of your programs. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003ECode maintainability and extensibility:\u003C/strong\u003E By using \u003Ccode\u003Eisinstance()\u003C/code\u003E, your code becomes more maintainable and\n  extensible. If you directly compare types, you would need to modify your code whenever a new subtype is introduced or the inheritance hierarchy is\n  changed. On the other hand, \u003Ccode\u003Eisinstance()\u003C/code\u003E allows your code to accommodate new types without requiring any modifications, as long as they\n  exhibit the desired behavior. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EPolymorphism and interface-based programming:\u003C/strong\u003E \u003Ccode\u003Eisinstance()\u003C/code\u003E supports polymorphism, which is the ability of\n  different objects to respond to the same method calls. It allows you to design code that interacts with objects based on their shared interface\n  rather than their specific types. This promotes code reuse and modularity, as you can write functions and methods that operate on a range of\n  compatible objects. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EThird-party library compatibility:\u003C/strong\u003E Many third-party libraries and frameworks in Python rely on \u003Ccode\u003Eisinstance()\u003C/code\u003E for\n  type checking and handling different types of objects. By using \u003Ccode\u003Eisinstance()\u003C/code\u003E, your code becomes more compatible with these libraries\n  and frameworks, making it easier to integrate your code into larger projects or collaborate with other developers. \u003C/li\u003E\n\u003C/ol\u003E\n\u003Cp\u003EIn summary, using \u003Ccode\u003Eisinstance()\u003C/code\u003E over direct type comparison in Python promotes flexibility, code reusability, maintainability,\nextensibility, and compatibility with the wider Python ecosystem. It aligns with the principles of object-oriented programming and supports the\ndynamic nature of Python. It is also recommended by the \u003Ca href="https://peps.python.org/pep-0008/"\u003EPEP8\u003C/a\u003E style guide.\u003C/p\u003E',
        howToFix:
          '\u003Cp\u003EUse the \u003Ccode\u003Eisinstance()\u003C/code\u003E function instead of performing direct type comparisons.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nclass MyClass:\n  ...\n\ndef foo(a):\n  if type(a) == MyClass: # Noncompliant\n    ...\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nclass MyClass:\n  ...\n\ndef foo(a):\n  if isinstance(a, MyClass):\n    ...\n\u003C/pre\u003E',
      },
      impacts: [{ metric: "Maintainability", severity: "Medium" }],
    };

    const body = issueComment({ issue, rule });

    const expected = stripIndent`
      ## Use the \`isinstance()\` function here.
      
      <sup>Effort to fix: 5min</sup>
      
      "isinstance()" should be preferred to direct type comparisons
      
      <p>This rule raises an issue when performing direct type comparisons instead of using the <code>isinstance()</code> function.</p>
      
      ### Software qualities impacted:
      
      * (Medium) Maintainability
      
      <details>
      <summary><h3>Why is this an issue?</h3></summary>
      
      <p>In Python, using the <code>isinstance()</code> function is generally preferred over direct type comparison for several reasons:</p>
      <ol>
        <li> <strong>Compatibility with inheritance:</strong> <code>isinstance()</code> considers inheritance hierarchy, whereas direct type comparison does
        not. This means that <code>isinstance()</code> can handle cases where an object belongs to a subclass of the specified type, making your code more
        flexible and robust. It allows you to write code that can work with objects of different but related types. </li>
        <li> <strong>Support for duck typing:</strong> Python follows the principle of "duck typing," which focuses on an object’s behavior rather than its
        actual type. <code>isinstance()</code> enables you to check if an object has certain behavior (by checking if it belongs to a particular class or
        subclass) rather than strictly requiring a specific type. This promotes code reusability and enhances the flexibility of your programs. </li>
        <li> <strong>Code maintainability and extensibility:</strong> By using <code>isinstance()</code>, your code becomes more maintainable and
        extensible. If you directly compare types, you would need to modify your code whenever a new subtype is introduced or the inheritance hierarchy is
        changed. On the other hand, <code>isinstance()</code> allows your code to accommodate new types without requiring any modifications, as long as they
        exhibit the desired behavior. </li>
        <li> <strong>Polymorphism and interface-based programming:</strong> <code>isinstance()</code> supports polymorphism, which is the ability of
        different objects to respond to the same method calls. It allows you to design code that interacts with objects based on their shared interface
        rather than their specific types. This promotes code reuse and modularity, as you can write functions and methods that operate on a range of
        compatible objects. </li>
        <li> <strong>Third-party library compatibility:</strong> Many third-party libraries and frameworks in Python rely on <code>isinstance()</code> for
        type checking and handling different types of objects. By using <code>isinstance()</code>, your code becomes more compatible with these libraries
        and frameworks, making it easier to integrate your code into larger projects or collaborate with other developers. </li>
      </ol>
      <p>In summary, using <code>isinstance()</code> over direct type comparison in Python promotes flexibility, code reusability, maintainability,
      extensibility, and compatibility with the wider Python ecosystem. It aligns with the principles of object-oriented programming and supports the
      dynamic nature of Python. It is also recommended by the <a href="https://peps.python.org/pep-0008/">PEP8</a> style guide.</p>
      </details>
      
      <details>
      <summary><h3>How can I fix it?</h3></summary>
      
      <p>Use the <code>isinstance()</code> function instead of performing direct type comparisons.</p>
      
      <h4>Noncompliant code example</h4>
      <pre data-diff-id="1" data-diff-type="noncompliant">
      class MyClass:
        ...
      
      def foo(a):
        if type(a) == MyClass: # Noncompliant
          ...
      </pre>
      <h4>Compliant solution</h4>
      <pre data-diff-id="1" data-diff-type="compliant">
      class MyClass:
        ...
      
      def foo(a):
        if isinstance(a, MyClass):
          ...
      </pre>
      </details>
      
      <details>
      <summary><h3>Additional Resources</h3></summary>
      
      <h4>Documentation</h4>
      <ul>
        <li> Python Documentation - <a href="https://docs.python.org/3/library/functions.html#isinstance">isInstance() function</a> </li>
        <li> Style Guide for Python Code - <a href="https://peps.python.org/pep-0008/">PEP8</a> </li>
      </ul>
      </details>
      
      <!-- issue-comment:key -->
    `;

    expect(body).toEqual(expected);
  });
});
