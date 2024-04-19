import {
  RawSeverity,
  Severity,
} from "@/sonarcloud-api/rules/search/transform/severity";
import {
  type ApiResponse,
  parseApiResponse,
  type RawApiResponse,
} from "./api-response";
import { RawSoftwareQuality } from "./software-quality";
import { RawStatus, Status } from "./status";
import { RawType, Type } from "./type";

describe("parseApiResponse", () => {
  it("should parse the api response", () => {
    const value: RawApiResponse = {
      total: 1,
      p: 1,
      ps: 1,
      rules: [
        {
          key: "key",
          name: "name",
          lang: "lang",
          langName: "langName",
          sysTags: [],
          tags: [],
          params: [],
          type: Type.CodeSmell,
          htmlDesc: "htmlDesc",
          mdDesc: "mdDesc",
          severity: RawSeverity.Medium,
          status: RawStatus.Beta,
          scope: "scope",
          isExternal: false,
          isTemplate: false,
        },
      ],
    };
    const expected: ApiResponse = {
      total: 1,
      p: 1,
      ps: 1,
      rules: [
        {
          key: "key",
          name: "name",
          lang: "lang",
          langName: "langName",
          isTemplate: false,
          sysTags: [],
          tags: [],
          params: [],
          type: Type.CodeSmell,
          htmlDesc: "htmlDesc",
          mdDesc: "mdDesc",
          severity: Severity.Medium,
          status: Status.Beta,
          scope: "scope",
          isExternal: false,
        },
      ],
    };

    const result = parseApiResponse(value);

    expect(result).toEqual(expected);
  });
});

// Check that an actual API response can be parsed correctly.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _apiResponse: RawApiResponse = {
  total: 5782,
  p: 1,
  ps: 100,
  rules: [
    {
      key: "typescript:S6426",
      name: "Exclusive tests should not be commited to version control",
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Mocha Documentation - \u003Ca href="https://mochajs.org/#exclusive-tests"\u003EExclusive tests\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Jest Documentation - \u003Ca href="https://jestjs.io/docs/next/api#testonlyname-fn-timeout"\u003E\u003Ccode\u003Etest.only()\u003C/code\u003E\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Jest Documentation - \u003Ca href="https://jestjs.io/docs/next/api#describeonlyname-fn"\u003E\u003Ccode\u003Edescribe.only()\u003C/code\u003E\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EWhen using testing frameworks like Mocha and Jest, appending \u003Ccode\u003E.only()\u003C/code\u003E to the test function allows running a single test case for a\nfile. Using \u003Ccode\u003E.only()\u003C/code\u003E means no other test from this file is executed. This is useful when debugging a specific use case.\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\ndescribe("MyClass", function () {\n    it.only("should run correctly", function () { // Noncompliant\n        /*...*/\n    });\n});\n\u003C/pre\u003E\n\u003Cp\u003EHowever, it should not be used in production or development, as it is likely a leftover from debugging and serves no purpose in those contexts. It\nis strongly recommended not to include \u003Ccode\u003E.only()\u003C/code\u003E usages in version control.\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\ndescribe("MyClass", function () {\n    it("should run correctly", function () {\n        /*...*/\n    });\n});\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "csharpsquid:S3242",
      name: "Method parameters should be declared with base types",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWhen a derived type is used as a parameter instead of the base type, it limits the uses of the method. If the additional functionality that is\nprovided in the derived type is not required then that limitation isn’t required, and should be removed.\u003C/p\u003E\n\u003Cp\u003EThis rule raises an issue when a method declaration includes a parameter that is a derived type and accesses only members of the base type.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nusing System;\nusing System.IO;\n\nnamespace MyLibrary\n{\n  public class Foo\n  {\n    public void ReadStream(FileStream stream) // Noncompliant: Uses only System.IO.Stream methods\n    {\n      int a;\n      while ((a = stream.ReadByte()) != -1)\n      {\n            // Do something.\n      }\n    }\n  }\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\nusing System;\nusing System.IO;\n\nnamespace MyLibrary\n{\n  public class Foo\n  {\n    public void ReadStream(Stream stream)\n    {\n      int a;\n      while ((a = stream.ReadByte()) != -1)\n      {\n            // Do something.\n      }\n    }\n  }\n}\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "csharpsquid:S6664",
      name: "The code block contains too many logging calls",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca href="https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/program-building-blocks#statements"\u003ECode blocks\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca\n  href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"\u003EException-handling statements\u003C/a\u003E\n  \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EA code block should not contain too many logging statements of a specific level.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EReduce the number of specific logging level calls within the code block by identifying and selecting essential log statements with relevant\ninformation, necessary for understanding the flow of execution or diagnosing issues.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EWith the default Information threshold parameter value 2:\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nvoid MyMethod(List&lt;MyObject&gt; items)\n{\n    logger.Debug("The operation started");\n    foreach(var item in items)\n    {\n        logger.Information($"Evaluating {item.Name}"); // Noncompliant\n        var result = Evaluate(item);\n        logger.Information($"Evaluating resulted in {result}"); // Secondary 1\n        if (item.Name is string.Empty)\n        {\n            logger.Error("Invalid item name");\n        }\n        logger.Information("End item evaluation"); // Secondary 2\n    }\n    logger.Debug("The operation ended");\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EWith the default Information threshold parameter value 2:\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nvoid MyMethod(List&lt;MyObject&gt; items)\n{\n    logger.Debug("The operation started");\n    foreach(var item in items)\n    {\n        logger.Information($"Evaluating {item.Name}");\n        var result = Evaluate(item);\n        if (item.Name is string.Empty)\n        {\n            logger.Error("Invalid item name");\n        }\n        logger.Information($"End item evaluation with result: {result}");\n    }\n    logger.Debug("The operation ended");\n}\n\u003C/pre\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EExcessive logging within a code block can lead to several problems:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Cstrong\u003ELog file overload\u003C/strong\u003E: generating an overwhelming number of log entries can fill up disk space quickly (thus increasing the\n  storage space cost) and make it challenging to identify important log events promptly. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EPerformance degradation\u003C/strong\u003E: writing a large number of log statements can impact the performance of an application, especially\n  when the logs are placed in frequently executed paths. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003ECode readability and maintainability\u003C/strong\u003E: excessive logging can clutter the code and increase the code’s complexity, making it\n  difficult for developers to identify essential logic. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EOnly the logging statements that are directly within the \u003Ca\nhref="https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/program-building-blocks#statements"\u003Ecode block\u003C/a\u003E will be counted, and any\nlogging statements within nested blocks will count towards their own. For example consider the snippet below:\u003C/p\u003E\n\u003Cpre\u003E\nvoid MyMethod(List&lt;MyObject&gt; items)\n{\n    logger.Debug("The operation started");\n    foreach(var item in items)\n    {\n        logger.Debug($"Evaluating {item.Name}");\n        var result = Evaluate(item);\n        logger.Debug($"Evaluating resulted in {result}");\n    }\n    logger.Debug("The operation ended");\n}\n\u003C/pre\u003E\n\u003Cp\u003EThe rule will count 2 logging statements that are within the method block (namely \u003Ccode\u003Elogger.Debug("The operation started")\u003C/code\u003E and\n\u003Ccode\u003Elogger.Debug("The operation ended")\u003C/code\u003E). Any statements within nested blocks, such as the \u003Ccode\u003Eforeach\u003C/code\u003E block will be counted\nseparately. The rule considers the log level of the calls, as follows:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Cstrong\u003EDebug\u003C/strong\u003E, \u003Cstrong\u003ETrace\u003C/strong\u003E and \u003Cstrong\u003EVerbose\u003C/strong\u003E logging level statements will count together and raise when the\n  \u003Cstrong\u003E\u003Cem\u003EDebug threshold\u003C/em\u003E\u003C/strong\u003E parameter is exceeded (default value: \u003Cem\u003E4\u003C/em\u003E); \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EInformation\u003C/strong\u003E logging level statements will raise when the \u003Cstrong\u003E\u003Cem\u003EInformation threshold\u003C/em\u003E\u003C/strong\u003E parameter is exceeded\n  (default value: \u003Cem\u003E2\u003C/em\u003E); \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EWarning\u003C/strong\u003E logging level statements will raise when the \u003Cstrong\u003E\u003Cem\u003EWarning threshold\u003C/em\u003E\u003C/strong\u003E parameter is exceeded\n  (default value: \u003Cem\u003E1\u003C/em\u003E); \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EError\u003C/strong\u003E and \u003Cstrong\u003EFatal\u003C/strong\u003E logging level statements will count together and raise when the \u003Cstrong\u003E\u003Cem\u003EError\n  threshold\u003C/em\u003E\u003C/strong\u003E parameter is exceeded (default value: \u003Cem\u003E1\u003C/em\u003E); \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThe most popular logging frameworks are supported:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/Microsoft.Extensions.Logging"\u003EMicrosoft.Extensions.Logging\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/Serilog"\u003ESerilog\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/Castle.Core"\u003ECastle.Core\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/NLog"\u003ENLog\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/log4net"\u003Elog4net\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "csharpsquid:S1312",
      name: 'Logger fields should be "private static readonly"',
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers"\u003EAccess\n  modifiers\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca\n  href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members"\u003E\u003Ccode\u003Estatic\u003C/code\u003E class members\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/readonly"\u003E\u003Ccode\u003Ereadonly\u003C/code\u003E\n  keyword\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Wikipedia - \u003Ca href="https://en.wikipedia.org/wiki/Service_locator_pattern"\u003EService locator pattern\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Wikipedia - \u003Ca href="https://en.wikipedia.org/wiki/Dependency_injection"\u003EDependency injection\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EArticles &amp; blog posts\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://stackoverflow.com/questions/968132/c-sharp-private-static-and-readonly"\u003EC# \u003Ccode\u003Eprivate\u003C/code\u003E, \u003Ccode\u003Estatic\u003C/code\u003E, and\n  \u003Ccode\u003Ereadonly\u003C/code\u003E\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003ERegardless of the logging framework in use (Microsoft.Extension.Logging, Serilog, Log4net, NLog, …​​), logger fields should be:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Cstrong\u003Eprivate\u003C/strong\u003E: this restricts access to the logger from outside the enclosing type (class, struct, record…​). Using any other access\n  modifier would allow other types to use the logger to log messages in the type where it’s defined. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003Estatic\u003C/strong\u003E: making the logger field \u003Ccode\u003Estatic\u003C/code\u003E will ensure that the lifetime of the object doesn’t depend on the lifetime\n  of the instance of the enclosing type. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003Ereadonly\u003C/strong\u003E: marking the field as \u003Ccode\u003Ereadonly\u003C/code\u003E will prevent modifications to the reference of the logger. This ensures\n  that the reference to the logger remains consistent and doesn’t get accidentally reassigned during the lifetime of the enclosing type. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThis rule should be activated when \u003Ca href="https://en.wikipedia.org/wiki/Service_locator_pattern"\u003EService Locator Design pattern\u003C/a\u003E is followed\nin place of \u003Ca href="https://en.wikipedia.org/wiki/Dependency_injection"\u003EDependency Injection\u003C/a\u003E for logging.\u003C/p\u003E\n\u003Cp\u003EThe rule supports the most popular logging frameworks:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://www.nuget.org/packages/Microsoft.Extensions.Logging"\u003EMicrosoft.Extensions.Logging\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://www.nuget.org/packages/Serilog"\u003ESerilog\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://www.nuget.org/packages/Castle.Core"\u003ECastle.Core\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://www.nuget.org/packages/NLog"\u003ENLog\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://www.nuget.org/packages/log4net"\u003Elog4net\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\npublic Logger logger;\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nprivate static readonly Logger logger;\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "csharpsquid:S6669",
      name: "Logger field or property name should comply with a naming convention",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003ESharing some naming conventions is a key point to make it possible for a team to efficiently collaborate. This rule checks that the logger field or\nproperty name matches a provided regular expression.\u003C/p\u003E\n\u003Cp\u003EThe default regex will consider compliant the followings:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ccode\u003Elogger\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E_logger\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003ELogger\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E_Logger\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003Elog\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E_log\u003C/code\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThe rule supports the most popular logging frameworks:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/Microsoft.Extensions.Logging"\u003EMicrosoft.Extensions.Logging\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/Serilog"\u003ESerilog\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/Castle.Core"\u003ECastle.Core\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/NLog"\u003ENLog\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Nuget package - \u003Ca href="https://www.nuget.org/packages/log4net"\u003Elog4net\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nprivate readonly ILogger myLogger; // Noncompliant\n\npublic ILogger MyLogger { get; set; } // Noncompliant\n\u003C/pre\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nprivate readonly ILogger logger; // Compliant\n\npublic ILogger Logger { get; set; } // Compliant\n\u003C/pre\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca href="https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions"\u003ECoding conventions\u003C/a\u003E\n  \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "vbnet:S6931",
      name: 'ASP.NET controller actions should not have a route template starting with "/"',
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n&lt;Route("[controller]")&gt; \' This route is ignored\nPublic Class ReviewsController\n    Inherits Controller\n\n    \' Route is /reviews\n    &lt;HttpGet("/reviews")&gt;\n    Public Function Index() As ActionResult\n        \' ...\n    End Function\n\n    \' Route is /reviews/{reviewId}\n    &lt;Route("/reviews/{reviewId}")&gt;\n    Public Function Show(reviewId As Integer) As ActionResult\n        \' ...\n    End Function\nEnd Class\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n&lt;Route("/")&gt; \' Turns on attribute routing\nPublic Class ReviewsController\n    Inherits Controller\n\n    \' Route is /reviews\n    &lt;HttpGet("reviews")&gt;\n    Public Function Index() As ActionResult\n        \' ...\n    End Function\n\n    \' Route is /reviews/{reviewId}\n    &lt;Route("reviews/{reviewId}")&gt;\n    Public Function Show(reviewId As Integer) As ActionResult\n        \' ...\n    End Function\nEnd Class\n\u003C/pre\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing"\u003EASP.NET Core: Routing to controller actions\n  in ASP.NET Core\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing#attribute-routing-for-rest-apis"\u003EASP.NET Core:\n  Routing to controller actions in ASP.NET Core - Attribute routing for REST APIs\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/actions"\u003EASP.NET Core: Handle requests with\n  controllers in ASP.NET Core MVC\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Microsoft Learn - \u003Ca\n  href="https://learn.microsoft.com/en-us/aspnet/mvc/overview/older-versions-1/controllers-and-routing/asp-net-mvc-routing-overview-cs"\u003EASP.NET MVC\n  Routing Overview (C#)\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EArticles &amp; blog posts\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E .NET Blog - \u003Ca href="https://devblogs.microsoft.com/dotnet/attribute-routing-in-asp-net-mvc-5/"\u003EAttribute Routing in ASP.NET MVC 5\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003E\u003Ca href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing"\u003ERouting\u003C/a\u003E in ASP.NET Core MVC maps \u003Ca\nhref="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/actions#what-is-a-controller"\u003Econtrollers\u003C/a\u003E and \u003Ca\nhref="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/actions#defining-actions"\u003Eactions\u003C/a\u003E to paths in request \u003Ca\nhref="https://en.wikipedia.org/wiki/Uniform_Resource_Identifier"\u003EURIs\u003C/a\u003E. Similar \u003Ca\nhref="https://learn.microsoft.com/en-us/aspnet/mvc/overview/older-versions-1/controllers-and-routing/asp-net-mvc-routing-overview-cs"\u003Erouting\u003C/a\u003E\nhappens in ASP.NET Framework MVC.\u003C/p\u003E\n\u003Cp\u003EIn ASP.NET Core MVC, when an action defines a route template starting with a "/", the route is considered absolute and the action is registered at\nthe root of the web application.\u003C/p\u003E\n\u003Cp\u003EIn such a scenario, any route defined at the controller level is disregarded, as shown in the following example:\u003C/p\u003E\n\u003Cpre\u003E\n&lt;Route("[controller]")&gt; \' This route is ignored for the routing of Index1 and Index2\nPublic Class HomeController\n    Inherits Controller\n\n    &lt;HttpGet("/Index1")&gt; \' This action is mapped to the root of the web application\n    Public Function Index1() As ActionResult\n        Return View()\n    End Function\n\n    &lt;Route("/Index2")&gt;   \' The same applies here\n    Public Function Index2() As ActionResult\n        Return View()\n    End Function\nEnd Class\n\u003C/pre\u003E\n\u003Cp\u003EThe behavior can be found confusing and surprising because any relative action route is relativized to the controller route.\u003C/p\u003E\n\u003Cp\u003ETherefore, in the vast majority of scenarios, controllers group all related actions not only in the source code, but also at the routing level.\u003C/p\u003E\n\u003Cp\u003EIn ASP.NET Framework MVC with attribute routing enabled via \u003Ca\nhref="https://learn.microsoft.com/en-us/dotnet/api/system.web.mvc.routecollectionattributeroutingextensions.mapmvcattributeroutes"\u003E\u003Ccode\u003EMapMvcAttributeRoutes\u003C/code\u003E\u003C/a\u003E,\nthe mere presence of an absolute route at the action level will produce an \u003Ccode\u003EInvalidOperationException\u003C/code\u003E at runtime.\u003C/p\u003E\n\u003Cp\u003EIt is then a good practice to avoid absolute routing at the action level and move the "/" to the root level, changing the template defined in the\n\u003Ccode\u003ERouteAttribute\u003C/code\u003E of the controller appropriately.\u003C/p\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003EThe rule only applies when all route templates of all actions of the controller start with "/". Sometimes some actions may have both relative and\nabsolute route templates, for example for backward compatibility reasons (i.e. a former route needs to be preserved). In such scenarios, it may make\nsense to keep the absolute route template at the action level.\u003C/p\u003E',
        },
        {
          key: "introduction",
          content:
            '\u003Cp\u003ERoute templates for \u003Ca href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/actions#defining-actions"\u003EASP.NET controller\nactions\u003C/a\u003E, defined via a \u003Ca\nhref="https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.routeattribute"\u003E\u003Ccode\u003ERouteAttribute\u003C/code\u003E\u003C/a\u003E or any derivation of \u003Ca\nhref="https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.routing.httpmethodattribute"\u003E\u003Ccode\u003EHttpMethodAttribute\u003C/code\u003E\u003C/a\u003E, should\nnot start with "/".\u003C/p\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "common-java:DuplicatedBlocks",
      name: "Source files should not have any duplicated blocks",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "default",
          content:
            "An issue is created on a file as soon as there is at least one block of duplicated code on this file",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "java:S6816",
      name: "Nullable injected fields and parameters should provide a default value",
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EArticles &amp; blog posts\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Baeldung - \u003Ca href="https://www.baeldung.com/spring-value-defaults"\u003EUsing Spring @Value With Defaults\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003ESpEL, the Spring Expression Languages allows developers fine-grained control over the values injected into fields and parameters. Using the\n\u003Ccode\u003E@Value\u003C/code\u003E annotation, it is possible to inject values from sources such as system properties.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EAdd a default value to the \u003Ccode\u003E@Value\u003C/code\u003E annotation. A default value can be supplied by using the colon (\u003Ccode\u003E:\u003C/code\u003E) operator. As the\nfield is nullable, the default value should most likely be \u003Ccode\u003E#{null}\u003C/code\u003E.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n@Nullable\n@Value("${my.property}") // Noncompliant, no default value is provided, even though the field is nullable\nprivate String myProperty;\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n@Nullable\n@Value("${my.property:#{null}}") // Compliant, a default value is provided\nprivate String myProperty;\n\u003C/pre\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EThe \u003Ccode\u003E@Value\u003C/code\u003E annotation does not guarantee that the property is defined. Particularly if a field or parameter is annotated as nullable,\nit indicates that the developer assumes that the property may be undefined.\u003C/p\u003E\n\u003Cp\u003EAn undefined property may lead to runtime exceptions when the Spring framework tries to inject the autowired dependency during bean creation.\u003C/p\u003E\n\u003Cp\u003EThis rule raises an issue when a nullable field or parameter is annotated with \u003Ccode\u003E@Value\u003C/code\u003E and no default value is provided.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "java:S6878",
      name: "Use record pattern instead of explicit field access",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://openjdk.org/jeps/440"\u003EJEP 440: Record Patterns\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EJava 21 enhances Pattern Matching, introduced in Java 16, with a \u003Cem\u003Erecord pattern\u003C/em\u003E that decomposes records into local variables. This form\nshould be used when all fields of a record are accessed within a block for improved readability. Nested record patterns are also allowed and should be\nused when a record field is another record, and all its fields are accessed.\u003C/p\u003E\n\u003Ch2\u003EExceptions\u003C/h2\u003E\n\u003Cp\u003EThis rule does not apply when not all record fields are accessed. This prevents the creation of unused local variables in the decomposed record\nstructure.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EReplace the instance check or simple pattern matching with a record pattern.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EThis example uses pattern matching but not a record pattern, even though all fields of the record are accessed in the block.\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nrecord Point(Float x, Float y, Float z) {}\n\nvoid print(Object obj) {\n    if (obj instanceof Point p) { // Noncompliant, because all three fields x, y, z are accessed\n        Float x = p.x;\n        Float y = p.y();\n        System.out.println(x + y + p.z);\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EThe compliant example uses a record pattern to decompose the record structure.\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nrecord Point(Float x, Float y, Float z) {}\n\nvoid print(Object obj) {\n    if (obj instanceof Point(Float x, Float y, Float z)) { // Compliant\n        System.out.println(x + y + z);\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EThis example does not use pattern matching or a record pattern. Rule \u003Cem\u003E\u003Ca\nhref="https://sonarsource.github.io/rspec/#/rspec/\u003Ca href=\'/organizations/my-org/rules?open=java%3AS6201&rule_key=java%3AS6201\'\u003ES6201\u003C/a\u003E"\u003E\u003Ca href=\'/organizations/my-org/rules?open=java%3AS6201&rule_key=java%3AS6201\'\u003ES6201\u003C/a\u003E - Pattern matching or "instanceOf" operator should be\nused\u003C/a\u003E\u003C/em\u003E would report first. When fixed using simple pattern matching instead of a record pattern, this rule (\u003Ca href=\'/organizations/my-org/rules?open=java%3AS6878&rule_key=java%3AS6878\'\u003ES6878\u003C/a\u003E) will report.\u003C/p\u003E\n\u003Cpre data-diff-id="2" data-diff-type="noncompliant"\u003E\nvoid print(Object obj) {\n    if (obj instanceof Point) { // Noncompliant\n        Point p = (Point) obj;\n        Float x = p.x;\n        Float y = p.y();\n        System.out.println(x + y + p.z);\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EThe solution compliant with both rules, \u003Ca href=\'/organizations/my-org/rules?open=java%3AS6201&rule_key=java%3AS6201\'\u003ES6201\u003C/a\u003E and \u003Ca href=\'/organizations/my-org/rules?open=java%3AS6878&rule_key=java%3AS6878\'\u003ES6878\u003C/a\u003E, uses pattern matching and decomposes the record structure using a\nrecord pattern.\u003C/p\u003E\n\u003Cpre data-diff-id="2" data-diff-type="compliant"\u003E\nvoid print(Object obj) {\n    if (obj instanceof Point(Float x, Float y, Float z)) { // Compliant\n        System.out.println(x + y + z);\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EThis example is noncompliant because a nested record pattern could have been used.\u003C/p\u003E\n\u003Cpre data-diff-id="3" data-diff-type="noncompliant"\u003E\nrecord Plane(Point normal, Float d) {}\n\nvoid print(Object obj) {\n    // Noncompliant, because all field of "normal" are accessed\n    if (obj instanceof Plane(Point normal, Float d)) {\n        System.out.println(normal.x + normal.y + normal.z);\n        System.out.println(d);\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EThis is the same example using a nested record pattern.\u003C/p\u003E\n\u003Cpre data-diff-id="3" data-diff-type="compliant"\u003E\nvoid print(Object obj) {\n    if (obj instanceof Plane(Point(Float x, Float y, Float z), Float d)) { // Compliant\n        System.out.println(x + y + z);\n        System.out.println(d);\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EThis example uses \u003Ccode\u003Evar\u003C/code\u003E instead of replicating the field types in the record pattern, which is less verbose and keeps the code more\nreadable, especially in the case of longer type names. Also, it uses variable names that do not match the original field names. The reason for this\ncan be to avoid name collisions with fields or other local variables.\u003C/p\u003E\n\u003Cpre\u003E\nvoid print(Object obj) {\n    if (obj instanceof Point(var px, var py, var pz)) { // Compliant\n        System.out.println(px + py + pz);\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EThis example is compliant without using a record pattern, as it does not access all fields.\u003C/p\u003E\n\u003Cpre\u003E\nvoid print(Object obj) {\n    if (obj instanceof Point p) { // Compliant, because z is never accessed\n        Float x = p.x;\n        Float y = p.y();\n        System.out.println(x + y);\n    }\n}\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "java:S6906",
      name: "Virtual threads should not run tasks that include synchronized code",
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EJava 21 virtual threads allow the JVM to optimize the usage of OS threads, by mounting and unmounting them on an OS thread when needed, and making\nthem more efficient when dealing with blocking operations such as HTTP requests or I/O.\u003C/p\u003E\n\u003Cp\u003EHowever, when code is executed inside a \u003Ccode\u003Esynchronized\u003C/code\u003E block or \u003Ccode\u003Esynchronized\u003C/code\u003E method, the virtual thread stays pinned to the\nunderlying OS thread and cannot be unmounted during a blocking operation. This will cause the OS thread to be blocked, which can impact the\nscalability of the application.\u003C/p\u003E\n\u003Cp\u003ETherefore, virtual threads should not execute code that contains \u003Ccode\u003Esynchronized\u003C/code\u003E blocks or invokes \u003Ccode\u003Esynchronized\u003C/code\u003E methods.\nPlatform threads should be used in these cases.\u003C/p\u003E\n\u003Cp\u003EThis rule raises an issue when a virtual thread contains \u003Ccode\u003Esynchronized\u003C/code\u003E blocks or invokes \u003Ccode\u003Esynchronized\u003C/code\u003E methods.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nvoid enqueue(){\n    Thread.startVirtualThread(() -&gt; { // Noncompliant; use a platform thread instead\n            setupOperations();\n            dequeLogic();\n        }\n    });\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nvoid enqueue(){\n    new Thread(() -&gt; {\n        synchronized {\n            setupOperations();\n            dequeLogic();\n        }\n    }).start();\n}\n\u003C/pre\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="2" data-diff-type="noncompliant"\u003E\nvoid enqueue2(){\n    Thread.startVirtualThread(() -&gt; { // Noncompliant; use a platform thread instead of a virtual one\n        if(someCondition){\n            synchronizedMethod();\n        }else{\n            defaultLogic();\n        }\n    });\n}\nsynchronized void synchronizedMethod(){}\nvoid defaultLogic(){}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="2" data-diff-type="compliant"\u003E\nvoid enqueue2(){\n    new Thread(() -&gt; {\n        if(someCondition){\n            synchronizedMethod();\n        }else{\n            defaultLogic();\n        }\n    }).start();\n}\nsynchronized void synchronizedMethod(){}\nvoid defaultLogic(){}\n\u003C/pre\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Java Documentation - \u003Ca href="https://openjdk.org/jeps/444#:~:text=There%20are%20two,by%20capturing%20carriers"\u003EVirtual threads, pinning\n  scenarios\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "java:S6913",
      name: '"Math.clamp" should be used with correct ranges',
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E If 2nd argument &gt; 3rd argument, use \u003Ccode\u003EMath.clamp(value, min, max)\u003C/code\u003E instead of \u003Ccode\u003EMath.clamp(value, max, min)\u003C/code\u003E. \u003C/li\u003E\n  \u003Cli\u003E If \u003Ccode\u003Evalue\u003C/code\u003E is the same as \u003Ccode\u003Emin\u003C/code\u003E, fix the logic or use \u003Ccode\u003EMath.min(value, max)\u003C/code\u003E instead. \u003C/li\u003E\n  \u003Cli\u003E If \u003Ccode\u003Evalue\u003C/code\u003E is the same as \u003Ccode\u003Emax\u003C/code\u003E, fix the logic or use \u003Ccode\u003EMath.max(min, value)\u003C/code\u003E instead. \u003C/li\u003E\n  \u003Cli\u003E If \u003Ccode\u003Emin\u003C/code\u003E is the same as \u003Ccode\u003Emax\u003C/code\u003E, fix the logic because \u003Ccode\u003EMath.clamp(value, x, x)\u003C/code\u003E will always return\n  \u003Ccode\u003Ex\u003C/code\u003E. \u003C/li\u003E\n\u003C/ul\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nMath.clamp(red, 255, 0); // Noncompliant, [255,0] is not a valid range\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nMath.clamp(red, 0, 255); // Compliant\n\u003C/pre\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="2" data-diff-type="noncompliant"\u003E\nMath.clamp(red, red, 255); // Noncompliant, use Math.min(red, 255)\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="2" data-diff-type="compliant"\u003E\nMath.min(red, 255); // Compliant\n\u003C/pre\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="3" data-diff-type="noncompliant"\u003E\nMath.clamp(red, 0, red); // Noncompliant, use Math.max(red, 0)\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="3" data-diff-type="compliant"\u003E\nMath.max(red, 0); // Compliant\n\u003C/pre\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E Java Documentation - \u003Ca\n  href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html#clamp(long,int,int)"\u003EMath.clamp\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EJava 21 introduces the new method \u003Ccode\u003EMath.clamp(value, min, max)\u003C/code\u003E that fits a value within a specified interval. Before Java 21, this\nbehavior required explicit calls to the \u003Ccode\u003EMath.min\u003C/code\u003E and \u003Ccode\u003EMath.max\u003C/code\u003E methods, as in \u003Ccode\u003EMath.min(max, Math.max(value,\nmin))\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003EIf \u003Ccode\u003Emin &gt; max\u003C/code\u003E, \u003Ccode\u003EMath.clamp\u003C/code\u003E throws an \u003Ccode\u003EIllegalArgumentException\u003C/code\u003E, indicating an invalid interval. This can\noccur if the \u003Ccode\u003Emin\u003C/code\u003E and \u003Ccode\u003Emax\u003C/code\u003E arguments are mistakenly reversed.\u003C/p\u003E\n\u003Cp\u003ENote that \u003Ccode\u003EMath.clamp\u003C/code\u003E is not a general substitute for \u003Ccode\u003EMath.min\u003C/code\u003E or \u003Ccode\u003EMath.max\u003C/code\u003E, but for the combination of both.\nIf \u003Ccode\u003Evalue\u003C/code\u003E is the same as \u003Ccode\u003Emin\u003C/code\u003E or \u003Ccode\u003Emax\u003C/code\u003E, using \u003Ccode\u003EMath.clamp\u003C/code\u003E is unnecessary and \u003Ccode\u003EMath.min\u003C/code\u003E or\n\u003Ccode\u003EMath.max\u003C/code\u003E should be used instead.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "java:S6915",
      name: '"String.indexOf" should be used with correct ranges',
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E Java Documentation - \u003Ca\n  href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#indexOf(int,int,int)"\u003EString.indexOf(int, int, int)\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E Java Documentation - \u003Ca\n  href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#indexOf(java.lang.String,int,int)"\u003EString.indexOf(java.lang.String,int,int)\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EJava 21 adds new \u003Ccode\u003EString.indexOf\u003C/code\u003E methods that accept ranges (\u003Ccode\u003EbeginIndex\u003C/code\u003E, to \u003Ccode\u003EendIndex\u003C/code\u003E) rather than just a\nstart index. A \u003Ccode\u003EStringIndexOutOfBounds\u003C/code\u003E can be thrown when indicating an invalid range, namely when:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ccode\u003EbeginIndex &gt; endIndex\u003C/code\u003E (eg: \u003Ccode\u003EbeginIndex\u003C/code\u003E and \u003Ccode\u003EendIndex\u003C/code\u003E arguments are mistakenly reversed) \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003EbeginIndex &lt; 0\u003C/code\u003E (eg: because the older \u003Ccode\u003EString.indexOf(what, fromIndex)\u003C/code\u003E accepts negative values) \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E Use \u003Ccode\u003EString.indexOf(what, beginIndex, endIndex)\u003C/code\u003E instead of \u003Ccode\u003EString.indexOf(what, endIndex, beginIndex)\u003C/code\u003E. \u003C/li\u003E\n  \u003Cli\u003E Use \u003Ccode\u003EString.indexOf(what, 0, endIndex)\u003C/code\u003E instead of \u003Ccode\u003EString.indexOf(what, -1, endIndex)\u003C/code\u003E. \u003C/li\u003E\n\u003C/ul\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nString hello = "Hello, world!";\nint index = hello.indexOf(\'o\', 11, 7); // Noncompliant, 11..7 is not a valid range\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nString hello = "Hello, world!";\nint index = hello.indexOf(\'o\', 7, 11); // Compliant\n\u003C/pre\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="2" data-diff-type="noncompliant"\u003E\nString hello = "Hello, world!";\nint index = hello.indexOf(\'o\', -1, 11); // Noncompliant, because beginIndex is negative\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="2" data-diff-type="compliant"\u003E\nString hello = "Hello, world!";\nint index = hello.indexOf(\'o\', 0, 11); // Compliant\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "java:S2647",
      name: "Basic authentication should not be used",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E MDN web docs - \u003Ca href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication"\u003EHTTP authentication\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A04_2021-Insecure_Design/"\u003ETop 10 2021 Category A4 - Insecure Design\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://cheatsheetseries.owasp.org/cheatsheets/Web_Service_Security_Cheat_Sheet.html#user-authentication"\u003EOWASP Web Service Security\n  Cheat Sheet\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/522"\u003ECWE-522 - Insufficiently Protected Credentials\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code uses basic authentication to send out an HTTP request to a protected endpoint.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nimport org.apache.http.client.methods.HttpPost;\n\nString encoded = Base64.getEncoder().encodeToString("login:passwd".getBytes());\nHttpPost httpPost = new HttpPost("http://api.example.com/foo");\nhttpPost.setHeader("Authorization", "Basic " + encoded); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nimport org.apache.http.client.methods.HttpPost;\n\n// An access token should be retrieved before the HTTP request\nString accessToken = System.getenv("ACCESS_TOKEN");\nHttpPost httpPost = new HttpPost("http://api.example.com/foo");\nhttpPost.setHeader("Authorization", "Bearer " + accessToken);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Ch4\u003EToken-based authentication and OAuth\u003C/h4\u003E\n\u003Cp\u003EToken-based authentication is a safer alternative than basic authentication. A unique token is generated upon successful authentication and sent to\nthe client, which is then included in subsequent requests. Therefore, it eliminates the need to transmit sensitive credentials with each request.\nOAuth also works by authenticating users via tokens. It gives even more flexibility on top of this by offering scopes, which limit an application’s\naccess to a user’s account.\u003C/p\u003E\n\u003Cp\u003EAdditionally, both token-based authentication and OAuth support mechanisms for token expiration, revocation, and refresh. This gives more\nflexibility than basic authentication, as compromised tokens carry much less risk than a compromised password.\u003C/p\u003E\n\u003Ch4\u003ESSL encryption for HTTP requests\u003C/h4\u003E\n\u003Cp\u003EWith basic authentication, user credentials are transmitted in plain text, which makes them vulnerable to interception and eavesdropping. However,\nwhen HTTPS is employed, the data is encrypted before transmission, making it significantly more difficult for attackers to intercept and decipher the\ncredentials. If no other form of authentication is possible for this code, then every request must be sent over HTTPS to ensure credentials are kept\nsafe.\u003C/p\u003E',
          context: {
            displayName: "Apache HttpClient",
            key: "apache_httpclient",
          },
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EBasic authentication is a vulnerable method of user authentication that should be avoided. It functions by transmitting a Base64 encoded username\nand password. As Base64 is easy to recognize and reverse, sensitive data may be leaked this way.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EBasic authentication is a simple and widely used method of user authentication for HTTP requests. When a client sends a request to a server that\nrequires authentication, the client includes the username and password (concatenated together and Base64 encoded) in the "Authorization" header of the\nHTTP request. The server verifies the credentials and grants access if they are valid. Every request sent to the server to a protected endpoint must\ninclude these credentials.\u003C/p\u003E\n\u003Cp\u003EBasic authentication is considered insecure for several reasons:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E It transmits user credentials in plain text, making them susceptible to interception and eavesdropping. \u003C/li\u003E\n  \u003Cli\u003E It relies solely on the server’s ability to verify the provided credentials. There is no mechanism for additional security measures like\n  multi-factor authentication or account lockouts after multiple failed login attempts. \u003C/li\u003E\n  \u003Cli\u003E It does not provide a way to manage user sessions securely. The client typically includes the credentials in every request, which creates more\n  opportunities for an attacker to steal these credentials. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThese security limitations make basic authentication an insecure choice for authentication or authorization over HTTP.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EBasic authentication transmits passwords in plain text, which makes it vulnerable to interception by attackers.\u003C/p\u003E\n\u003Ch4\u003ESession hijacking and man-in-the-middle attack\u003C/h4\u003E\n\u003Cp\u003EIf an attacker gains access to the network traffic, they can easily capture the username and password. Basic authentication does not provide any\nmechanism to protect against session hijacking attacks. Once a user is authenticated, the session identifier (the username and password) is sent in\nclear text with each subsequent request. If attackers can intercept one request, they can use it to impersonate the authenticated user, gaining\nunauthorized access to their account and potentially performing malicious actions.\u003C/p\u003E\n\u003Ch4\u003EBrute-force attacks\u003C/h4\u003E\n\u003Cp\u003EBasic authentication does not have any built-in protection against brute-force attacks. Attackers can repeatedly guess passwords until they find\nthe correct one, especially if weak or commonly used passwords are used. This can lead to unauthorized access to user accounts and potential data\nbreaches.\u003C/p\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code uses basic authentication to send out an HTTP request to a protected endpoint.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="101" data-diff-type="noncompliant"\u003E\nString encoded = Base64.getEncoder().encodeToString("login:passwd".getBytes());\nHttpURLConnection conn = (HttpURLConnection) url.openConnection();\nconn.setRequestMethod("POST");\nconn.setDoOutput(true);\nconn.setRequestProperty("Authorization", "Basic " + encoded); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="101" data-diff-type="compliant"\u003E\n// An access token should be retrieved before the HTTP request\nString accessToken = System.getenv("ACCESS_TOKEN");\nHttpURLConnection conn = (HttpURLConnection) url.openConnection();\nconn.setRequestMethod("POST");\nconn.setDoOutput(true);\nconn.setRequestProperty("Authorization", "Bearer " + accessToken);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Ch4\u003EToken-based authentication and OAuth\u003C/h4\u003E\n\u003Cp\u003EToken-based authentication is a safer alternative than basic authentication. A unique token is generated upon successful authentication and sent to\nthe client, which is then included in subsequent requests. Therefore, it eliminates the need to transmit sensitive credentials with each request.\nOAuth also works by authenticating users via tokens. It gives even more flexibility on top of this by offering scopes, which limit an application’s\naccess to a user’s account.\u003C/p\u003E\n\u003Cp\u003EAdditionally, both token-based authentication and OAuth support mechanisms for token expiration, revocation, and refresh. This gives more\nflexibility than basic authentication, as compromised tokens carry much less risk than a compromised password.\u003C/p\u003E\n\u003Ch4\u003ESSL encryption for HTTP requests\u003C/h4\u003E\n\u003Cp\u003EWith basic authentication, user credentials are transmitted in plain text, which makes them vulnerable to interception and eavesdropping. However,\nwhen HTTPS is employed, the data is encrypted before transmission, making it significantly more difficult for attackers to intercept and decipher the\ncredentials. If no other form of authentication is possible for this code, then every request must be sent over HTTPS to ensure credentials are kept\nsafe.\u003C/p\u003E',
          context: {
            displayName: "Java SE",
            key: "java_se",
          },
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "java:S5194",
      name: 'Use Java 14 "switch" expression',
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EMany existing switch statements are essentially simulations of switch expressions, where each arm either assigns to a common target variable or\nreturns a value. Expressing this as a statement is roundabout, repetitive, and error-prone.\u003C/p\u003E\n\u003Cp\u003EJava 14 added support for switch expressions, which provide more succinct and less error-prone version of switch.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nvoid day_of_week(DoW day) {\n    int numLetters;\n    switch (day) {  // Noncompliant\n      case MONDAY:\n      case FRIDAY:\n      case SUNDAY:\n        numLetters = 6;\n        break;\n      case TUESDAY:\n        numLetters = 7;\n        break;\n      case THURSDAY:\n      case SATURDAY:\n        numLetters = 8;\n        break;\n      case WEDNESDAY:\n        numLetters = 9;\n        break;\n      default:\n        throw new IllegalStateException("Wat: " + day);\n    }\n}\n\nint return_switch(int x) {\n    switch (x) { // Noncompliant\n      case 1:\n        return 1;\n      case 2:\n        return 2;\n      default:\n        throw new IllegalStateException();\n    }\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\nint numLetters = switch (day) {\n    case MONDAY, FRIDAY, SUNDAY -&gt; 6;\n    case TUESDAY                -&gt; 7;\n    case THURSDAY, SATURDAY     -&gt; 8;\n    case WEDNESDAY              -&gt; 9;\n};\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "java:S2077",
      name: "Formatting SQL queries is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Some parts of the query come from untrusted values (like user inputs). \u003C/li\u003E\n  \u003Cli\u003E The query is repeated/duplicated in other parts of the code. \u003C/li\u003E\n  \u003Cli\u003E The application must support different types of relational databases. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Use \u003Ca href="https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html"\u003Eparameterized queries, prepared\n  statements, or stored procedures\u003C/a\u003E and bind variables to SQL query parameters. \u003C/li\u003E\n  \u003Cli\u003E Consider using ORM frameworks if there is a need to have an abstract layer to access data. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\npublic User getUser(Connection con, String user) throws SQLException {\n\n  Statement stmt1 = null;\n  Statement stmt2 = null;\n  PreparedStatement pstmt;\n  try {\n    stmt1 = con.createStatement();\n    ResultSet rs1 = stmt1.executeQuery("GETDATE()"); // No issue; hardcoded query\n\n    stmt2 = con.createStatement();\n    ResultSet rs2 = stmt2.executeQuery("select FNAME, LNAME, SSN " +\n                 "from USERS where UNAME=" + user);  // Sensitive\n\n    pstmt = con.prepareStatement("select FNAME, LNAME, SSN " +\n                 "from USERS where UNAME=" + user);  // Sensitive\n    ResultSet rs3 = pstmt.executeQuery();\n\n    //...\n}\n\npublic User getUserHibernate(org.hibernate.Session session, String data) {\n\n  org.hibernate.Query query = session.createQuery(\n            "FROM students where fname = " + data);  // Sensitive\n  // ...\n}\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\npublic User getUser(Connection con, String user) throws SQLException {\n\n  Statement stmt1 = null;\n  PreparedStatement pstmt = null;\n  String query = "select FNAME, LNAME, SSN " +\n                 "from USERS where UNAME=?"\n  try {\n    stmt1 = con.createStatement();\n    ResultSet rs1 = stmt1.executeQuery("GETDATE()");\n\n    pstmt = con.prepareStatement(query);\n    pstmt.setString(1, user);  // Good; PreparedStatements escape their inputs.\n    ResultSet rs2 = pstmt.executeQuery();\n\n    //...\n  }\n}\n\npublic User getUserHibernate(org.hibernate.Session session, String data) {\n\n  org.hibernate.Query query =  session.createQuery("FROM students where fname = ?");\n  query = query.setParameter(0,data);  // Good; Parameter binding escapes all input\n\n  org.hibernate.Query query2 =  session.createQuery("FROM students where fname = " + data); // Sensitive\n  // ...\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A03_2021-Injection/"\u003ETop 10 2021 Category A3 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A1_2017-Injection"\u003ETop 10 2017 Category A1 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/89"\u003ECWE-89 - Improper Neutralization of Special Elements used in an SQL Command\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/564"\u003ECWE-564 - SQL Injection: Hibernate\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/20"\u003ECWE-20 - Improper Input Validation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/943"\u003ECWE-943 - Improper Neutralization of Special Elements in Data Query Logic\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://wiki.sei.cmu.edu/confluence/x/ITdGBQ"\u003ECERT, IDS00-J.\u003C/a\u003E - Prevent SQL injection \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rules \u003Ca href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#SQL_INJECTION_JPA"\u003EPotential SQL/JPQL Injection\n  (JPA)\u003C/a\u003E, \u003Ca href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#SQL_INJECTION_JDO"\u003EPotential SQL/JDOQL Injection (JDO)\u003C/a\u003E, \u003Ca\n  href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#SQL_INJECTION_HIBERNATE"\u003EPotential SQL/HQL Injection (Hibernate)\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EFormatted SQL queries can be difficult to maintain, debug and can increase the risk of SQL injection when concatenating untrusted values into the\nquery. However, this rule doesn’t detect SQL injections (unlike rule \u003Ca href='/organizations/my-org/rules?open=javasecurity%3AS3649&rule_key=javasecurity%3AS3649'\u003ES3649\u003C/a\u003E), the goal is only to highlight complex/formatted queries.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "java:S4347",
      name: "Secure random number generators should not output predictable values",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code uses a cryptographically strong random number generator to generate data that is not cryptographically strong.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nSecureRandom sr = new SecureRandom();\nsr.setSeed(123456L); // Noncompliant\nint v = sr.next(32);\n\u003C/pre\u003E\n\u003Cpre data-diff-id="2" data-diff-type="noncompliant"\u003E\nSecureRandom sr = new SecureRandom("abcdefghijklmnop".getBytes("us-ascii")); // Noncompliant\nint v = sr.next(32);\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nSecureRandom sr = new SecureRandom();\nint v = sr.next(32);\n\u003C/pre\u003E\n\u003Cp\u003EThis solution is available for JDK 1.8 and higher.\u003C/p\u003E\n\u003Cpre data-diff-id="2" data-diff-type="compliant"\u003E\nSecureRandom sr = SecureRandom.getInstanceStrong();\nint v = sr.next(32);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EWhen the randomly generated data needs to be cryptographically strong, \u003Ccode\u003ESecureRandom\u003C/code\u003E is the correct class to use. However, its\ndocumentation also cites that "any seed material passed to a \u003Ccode\u003ESecureRandom\u003C/code\u003E object must be unpredictable". When no seed is passed by the\nuser to the object, the \u003Ccode\u003ESecureRandom\u003C/code\u003E object chooses an unpredictable seed by default. Therefore, the easiest way to fix the issue is to\nuse the default constructor without any calls to \u003Ccode\u003ESecureObject.setSeed()\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003ETo go the extra mile, \u003Ccode\u003ESecureObject.getInstanceStrong()\u003C/code\u003E returns an instance of \u003Ccode\u003ESecureObject\u003C/code\u003E that is guaranteed to use a\nstrong algorithm for its number generation.\u003C/p\u003E\n\u003Cp\u003EIf the randomly generated data is not used for cryptographic purposes and is not business critical, it may be a better choice to use\n\u003Ccode\u003Ejava.util.Random\u003C/code\u003E instead. In this case, setting a predictable seed may be acceptable depending on the situation.\u003C/p\u003E',
          context: {
            displayName: "Java SE",
            key: "java_se",
          },
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Java Documentation - \u003Ca href="https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/security/SecureRandom.html"\u003EClass\n  \u003Ccode\u003Ejava.security.SecureRandom\u003C/code\u003E\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/330"\u003ECWE-330 - Use of Insufficiently Random Values\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/332"\u003ECWE-332 - Insufficient Entropy in PRNG\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/336"\u003ECWE-336 - Same Seed in Pseudo-Random Number Generator (PRNG)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/337"\u003ECWE-337 - Predictable Seed in Pseudo-Random Number Generator (PRNG)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://wiki.sei.cmu.edu/confluence/display/java/MSC63-J.+Ensure+that+SecureRandom+is+properly+seeded"\u003ECERT, MSC63J.\u003C/a\u003E - Ensure that\n  SecureRandom is properly seeded \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ERandom number generators are often used to generate random values for cryptographic algorithms. When a random number generator is used for\ncryptographic purposes, the generated numbers must be as random and unpredictable as possible. When the random number generator is improperly seeded\nwith a constant or a predictable value, its output will also be predictable.\u003C/p\u003E\n\u003Cp\u003EThis can have severe security implications for cryptographic operations that rely on the randomness of the generated numbers. By using a\npredictable seed, an attacker can potentially guess or deduce the generated numbers, compromising the security of whatever cryptographic algorithm\nrelies on the random number generator.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EIt is crucial to understand that the strength of cryptographic algorithms heavily relies on the quality of the random numbers used. By improperly\nseeding a CSPRNG, we introduce a significant weakness that can be exploited by attackers.\u003C/p\u003E\n\u003Ch4\u003EInsecure cryptographic keys\u003C/h4\u003E\n\u003Cp\u003EOne of the primary use cases for CSPRNGs is generating cryptographic keys. If an attacker can predict the seed used to initialize the random number\ngenerator, they may be able to derive the same keys. Depending on the use case, this can lead to multiple severe outcomes, such as:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Being able to decrypt sensitive documents, leading to privacy breaches or identity theft. \u003C/li\u003E\n  \u003Cli\u003E Gaining access to a private key used for signing, allowing an attacker to forge digital signatures and impersonate legitimate entities. \u003C/li\u003E\n  \u003Cli\u003E Bypassing authentication mechanisms that rely on public-key infrastructure (PKI), which can be abused to gain unauthorized access to systems or\n  networks. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch4\u003ESession hijacking and man-in-the-middle attack\u003C/h4\u003E\n\u003Cp\u003EAnother scenario where this vulnerability can be exploited is in the generation of session tokens or nonces for secure communication protocols. If\nan attacker can predict the seed used to generate these tokens, they can impersonate legitimate users or intercept sensitive information.\u003C/p\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003ECryptographic operations often rely on unpredictable random numbers to enhance security. These random numbers are created by cryptographically\nsecure pseudo-random number generators (CSPRNG). It is important not to use a predictable seed with these random number generators otherwise the\nrandom numbers will also become predictable.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "typescript:S6749",
      name: "Redundant React fragments should be removed",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EReact fragments are a feature in React that allows you to group multiple elements together without adding an extra DOM element. They are a way to\nreturn multiple elements from a component’s render method without requiring a wrapping parent element.\u003C/p\u003E\n\u003Cp\u003EHowever, a fragment is redundant if it contains only one child, or if it is the child of an HTML element.\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n&lt;&gt;&lt;Foo /&gt;&lt;/&gt;;    // Noncompliant: The fragment has only one child\n&lt;p&gt;&lt;&gt;foo&lt;/&gt;&lt;/p&gt;; // Noncompliant: The fragment is the child of the HTML element \'p\'\n\u003C/pre\u003E\n\u003Cp\u003EYou can safely remove the redundant fragment while preserving the original behaviour.\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n&lt;Foo /&gt;;\n&lt;p&gt;foo&lt;/p&gt;;\n\u003C/pre\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E React Documentation - \u003Ca href="https://react.dev/reference/react/Fragment"\u003EFragments\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "php:S2830",
      name: "Class constructors should not create other objects",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EDependency injection is a software design pattern in which one or more dependencies (or services) are injected, or passed by reference, into a\ndependent object (or client) and are made part of the client’s state. The pattern separates the creation of a client’s dependencies from its own\nbehavior, which allows program designs to be loosely coupled and to follow the dependency inversion and single responsibility principles.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nclass SomeClass {\n\n  public function __construct() {\n    $this-&gt;object = new SomeOtherClass();  // Noncompliant\n  }\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\nclass SomeClass {\n\n  public function __construct(SomeOtherClass $object) {\n    $this-&gt;object = $object;\n  }\n}\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "plsql:VarcharUsageCheck",
      name: '"VARCHAR2" should be used',
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003ECurrently, \u003Ccode\u003EVARCHAR\u003C/code\u003E and \u003Ccode\u003EVARCHAR2\u003C/code\u003E are identical data types. But to prevent future changes in behavior, Oracle recommends\nthe use of \u003Ccode\u003EVARCHAR2\u003C/code\u003E.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nDECLARE\n  var VARCHAR(42);  -- Noncompliant\nBEGIN\n  NULL;\nEND;\n/\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nDECLARE\n  var VARCHAR2(42);  -- Compliant\nBEGIN\n  NULL;\nEND;\n/\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "docker:S6504",
      name: "Allowing non-root users to modify resources copied to an image is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Use \u003Ccode\u003E--chmod\u003C/code\u003E to change the permissions so that only root users can write to files. \u003C/li\u003E\n  \u003Cli\u003E Use \u003Ccode\u003E--chown\u003C/code\u003E to change the file/directory owner to a root user. \u003C/li\u003E\n  \u003Cli\u003E Be mindful of the container immutability principle. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nFROM example\n\nRUN useradd exampleuser\n# Sensitive\nCOPY --chown=exampleuser:exampleuser src.py dst.py\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nFROM example\n\nCOPY --chown=root:root --chmod=755 src.py dst.py\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.docker.com/engine/reference/builder/#add"\u003EDockerfile reference\u003C/a\u003E - ADD instruction \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.docker.com/engine/reference/builder/#copy"\u003EDockerfile reference\u003C/a\u003E - COPY instruction \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/732"\u003ECWE-732 - Incorrect Permission Assignment for Critical Resource\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://cloud.google.com/architecture/best-practices-for-operating-containers#immutability"\u003EGoogle Cloud, Immutability\u003C/a\u003E - Best\n  practices for operating containers \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E A non-root user owns the resource. \u003C/li\u003E\n  \u003Cli\u003E A non-root user has been granted write permissions for the resource. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of these questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EOwnership or write permissions for a file or directory copied to the Docker image have been assigned to a user other than root.\u003C/p\u003E\n\u003Cp\u003EWrite permissions enable malicious actors, who have a foothold on the container, to tamper with the resource and thus potentially manipulate the\ncontainer’s expected behavior.\u003Cbr\u003E Manipulating files could disrupt services or aid in escalating privileges inside the container.\u003Cbr\u003E\u003C/p\u003E\n\u003Cp\u003EThis also breaches the container immutability principle as it facilitates container changes during its life. Immutability, a container best\npractice, allows for a more reliable and reproducible behavior of Docker containers.\u003C/p\u003E\n\u003Cp\u003EIf a user is given ownership on a file but no write permissions, the user can still modify it by using his ownership to change the file permissions\nfirst. This is why both ownership and write permissions should be avoided.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "docker:S6596",
      name: "Specific version tag for image should be used",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003ETo avoid these issues, it is recommended to use specific version tags for Dockerfile images.\u003C/p\u003E\n\u003Cp\u003EThis can be done by appending the version number or tag to the Dockerfile image name. For example, instead of \u003Ccode\u003Emy-image:latest\u003C/code\u003E, it is\nbetter to use \u003Ccode\u003Emy-image:1.2.3-alpine\u003C/code\u003E or \u003Ccode\u003Emy-image:1.2.3\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003EFor even more control and traceability, it is also possible to specify your image by digest using the sha256 of the image. This will pin your image\nto a specific version in time, but will also exclude it from eventual security updates. An example would be using\n\u003Ccode\u003Emy-image@sha256:26c68657ccce2cb0a31b330cb0be2b5e108d467f641c62e13ab40cbec258c68d\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003EMore information can be found in the documentation at the end.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nFROM my-image\nFROM my-image:latest\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nFROM my-image:1.2.3\nFROM my-image:1.2.3-alpine\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EThis way, the same version of the Dockerfile image is used every time the application is built, deployed, or run, ensuring consistency and\npredictability across different environments. It is also not enough to use the latest tag, as this version also changes with each release.\u003C/p\u003E\n\u003Ch3\u003EGoing the extra mile\u003C/h3\u003E\n\u003Cp\u003EAdhering to this can also make it easier to track which version of the Dockerfile image is being used, which can be useful for debugging and\ntroubleshooting purposes.\u003C/p\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.docker.com/engine/reference/builder/#from"\u003EDockerfile reference - FROM\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.docker.com/develop/dev-best-practices/#how-to-keep-your-images-small"\u003EDocker development best practices\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.docker.com/engine/reference/commandline/image_pull/#pull-an-image-by-digest-immutable-identifier"\u003EPull an image by digest\n  (immutable identifier)\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EWhen a Dockerfile image is not tagged with a specific version, it is referred to as \u003Ccode\u003Elatest\u003C/code\u003E. This means that every time the image is\nbuilt, deployed, or run, it will always use the latest version of the image.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWhile using always the latest version may seem convenient, the build cannot be repeated because it is not clear which was the last version. In\naddition, it can lead to unpredictability and issues such as version mismatch and potential security vulnerabilities.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EFor example, if a developer builds and deploys an application using \u003Ccode\u003Emy-image:latest\u003C/code\u003E, they may unknowingly be using a different version\nof the image than another developer who also built and deployed the same application using \u003Ccode\u003Emy-image:latest\u003C/code\u003E. This can lead to version\nmismatches, which can cause bugs or compatibility issues.\u003C/p\u003E\n\u003Cp\u003EIn addition, using \u003Ccode\u003Elatest\u003C/code\u003E as the tag for Dockerfile images can potentially introduce security vulnerabilities. For instance, if a\nsecurity vulnerability is discovered in an image and a new version is released to fix it, using \u003Ccode\u003Elatest\u003C/code\u003E as the tag means that the\napplication will automatically use the updated image, even if it has not been properly tested and vetted for compatibility with the application.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "docker:S6497",
      name: "Pulling an image based on its digest is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EContainers should get the latest security updates. If there is a need for determinism, the solution is to find tags that are not as prone to change\nas \u003Ccode\u003Elatest\u003C/code\u003E or \u003Ca href="https://github.com/docker-library/faq#whats-the-difference-between-shared-and-simple-tags"\u003Eshared tags\u003C/a\u003E.\u003C/p\u003E\n\u003Cp\u003ETo do so, favor a more precise tag that uses \u003Ca href="https://semver.org/"\u003Esemantic versioning\u003C/a\u003E and target a major version, for example.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\nFROM mongo@sha256:8eb8f46e22f5ccf1feb7f0831d02032b187781b178cb971cd1222556a6cee9d1\n\nRUN echo ls\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cp\u003EHere, mongo:6.0 is better than using a digest, and better than using a more precise version, such as 6.0.4, because it would prevent 6.0.5 security\nupdates:\u003C/p\u003E\n\u003Cpre\u003E\nFROM mongo:6.0\n\nRUN echo ls\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://github.com/safe-waters/docker-lock"\u003EDocker-Lock\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca\n  href="https://cloud.google.com/kubernetes-engine/docs/archive/using-container-image-digests-in-kubernetes-manifests#recommendations"\u003ESkaffold, kpt,\n  digester, kustomize, gke-deploy, ko, and Bazel\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://cloud.google.com/kubernetes-engine/docs/archive/using-container-images"\u003EGKE, Using Container Image Digests\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.openshift.com/container-platform/3.11/architecture/core_concepts/builds_and_image_streams.html#image-streams"\u003EOpenShift,\n  Builds and Image Streams\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E You expect to receive security updates of the base image. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answer yes to this question.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EThis rule is deprecated; use \u003Ca href='/organizations/my-org/rules?open=docker%3AS6596&rule_key=docker%3AS6596'\u003ES6596\u003C/a\u003E instead.\u003C/p\u003E\n\u003Cp\u003EA container image digest uniquely and immutably identifies a container image. A tag, on the other hand, is a mutable reference to a container\nimage.\u003C/p\u003E\n\u003Cp\u003EThis tag can be updated to point to another version of the container at any point in time.\u003Cbr\u003E In general, the use of image digests instead of tags\nis intended to keep determinism stable within a system or infrastructure for reliability reasons.\u003C/p\u003E\n\u003Cp\u003EThe problem is that pulling such an image prevents the resulting container from being updated or patched in order to remove vulnerabilities or\nsignificant bugs.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "azureresourcemanager:S6378",
      name: "Disabling Managed Identities for Azure resources is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EDisabling Managed Identities can reduce an organization’s ability to protect itself against configuration faults and credential leaks.\u003C/p\u003E\n\u003Cp\u003EAuthenticating via managed identities to an Azure resource solely relies on an API call with a non-secret token. The process is inner to Azure:\nsecrets used by Azure are not even accessible to end-users.\u003C/p\u003E\n\u003Cp\u003EIn typical scenarios without managed identities, the use of credentials can lead to mistakenly leaving them in code bases. In addition,\nconfiguration faults may also happen when storing these values or assigning them permissions.\u003C/p\u003E\n\u003Cp\u003EBy transparently taking care of the Azure Active Directory authentication, Managed Identities allow getting rid of day-to-day credentials\nmanagement.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EEnable the Managed Identities capabilities of this Azure resource. If supported, use a System-Assigned managed identity, as:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E It cannot be shared across resources. \u003C/li\u003E\n  \u003Cli\u003E Its life cycle is deeply tied to the life cycle of its Azure resource. \u003C/li\u003E\n  \u003Cli\u003E It provides a unique independent identity. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EAlternatively, User-Assigned Managed Identities can also be used but don’t guarantee the properties listed above.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EUsing ARM templates:\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n{\n    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",\n    "contentVersion": "1.0.0.0",\n    "resources": [\n        {\n            "type": "Microsoft.ApiManagement/service",\n            "apiVersion": "2022-09-01-preview",\n            "name": "apiManagementService"\n        }\n    ]\n}\n\u003C/pre\u003E\n\u003Cp\u003EUsing Bicep:\u003C/p\u003E\n\u003Cpre data-diff-id="2" data-diff-type="noncompliant"\u003E\nresource sensitiveApiManagementService \'Microsoft.ApiManagement/service@2022-09-01-preview\' = {\n  name: \'apiManagementService\'\n  // Sensitive: no Managed Identity is defined\n}\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cp\u003EUsing ARM templates:\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n{\n    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",\n    "contentVersion": "1.0.0.0",\n    "resources": [\n        {\n            "type": "Microsoft.ApiManagement/service",\n            "apiVersion": "2022-09-01-preview",\n            "name": "apiManagementService",\n            "identity": {\n                "type": "SystemAssigned"\n            }\n        }\n    ]\n}\n\u003C/pre\u003E\n\u003Cp\u003EUsing Bicep:\u003C/p\u003E\n\u003Cpre data-diff-id="2" data-diff-type="compliant"\u003E\nresource sensitiveApiManagementService \'Microsoft.ApiManagement/service@2022-09-01-preview\' = {\n  name: \'apiManagementService\'\n  identity: {\n    type: \'SystemAssigned\'\n  }\n}\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview"\u003EAzure AD Documentation - Managed\n  Identities Overview\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca\n  href="https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/managed-identity-best-practice-recommendations"\u003EAzure AD Documentation - Managed Identities Best Practices\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/services-support-managed-identities"\u003EAzure\n  AD Documentation - Services that support managed identities\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cp\u003EThe resource:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Needs to authenticate to Azure resources that support Azure Active Directory (AAD). \u003C/li\u003E\n  \u003Cli\u003E Uses a different Access Control system that doesn’t guarantee the same security controls as AAD, or no Access Control system at all. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to all of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S1135",
      name: 'Track uses of "TODO" tags',
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/546"\u003ECWE-546 - Suspicious Comment\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EDevelopers often use \u003Ccode\u003ETODO\u003C/code\u003E tags to mark areas in the code where additional work or improvements are needed but are not implemented\nimmediately. However, these \u003Ccode\u003ETODO\u003C/code\u003E tags sometimes get overlooked or forgotten, leading to incomplete or unfinished code. This rule aims to\nidentify and address unattended \u003Ccode\u003ETODO\u003C/code\u003E tags to ensure a clean and maintainable codebase. This description explores why this is a problem\nand how it can be fixed to improve the overall code quality.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EUnattended \u003Ccode\u003ETODO\u003C/code\u003E tags in code can have significant implications for the development process and the overall codebase.\u003C/p\u003E\n\u003Cp\u003EIncomplete Functionality: When developers leave \u003Ccode\u003ETODO\u003C/code\u003E tags without implementing the corresponding code, it results in incomplete\nfunctionality within the software. This can lead to unexpected behavior or missing features, adversely affecting the end-user experience.\u003C/p\u003E\n\u003Cp\u003EMissed Bug Fixes: If developers do not promptly address \u003Ccode\u003ETODO\u003C/code\u003E tags, they might overlook critical bug fixes and security updates.\nDelayed bug fixes can result in more severe issues and increase the effort required to resolve them later.\u003C/p\u003E\n\u003Cp\u003EImpact on Collaboration: In team-based development environments, unattended \u003Ccode\u003ETODO\u003C/code\u003E tags can hinder collaboration. Other team members\nmight not be aware of the intended changes, leading to conflicts or redundant efforts in the codebase.\u003C/p\u003E\n\u003Cp\u003ECodebase Bloat: The accumulation of unattended \u003Ccode\u003ETODO\u003C/code\u003E tags over time can clutter the codebase and make it difficult to distinguish\nbetween work in progress and completed code. This bloat can make it challenging to maintain an organized and efficient codebase.\u003C/p\u003E\n\u003Cp\u003EAddressing this code smell is essential to ensure a maintainable, readable, reliable codebase and promote effective collaboration among\ndevelopers.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nfunction doSomething() {\n  // TODO\n}\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "php:S1134",
      name: 'Track uses of "FIXME" tags',
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003E\u003Ccode\u003EFIXME\u003C/code\u003E tags are commonly used to mark places where a bug is suspected, but which the developer wants to deal with later.\u003C/p\u003E\n\u003Cp\u003ESometimes the developer will not have the time or will simply forget to get back to that tag.\u003C/p\u003E\n\u003Cp\u003EThis rule is meant to track those tags and to ensure that they do not go unnoticed.\u003C/p\u003E\n\u003Cpre\u003E\nfunction divide($numerator, $denominator) {\n  return $numerator / $denominator;              // FIXME denominator value might be  0\n}\n\u003C/pre\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/546"\u003ECWE-546 - Suspicious Comment\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S2115",
      name: "A secure password should be used when connecting to a database",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "introduction",
          content:
            "\u003Cp\u003EWhen accessing a database, an empty password should be avoided as it introduces a weakness.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication"\u003ETop 10 2017 Category A2 - Broken Authentication\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/521"\u003ECWE-521 - Weak Password Requirements\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWhen a database does not require a password for authentication, it allows anyone to access and manipulate the data stored within it. Exploiting\nthis vulnerability typically involves identifying the target database and establishing a connection to it without the need for any authentication\ncredentials.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EOnce connected, an attacker can perform various malicious actions, such as viewing, modifying, or deleting sensitive information, potentially\nleading to data breaches or unauthorized access to critical systems. It is crucial to address this vulnerability promptly to ensure the security and\nintegrity of the database and the data it contains.\u003C/p\u003E\n\u003Ch4\u003EUnauthorized Access to Sensitive Data\u003C/h4\u003E\n\u003Cp\u003EWhen a database lacks a password for authentication, it opens the door for unauthorized individuals to gain access to sensitive data. This can\ninclude personally identifiable information (PII), financial records, intellectual property, or any other confidential information stored in the\ndatabase. Without proper access controls in place, malicious actors can exploit this vulnerability to retrieve sensitive data, potentially leading to\nidentity theft, financial loss, or reputational damage.\u003C/p\u003E\n\u003Ch4\u003ECompromise of System Integrity\u003C/h4\u003E\n\u003Cp\u003EWithout a password requirement, unauthorized individuals can gain unrestricted access to a database, potentially compromising the integrity of the\nentire system. Attackers can inject malicious code, alter configurations, or manipulate data within the database, leading to system malfunctions,\nunauthorized system access, or even complete system compromise. This can disrupt business operations, cause financial losses, and expose the\norganization to further security risks.\u003C/p\u003E\n\u003Ch4\u003EUnwanted Modifications or Deletions\u003C/h4\u003E\n\u003Cp\u003EThe absence of a password for database access allows anyone to make modifications or deletions to the data stored within it. This poses a\nsignificant risk, as unauthorized changes can lead to data corruption, loss of critical information, or the introduction of malicious content. For\nexample, an attacker could modify financial records, tamper with customer orders, or delete important files, causing severe disruptions to business\nprocesses and potentially leading to financial and legal consequences.\u003C/p\u003E\n\u003Cp\u003EOverall, the lack of a password configured to access a database poses a serious security risk, enabling unauthorized access, data breaches, system\ncompromise, and unwanted modifications or deletions. It is essential to address this vulnerability promptly to safeguard sensitive data, maintain\nsystem integrity, and protect the organization from potential harm.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code uses an empty password to connect to a MySQL database.\u003C/p\u003E\n\u003Cp\u003EThe vulnerability can be fixed by using a strong password retrieved from an environment variable \u003Ccode\u003EMYSQL_SECURE_PASSWORD\u003C/code\u003E. This\nenvironment variable is set during deployment. It should be strong and different for each database.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="401" data-diff-type="noncompliant"\u003E\n$conn = new mysqli($servername, $username, ""); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="401" data-diff-type="compliant"\u003E\n$password = getenv(\'MYSQL_SECURE_PASSWORD\');\n$conn = new mysqli($servername, $username, $password);\n\u003C/pre\u003E\n\u003Ch3\u003EPitfalls\u003C/h3\u003E\n\u003Ch4\u003EHard-coded passwords\u003C/h4\u003E\n\u003Cp\u003EIt could be tempting to replace the empty password with a hard-coded one. Hard-coding passwords in the code can pose significant security risks.\nHere are a few reasons why it is not recommended:\u003C/p\u003E\n\u003Col\u003E\n  \u003Cli\u003E Security Vulnerability: Hard-coded passwords can be easily discovered by anyone who has access to the code, such as other developers or\n  attackers. This can lead to unauthorized access to the database and potential data breaches. \u003C/li\u003E\n  \u003Cli\u003E Lack of Flexibility: Hard-coded passwords make it difficult to change the password without modifying the code. If the password needs to be\n  updated, it would require recompiling and redeploying the code, which can be time-consuming and error-prone. \u003C/li\u003E\n  \u003Cli\u003E Version Control Issues: Storing passwords in code can lead to version control issues. If the code is shared or stored in a version control\n  system, the password will be visible to anyone with access to the repository, which is a security risk. \u003C/li\u003E\n\u003C/ol\u003E\n\u003Cp\u003ETo mitigate these risks, it is recommended to use secure methods for storing and retrieving passwords, such as using environment variables,\nconfiguration files, or secure key management systems. These methods allow for better security, flexibility, and separation of sensitive information\nfrom the codebase.\u003C/p\u003E',
          context: {
            displayName: "Core PHP",
            key: "core_php",
          },
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S1145",
      name: 'Useless "if(true) {...}" and "if(false){...}" blocks should be removed',
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/489"\u003ECWE-489 - Active Debug Code\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/570"\u003ECWE-570 - Expression is Always False\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/571"\u003ECWE-571 - Expression is Always True\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003E\u003Ccode\u003Eif\u003C/code\u003E statements with conditions that are always false have the effect of making blocks of code non-functional. \u003Ccode\u003Eif\u003C/code\u003E\nstatements with conditions that are always true are completely redundant, and make the code less readable.\u003C/p\u003E\n\u003Cp\u003EThere are three possible causes for the presence of such code:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E An if statement was changed during debugging and that debug code has been committed. \u003C/li\u003E\n  \u003Cli\u003E Some value was left unset. \u003C/li\u003E\n  \u003Cli\u003E Some logic is not doing what the programmer thought it did. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIn any of these cases, unconditional \u003Ccode\u003Eif\u003C/code\u003E statements should be removed.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nif (true) {  // Noncompliant\n  doSomething();\n}\n...\nif (false) {  // Noncompliant\n  doSomethingElse();\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\ndoSomething();\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S3776",
      name: "Cognitive Complexity of functions should not be too high",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Sonar - \u003Ca href="https://www.sonarsource.com/docs/CognitiveComplexity.pdf"\u003ECognitive Complexity\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EArticles &amp; blog posts\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Sonar Blog - \u003Ca href="https://www.sonarsource.com/blog/5-clean-code-tips-for-reducing-cognitive-complexity/"\u003E5 Clean Code Tips for Reducing\n  Cognitive Complexity\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule raises an issue when the code cognitive complexity of a function is above a certain threshold.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ECognitive Complexity is a measure of how hard it is to understand the control flow of a unit of code. Code with high cognitive complexity is hard\nto read, understand, test, and modify.\u003C/p\u003E\n\u003Cp\u003EAs a rule of thumb, high cognitive complexity is a sign that the code should be refactored into smaller, easier-to-manage pieces.\u003C/p\u003E\n\u003Ch3\u003EWhich syntax in code does impact cognitive complexity score?\u003C/h3\u003E\n\u003Cp\u003EHere are the core concepts:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Cstrong\u003ECognitive complexity is incremented each time the code breaks the normal linear reading flow.\u003C/strong\u003E\u003Cbr\u003E This concerns, for example,\n  loop structures, conditionals, catches, switches, jumps to labels, and conditions mixing multiple operators. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EEach nesting level increases complexity.\u003C/strong\u003E\u003Cbr\u003E During code reading, the deeper you go through nested layers, the harder it\n  becomes to keep the context in mind. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EMethod calls are free\u003C/strong\u003E\u003Cbr\u003E A well-picked method name is a summary of multiple lines of code. A reader can first explore a\n  high-level view of what the code is performing then go deeper and deeper by looking at called functions content.\u003Cbr\u003E \u003Cem\u003ENote:\u003C/em\u003E This does not\n  apply to recursive calls, those will increment cognitive score. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThe method of computation is fully detailed in the pdf linked in the resources.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EDevelopers spend more time reading and understanding code than writing it. High cognitive complexity slows down changes and increases the cost of\nmaintenance.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S4502",
      name: "Disabling CSRF protections is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EA cross-site request forgery (CSRF) attack occurs when a trusted user of a web application can be forced, by an attacker, to perform sensitive\nactions that he didn’t intend, such as updating his profile or sending a message, more generally anything that can change the state of the\napplication.\u003C/p\u003E\n\u003Cp\u003EThe attacker can trick the user/victim to click on a link, corresponding to the privileged action, or to visit a malicious web site that embeds a\nhidden web request and as web browsers automatically include cookies, the actions can be authenticated and sensitive.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Protection against CSRF attacks is strongly recommended:\n    \u003Cul\u003E\n      \u003Cli\u003E to be activated by default for all \u003Ca href="https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Safe_methods"\u003Eunsafe HTTP\n      methods\u003C/a\u003E. \u003C/li\u003E\n      \u003Cli\u003E implemented, for example, with an unguessable CSRF token \u003C/li\u003E\n    \u003C/ul\u003E  \u003C/li\u003E\n  \u003Cli\u003E Of course all sensitive operations should not be performed with \u003Ca\n  href="https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Safe_methods"\u003Esafe HTTP\u003C/a\u003E methods like \u003Ccode\u003EGET\u003C/code\u003E which are designed to be\n  used only for information retrieval. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EFor \u003Ca href="https://laravel.com/docs/8.x/csrf#csrf-excluding-uris"\u003ELaravel VerifyCsrfToken middleware\u003C/a\u003E\u003C/p\u003E\n\u003Cpre\u003E\nuse Illuminate\\Foundation\\Http\\Middleware\\VerifyCsrfToken as Middleware;\n\nclass VerifyCsrfToken extends Middleware\n{\n    protected $except = [\n        \'api/*\'\n    ]; // Sensitive; disable CSRF protection for a list of routes\n}\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href="https://symfony.com/doc/current/security/csrf.html#csrf-protection-in-symfony-forms"\u003ESymfony Forms\u003C/a\u003E\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;\n\nclass Controller extends AbstractController {\n\n  public function action() {\n    $this-&gt;createForm(\'\', null, [\n      \'csrf_protection\' =&gt; false, // Sensitive; disable CSRF protection for a single form\n    ]);\n  }\n}\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cp\u003EFor \u003Ca href="https://laravel.com/docs/8.x/csrf#csrf-excluding-uris"\u003ELaravel VerifyCsrfToken middleware\u003C/a\u003E\u003C/p\u003E\n\u003Cpre\u003E\nuse Illuminate\\Foundation\\Http\\Middleware\\VerifyCsrfToken as Middleware;\n\nclass VerifyCsrfToken extends Middleware\n{\n    protected $except = []; // Compliant\n}\n\u003C/pre\u003E\n\u003Cp\u003ERemember to add \u003Ca href="https://laravel.com/docs/8.x/blade#csrf-field"\u003E@csrf\u003C/a\u003E blade directive to the relevant forms when removing an element\nfrom $except. Otherwise the form submission will stop working.\u003C/p\u003E\n\u003Cp\u003EFor \u003Ca href="https://symfony.com/doc/current/security/csrf.html#csrf-protection-in-symfony-forms"\u003ESymfony Forms\u003C/a\u003E\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;\n\nclass Controller extends AbstractController {\n\n  public function action() {\n    $this-&gt;createForm(\'\', null, []); // Compliant; CSRF protection is enabled by default\n  }\n}\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/"\u003ETop 10 2021 Category A1 - Broken Access Control\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/352"\u003ECWE-352 - Cross-Site Request Forgery (CSRF)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://owasp.org/www-community/attacks/csrf"\u003EOWASP: Cross-Site Request Forgery\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E The web application uses cookies to authenticate users. \u003C/li\u003E\n  \u003Cli\u003E There exist sensitive operations in the web application that can be performed when the user is authenticated. \u003C/li\u003E\n  \u003Cli\u003E The state / resources of the web application can be modified by doing HTTP POST or HTTP DELETE requests for example. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S2681",
      name: "Multiline blocks should be enclosed in curly braces",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EHaving inconsistent indentation and omitting curly braces from a control structure, such as an \u003Ccode\u003Eif\u003C/code\u003E statement or \u003Ccode\u003Efor\u003C/code\u003E loop,\nis misleading and can induce bugs.\u003C/p\u003E\n\u003Cp\u003EThis rule raises an issue when the indentation of the lines after a control structure indicates an intent to include those lines in the block, but\nthe omission of curly braces means the lines will be unconditionally executed once.\u003C/p\u003E\n\u003Cp\u003EThe following patterns are recognized:\u003C/p\u003E\n\u003Cpre\u003E\nif ($condition)\n  firstActionInBlock();\n  secondAction();  // Noncompliant: secondAction is executed unconditionally\nthirdAction();\n\u003C/pre\u003E\n\u003Cpre\u003E\nif($condition) firstActionInBlock(); secondAction();  // Noncompliant: secondAction is executed unconditionally\n\u003C/pre\u003E\n\u003Cpre\u003E\nif($condition) firstActionInBlock();  // Noncompliant\n  secondAction();  // Executed unconditionally\n\u003C/pre\u003E\n\u003Cpre\u003E\n$str = null;\nfor ($i = 0; $i &lt; count($array); $i++)\n  $str = $array[$i];\n  doTheThing($str);  // Noncompliant: executed only on the last element\n\u003C/pre\u003E\n\u003Cp\u003ENote that this rule considers tab characters to be equivalent to 1 space. When mixing spaces and tabs, a code may look fine in one editor but be\nconfusing in another configured differently.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/483"\u003ECWE-483 - Incorrect Block Delimitation\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S4508",
      name: "Deserializing objects from an untrusted source is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EDeserializing objects is security-sensitive. For example, it has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-17672"\u003ECVE-2017-17672\u003C/a\u003E: vBulletin: Unserialize PHP Code Execution \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000167"\u003ECVE-2018-1000167\u003C/a\u003E: Jenkins Pipeline: arbitrary code execution\n  vulnerability \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EObject deserialization from an untrusted source can lead to unexpected code execution. Deserialization takes a stream of bits and turns it into an\nobject. If the stream contains the type of object you expect, all is well. But if you’re deserializing data coming from untrusted input, and an\nattacker has inserted some other type of object, you’re in trouble. Why? \u003Ca href="https://www.owasp.org/index.php/PHP_Object_Injection"\u003EA known attack\nscenario\u003C/a\u003E involves the creation of a serialized PHP object with crafted attributes which will modify your application’s behavior. This attack\nrelies on \u003Ca href="https://php.net/manual/en/language.oop5.magic.php"\u003EPHP magic methods\u003C/a\u003E like \u003Ccode\u003E__desctruct\u003C/code\u003E, \u003Ccode\u003E__wakeup\u003C/code\u003E or\n\u003Ccode\u003E__string\u003C/code\u003E. The attacker doesn’t necessarily need the source code of the targeted application to exploit the vulnerability, he can also\nrely on the presence of open-source component and use \u003Ca href="https://github.com/ambionics/phpggc"\u003Etools to craft malicious payloads\u003C/a\u003E.\u003C/p\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003ETo prevent insecure deserialization, it is recommended to:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Use safe libraries that do not allow code execution at deserialization. \u003C/li\u003E\n  \u003Cli\u003E Not communicate with the outside world using serialized objects \u003C/li\u003E\n  \u003Cli\u003E Limit access to the serialized source\n    \u003Cul\u003E\n      \u003Cli\u003E if it is a file, restrict the access to it. \u003C/li\u003E\n      \u003Cli\u003E if it comes from the network, restrict who has access to the process, such as with a Firewall or by authenticating the sender first. \u003C/li\u003E\n    \u003C/ul\u003E  \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://owasp.org/www-community/vulnerabilities/Deserialization_of_untrusted_data"\u003EOWASP - Deserialization of untrusted data\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A8_2017-Insecure_Deserialization"\u003ETop 10 2017 Category A8 - Insecure\n  Deserialization\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/502"\u003ECWE-502 - Deserialization of Untrusted Data\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rule \u003Ca href="https://find-sec-bugs.github.io/bugs.htm#OBJECT_DESERIALIZATION"\u003EOBJECT_DESERIALIZATION \u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E an attacker could have tampered with the source provided to the deserialization function \u003C/li\u003E\n  \u003Cli\u003E you are using an unsafe deserialization function \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EYou are at risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4507",
      name: "Delivering code in production with debug features activated is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EDevelopment tools and frameworks usually have options to make debugging easier for developers. Although these features are useful during\ndevelopment, they should never be enabled for applications deployed in production. Debug instructions or error messages can leak detailed information\nabout the system, like the application’s path or file names.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EDo not enable debugging features on production servers or applications distributed to end users.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003ECakePHP 1.x, 2.x:\u003C/p\u003E\n\u003Cpre\u003E\nConfigure::write('debug', 1); // Sensitive: development mode\nor\nConfigure::write('debug', 2); // Sensitive: development mode\nor\nConfigure::write('debug', 3); // Sensitive: development mode\n\u003C/pre\u003E\n\u003Cp\u003ECakePHP 3.0:\u003C/p\u003E\n\u003Cpre\u003E\nuse Cake\\Core\\Configure;\n\nConfigure::config('debug', true); // Sensitive: development mode\n\u003C/pre\u003E\n\u003Cp\u003EWordPress:\u003C/p\u003E\n\u003Cpre\u003E\ndefine( 'WP_DEBUG', true ); // Sensitive: development mode\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cp\u003ECakePHP 1.2:\u003C/p\u003E\n\u003Cpre\u003E\nConfigure::write('debug', 0); // Compliant; this is the production mode\n\u003C/pre\u003E\n\u003Cp\u003ECakePHP 3.0:\u003C/p\u003E\n\u003Cpre\u003E\nuse Cake\\Core\\Configure;\n\nConfigure::config('debug', false); // Compliant:  \"0\" or \"false\" for CakePHP 3.x is suitable (production mode) to not leak sensitive data on the logs.\n\u003C/pre\u003E\n\u003Cp\u003EWordPress:\u003C/p\u003E\n\u003Cpre\u003E\ndefine( 'WP_DEBUG', false ); // Compliant\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A05_2021-Security_Misconfiguration/\"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure\"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/489\"\u003ECWE-489 - Active Debug Code\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/215\"\u003ECWE-215 - Information Exposure Through Debug Information\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E The code or configuration enabling the application debug features is deployed on production servers or distributed to end users. \u003C/li\u003E\n  \u003Cli\u003E The application runs by default with debug features activated. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S1125",
      name: "Boolean literals should not be redundant",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EA boolean literal can be represented in two different ways: \u003Ccode\u003Etrue\u003C/code\u003E or \u003Ccode\u003Efalse\u003C/code\u003E. They can be combined with logical operators\n(\u003Ccode\u003E!, &amp;&amp;, ||, ==, !=\u003C/code\u003E) to produce logical expressions that represent truth values. However, comparing a boolean literal to a\nvariable or expression that evaluates to a boolean value is unnecessary and can make the code harder to read and understand. The more complex a\nboolean expression is, the harder it will be for developers to understand its meaning and expected behavior, and it will favour the introduction of\nnew bugs.\u003C/p\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003EThe use of literal booleans in comparisons which use identity operators (\u003Ccode\u003E===\u003C/code\u003E and \u003Ccode\u003E!==\u003C/code\u003E) are ignored.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003ERemove redundant boolean literals from expressions to improve readability and make the code more maintainable.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nif ($booleanVariable == true) { /* ... */ }\nif ($booleanVariable != true) { /* ... */ }\nif ($booleanVariable || false) { /* ... */ }\ndoSomething(!false);\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nif ($booleanVariable) { /* ... */ }\nif (!$booleanVariable) { /* ... */ }\nif ($booleanVariable) { /* ... */ }\ndoSomething(true);\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "php:S1121",
      name: "Assignments should not be made from within sub-expressions",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EA common code smell that can hinder the clarity of source code is making assignments within sub-expressions. This practice involves assigning a\nvalue to a variable inside a larger expression, such as within a loop or a conditional statement.\u003C/p\u003E\n\u003Cp\u003EThis practice essentially gives a side-effect to a larger expression, thus making it less readable. This often leads to confusion and potential\nerrors.\u003C/p\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003EThis rule ignores assignments in conditions of \u003Ccode\u003Ewhile\u003C/code\u003E statements and assignments enclosed in relational expressions.\u003C/p\u003E\n\u003Cpre\u003E\nwhile (($line = next_line()) != NULL) {...}\n\nwhile ($line = next_line()) {...}\n\u003C/pre\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EMaking assignments within sub-expressions can hinder the clarity of source code.\u003C/p\u003E\n\u003Cp\u003EThis practice essentially gives a side-effect to a larger expression, thus making it less readable. This often leads to confusion and potential\nerrors.\u003C/p\u003E\n\u003Cp\u003EExtracting assignments into separate statements is encouraged to keep the code clear and straightforward.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nif (($val = value()) &amp;&amp; check()) { // Noncompliant\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n$val = value();\nif ($val &amp;&amp; check()) {\n}\n\u003C/pre\u003E\n\u003Cp\u003Eor\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nif ($val == value() &amp;&amp; check()) { // Original intention might have been to use equality operator and not assignment\n}\n\u003C/pre\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/481"\u003ECWE-481 - Assigning instead of Comparing\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S1481",
      name: "Unused local variables should be removed",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe fix for this issue is straightforward. Once you ensure the unused variable is not part of an incomplete implementation leading to bugs, you\njust need to remove it.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nfunction numberOfMinutes($hours) {\n  $seconds = 0;   // Noncompliant - $seconds is unused\n  return hours * 60;\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nfunction numberOfMinutes($hours) {\n  return hours * 60;\n}\n\u003C/pre\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EAn unused local variable is a variable that has been declared but is not used anywhere in the block of code where it is defined. It is dead code,\ncontributing to unnecessary complexity and leading to confusion when reading the code. Therefore, it should be removed from your code to maintain\nclarity and efficiency.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EHaving unused local variables in your code can lead to several issues:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Cstrong\u003EDecreased Readability\u003C/strong\u003E: Unused variables can make your code more difficult to read. They add extra lines and complexity, which\n  can distract from the main logic of the code. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EMisunderstanding\u003C/strong\u003E: When other developers read your code, they may wonder why a variable is declared but not used. This can lead\n  to confusion and misinterpretation of the code’s intent. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EPotential for Bugs\u003C/strong\u003E: If a variable is declared but not used, it might indicate a bug or incomplete code. For example, if you\n  declared a variable intending to use it in a calculation, but then forgot to do so, your program might not work as expected. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EMaintenance Issues\u003C/strong\u003E: Unused variables can make code maintenance more difficult. If a programmer sees an unused variable, they\n  might think it is a mistake and try to 'fix' the code, potentially introducing new bugs. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EMemory Usage\u003C/strong\u003E: Although modern compilers are smart enough to ignore unused variables, not all compilers do this. In such cases,\n  unused variables take up memory space, leading to inefficient use of resources. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIn summary, unused local variables can make your code less readable, more confusing, and harder to maintain, and they can potentially lead to bugs\nor inefficient memory use. Therefore, it is best to remove them.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "php:S5042",
      name: "Expanding archive files without controlling resource consumption is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Define and control the ratio between compressed and uncompressed data, in general the data compression ratio for most of the legit archives is\n  1 to 3. \u003C/li\u003E\n  \u003Cli\u003E Define and control the threshold for maximum total size of the uncompressed data. \u003C/li\u003E\n  \u003Cli\u003E Count the number of file entries extracted from the archive and abort the extraction if their number is greater than a predefined threshold, in\n  particular it’s not recommended to recursively expand archives (an entry of an archive could be also an archive). \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://www.php.net/manual/en/class.ziparchive.php\"\u003EZipArchive\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\n$zip = new ZipArchive();\nif ($zip-&gt;open($file) === true) {\n    $zip-&gt;extractTo('.'); // Sensitive\n    $zip-&gt;close();\n}\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://www.php.net/manual/en/ref.zip.php\"\u003EZip\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\n$zip = zip_open($file);\nwhile ($file = zip_read($zip)) {\n    $filename = zip_entry_name($file);\n    $size = zip_entry_filesize($file);\n\n    if (substr($filename, -1) !== '/') {\n        $content = zip_entry_read($file, zip_entry_filesize($file)); // Sensitive - zip_entry_read() uses zip_entry_filesize()\n        file_put_contents($filename, $content);\n    } else {\n        mkdir($filename);\n    }\n}\nzip_close($zip);\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://www.php.net/manual/en/class.ziparchive.php\"\u003EZipArchive\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\ndefine('MAX_FILES', 10000);\ndefine('MAX_SIZE', 1000000000); // 1 GB\ndefine('MAX_RATIO', 10);\ndefine('READ_LENGTH', 1024);\n\n$fileCount = 0;\n$totalSize = 0;\n\n$zip = new ZipArchive();\nif ($zip-&gt;open($file) === true) {\n    for ($i = 0; $i &lt; $zip-&gt;numFiles; $i++) {\n        $filename = $zip-&gt;getNameIndex($i);\n        $stats = $zip-&gt;statIndex($i);\n\n        if (strpos($filename, '../') !== false || substr($filename, 0, 1) === '/') {\n            throw new Exception();\n        }\n\n        if (substr($filename, -1) !== '/') {\n            $fileCount++;\n            if ($fileCount &gt; MAX_FILES) {\n                // Reached max. number of files\n                throw new Exception();\n            }\n\n            $fp = $zip-&gt;getStream($filename); // Compliant\n            $currentSize = 0;\n            while (!feof($fp)) {\n                $currentSize += READ_LENGTH;\n                $totalSize += READ_LENGTH;\n\n                if ($totalSize &gt; MAX_SIZE) {\n                    // Reached max. size\n                    throw new Exception();\n                }\n\n                // Additional protection: check compression ratio\n                if ($stats['comp_size'] &gt; 0) {\n                    $ratio = $currentSize / $stats['comp_size'];\n                    if ($ratio &gt; MAX_RATIO) {\n                        // Reached max. compression ratio\n                        throw new Exception();\n                    }\n                }\n\n                file_put_contents($filename, fread($fp, READ_LENGTH), FILE_APPEND);\n            }\n\n            fclose($fp);\n        } else {\n            mkdir($filename);\n        }\n    }\n    $zip-&gt;close();\n}\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://www.php.net/manual/en/ref.zip.php\"\u003EZip\u003C/a\u003E module:\u003C/p\u003E\n\u003Cpre\u003E\ndefine('MAX_FILES', 10000);\ndefine('MAX_SIZE', 1000000000); // 1 GB\ndefine('MAX_RATIO', 10);\ndefine('READ_LENGTH', 1024);\n\n$fileCount = 0;\n$totalSize = 0;\n\n$zip = zip_open($file);\nwhile ($file = zip_read($zip)) {\n    $filename = zip_entry_name($file);\n\n    if (strpos($filename, '../') !== false || substr($filename, 0, 1) === '/') {\n        throw new Exception();\n    }\n\n    if (substr($filename, -1) !== '/') {\n        $fileCount++;\n        if ($fileCount &gt; MAX_FILES) {\n            // Reached max. number of files\n            throw new Exception();\n        }\n\n        $currentSize = 0;\n        while ($data = zip_entry_read($file, READ_LENGTH)) { // Compliant\n            $currentSize += READ_LENGTH;\n            $totalSize += READ_LENGTH;\n\n            if ($totalSize &gt; MAX_SIZE) {\n                // Reached max. size\n                throw new Exception();\n            }\n\n            // Additional protection: check compression ratio\n            if (zip_entry_compressedsize($file) &gt; 0) {\n                $ratio = $currentSize / zip_entry_compressedsize($file);\n                if ($ratio &gt; MAX_RATIO) {\n                    // Reached max. compression ratio\n                    throw new Exception();\n                }\n            }\n\n            file_put_contents($filename, $data, FILE_APPEND);\n        }\n    } else {\n        mkdir($filename);\n    }\n}\nzip_close($zip);\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A01_2021-Broken_Access_Control/\"\u003ETop 10 2021 Category A1 - Broken Access Control\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A05_2021-Security_Misconfiguration/\"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control\"\u003ETop 10 2017 Category A5 - Broken Access Control\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration\"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/409\"\u003ECWE-409 - Improper Handling of Highly Compressed Data (Data Amplification)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"https://www.bamsoftware.com/hacks/zipbomb/\"\u003Ebamsoftware.com\u003C/a\u003E - A better Zip Bomb \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003ESuccessful Zip Bomb attacks occur when an application expands untrusted archive files without controlling the size of the expanded data, which can\nlead to denial of service. A Zip bomb is usually a malicious archive file of a few kilobytes of compressed data but turned into gigabytes of\nuncompressed data. To achieve this extreme \u003Ca href="https://en.wikipedia.org/wiki/Data_compression_ratio"\u003Ecompression ratio\u003C/a\u003E, attackers will\ncompress irrelevant data (eg: a long string of repeated bytes).\u003C/p\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cp\u003EArchives to expand are untrusted and:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E There is no validation of the number of entries in the archive. \u003C/li\u003E\n  \u003Cli\u003E There is no validation of the total size of the uncompressed data. \u003C/li\u003E\n  \u003Cli\u003E There is no validation of the ratio between the compressed and uncompressed archive entry. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S1854",
      name: "Unused assignments should be removed",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            "\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/563\"\u003ECWE-563 - Assignment to Variable without Use ('Unused Variable')\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003ERelated rules\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS1763&rule_key=php%3AS1763'\u003ES1763\u003C/a\u003E - All code should be reachable \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS3626&rule_key=php%3AS3626'\u003ES3626\u003C/a\u003E - Jump statements should not be redundant \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS1763&rule_key=php%3AS1763'\u003ES1763\u003C/a\u003E detects unreachable code \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS3626&rule_key=php%3AS3626'\u003ES3626\u003C/a\u003E identifies redundant jump statements \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003ERemove the unnecesarry assignment, then test the code to make sure that the right-hand side of a given assignment had no side effects (e.g. a\nmethod that writes certain data to a file and returns the number of written bytes).\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n$i = $a + $b; // Noncompliant - calculation result is not used before value is overwritten\n$i = compute();\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n$i = $a + $b;\n$i += compute();\n\u003C/pre\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EDead stores refer to assignments made to local variables that are subsequently never used or immediately overwritten. Such assignments are\nunnecessary and don’t contribute to the functionality or clarity of the code. They may even negatively impact performance. Removing them enhances code\ncleanliness and readability. Even if the unnecessary operations do not do any harm in terms of the program’s correctness, they are - at best - a waste\nof computing resources.\u003C/p\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003EThis rule ignores initializations to \u003Ccode\u003E-1\u003C/code\u003E, \u003Ccode\u003E0\u003C/code\u003E, \u003Ccode\u003E1\u003C/code\u003E, \u003Ccode\u003Enull\u003C/code\u003E, \u003Ccode\u003Etrue\u003C/code\u003E, \u003Ccode\u003Efalse\u003C/code\u003E,\n\u003Ccode\u003E""\u003C/code\u003E, \u003Ccode\u003E[]\u003C/code\u003E and \u003Ccode\u003Earray()\u003C/code\u003E.\u003C/p\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S2278",
      name: "Neither DES (Data Encryption Standard) nor DESede (3DES) should be used",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule is deprecated; use \u003Ca href='/organizations/my-org/rules?open=php%3AS5547&rule_key=php%3AS5547'\u003ES5547\u003C/a\u003E instead.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EAccording to the US National Institute of Standards and Technology (NIST), the Data Encryption Standard (DES) is no longer considered secure:\u003C/p\u003E\n\u003Cblockquote\u003E\n  \u003Cp\u003EAdopted in 1977 for federal agencies to use in protecting sensitive, unclassified information, the DES is being withdrawn because it no longer\n  provides the security that is needed to protect federal government information.\u003C/p\u003E\n  \u003Cp\u003EFederal agencies are encouraged to use the Advanced Encryption Standard, a faster and stronger algorithm approved as FIPS 197 in 2001.\u003C/p\u003E\n\u003C/blockquote\u003E\n\u003Cp\u003EFor similar reasons, RC2 should also be avoided.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\n&lt;?php\n  $ciphertext = mcrypt_encrypt(MCRYPT_DES, $key, $plaintext, $mode); // Noncompliant\n  // ...\n  $ciphertext = mcrypt_encrypt(MCRYPT_DES_COMPAT, $key, $plaintext, $mode); // Noncompliant\n  // ...\n  $ciphertext = mcrypt_encrypt(MCRYPT_TRIPLEDES, $key, $plaintext, $mode); // Noncompliant\n  // ...\n  $ciphertext = mcrypt_encrypt(MCRYPT_3DES, $key, $plaintext, $mode); // Noncompliant\n\n  $cipher = "des-ede3-cfb";  // Noncompliant\n  $ciphertext_raw = openssl_encrypt($plaintext, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);\n?&gt;\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\n&lt;?php\n  $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);\n?&gt;\n\u003C/pre\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/326"\u003ECWE-326 - Inadequate Encryption Strength\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/327"\u003ECWE-327 - Use of a Broken or Risky Cryptographic Algorithm\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rule \u003Ca href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#DES_USAGE"\u003EDES / DESede Unsafe\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S5547",
      name: "Cipher algorithms should be robust",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EEncryption algorithms are essential for protecting sensitive information and ensuring secure communication in various domains. They are used for\nseveral important reasons:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Confidentiality, privacy, and intellectual property protection \u003C/li\u003E\n  \u003Cli\u003E Security during transmission or on storage devices \u003C/li\u003E\n  \u003Cli\u003E Data integrity, general trust, and authentication \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EWhen selecting encryption algorithms, tools, or combinations, you should also consider two things:\u003C/p\u003E\n\u003Col\u003E\n  \u003Cli\u003E No encryption is unbreakable. \u003C/li\u003E\n  \u003Cli\u003E The strength of an encryption algorithm is usually measured by the effort required to crack it within a reasonable time frame. \u003C/li\u003E\n\u003C/ol\u003E\n\u003Cp\u003EFor these reasons, as soon as cryptography is included in a project, it is important to choose encryption algorithms that are considered strong and\nsecure by the cryptography community.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EThe cleartext of an encrypted message might be recoverable. Additionally, it might be possible to modify the cleartext of an encrypted message.\u003C/p\u003E\n\u003Cp\u003EBelow are some real-world scenarios that illustrate some impacts of an attacker exploiting the vulnerability.\u003C/p\u003E\n\u003Ch4\u003ETheft of sensitive data\u003C/h4\u003E\n\u003Cp\u003EThe encrypted message might contain data that is considered sensitive and should not be known to third parties.\u003C/p\u003E\n\u003Cp\u003EBy using a weak algorithm the likelihood that an attacker might be able to recover the cleartext drastically increases.\u003C/p\u003E\n\u003Ch4\u003EAdditional attack surface\u003C/h4\u003E\n\u003Cp\u003EBy modifying the cleartext of the encrypted message it might be possible for an attacker to trigger other vulnerabilities in the code. Encrypted\nvalues are often considered trusted, since under normal circumstances it would not be possible for a third party to modify them.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/327"\u003ECWE-327 - Use of a Broken or Risky Cryptographic Algorithm\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code contains examples of algorithms that are not considered highly resistant to cryptanalysis and thus should be avoided.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="11" data-diff-type="noncompliant"\u003E\nopenssl_encrypt($plaintext, "des-ofb", $key, $options=OPENSSL_RAW_DATA, $iv); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="11" data-diff-type="compliant"\u003E\nopenssl_encrypt($plaintext, "aes-256-gcm", $key, $options=OPENSSL_RAW_DATA, $iv);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Ch4\u003EUse a secure algorithm\u003C/h4\u003E\n\u003Cp\u003EIt is highly recommended to use an algorithm that is currently considered secure by the cryptographic community. A common choice for such an\nalgorithm is the Advanced Encryption Standard (AES).\u003C/p\u003E\n\u003Cp\u003EFor block ciphers, it is not recommended to use algorithms with a block size that is smaller than 128 bits.\u003C/p\u003E',
          context: {
            displayName: "OpenSSL",
            key: "openssl",
          },
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis vulnerability makes it possible that the cleartext of the encrypted message might be recoverable without prior knowledge of the key.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code contains examples of algorithms that are not considered highly resistant to cryptanalysis and thus should be avoided.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nmcrypt_encrypt(MCRYPT_DES, $key, $plaintext, $mode); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EMcrypt is deprecated and should not be used. You can use \u003Ca href="https://www.php.net/manual/en/book.sodium.php"\u003ESodium\u003C/a\u003E instead.\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nsodium_crypto_aead_aes256gcm_encrypt($plaintext, \'\', $nonce, $key);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Ch4\u003EUse a secure algorithm\u003C/h4\u003E\n\u003Cp\u003EIt is highly recommended to use an algorithm that is currently considered secure by the cryptographic community. A common choice for such an\nalgorithm is the Advanced Encryption Standard (AES).\u003C/p\u003E\n\u003Cp\u003EFor block ciphers, it is not recommended to use algorithms with a block size that is smaller than 128 bits.\u003C/p\u003E',
          context: {
            displayName: "Mcrypt",
            key: "mcrypt",
          },
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S5542",
      name: "Encryption algorithms should be used with secure mode and padding scheme",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EExample with a symmetric cipher, AES:\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nmcrypt_encrypt(MCRYPT_DES, $key, $plaintext, "ecb"); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EMcrypt is deprecated and should not be used. You can use \u003Ca href="https://www.php.net/manual/en/book.sodium.php"\u003ESodium\u003C/a\u003E instead.\u003C/p\u003E\n\u003Cp\u003EFor the AES symmetric cipher, use the GCM mode:\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nsodium_crypto_aead_aes256gcm_encrypt($plaintext, \'\', $nonce, $key);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAs a rule of thumb, use the cryptographic algorithms and mechanisms that are considered strong by the cryptographic community.\u003C/p\u003E\n\u003Cp\u003EAppropriate choices are currently the following.\u003C/p\u003E\n\u003Ch4\u003EFor AES: use authenticated encryption modes\u003C/h4\u003E\n\u003Cp\u003EThe best-known authenticated encryption mode for AES is Galois/Counter mode (GCM).\u003C/p\u003E\n\u003Cp\u003EGCM mode combines encryption with authentication and integrity checks using a cryptographic hash function and provides both confidentiality and\nauthenticity of data.\u003C/p\u003E\n\u003Cp\u003EOther similar modes are:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CCM: \u003Ccode\u003ECounter with CBC-MAC\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E CWC: \u003Ccode\u003ECipher Block Chaining with Message Authentication Code\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E EAX: \u003Ccode\u003EEncrypt-and-Authenticate\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E IAPM: \u003Ccode\u003EInteger Authenticated Parallelizable Mode\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E OCB: \u003Ccode\u003EOffset Codebook Mode\u003C/code\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIt is also possible to use AES-CBC with HMAC for integrity checks. However, it is considered more straightforward to use AES-GCM directly\ninstead.\u003C/p\u003E\n\u003Ch4\u003EFor RSA: use the OAEP scheme\u003C/h4\u003E\n\u003Cp\u003EThe Optimal Asymmetric Encryption Padding scheme (OAEP) adds randomness and a secure hash function that strengthens the regular inner workings of\nRSA.\u003C/p\u003E',
          context: {
            displayName: "Mcrypt",
            key: "mcrypt",
          },
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EArticles &amp; blog posts\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://learn.microsoft.com/en-us/dotnet/standard/security/vulnerabilities-cbc-mode"\u003EMicrosoft, Timing vulnerabilities with CBC-mode\n  symmetric decryption using padding\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Padding_oracle_attack"\u003EWikipedia, Padding Oracle Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Chosen-ciphertext_attack"\u003EWikipedia, Chosen-Ciphertext Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Chosen-plaintext_attack"\u003EWikipedia, Chosen-Plaintext Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Semantic_security"\u003EWikipedia, Semantically Secure Cryptosystems\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding"\u003EWikipedia, OAEP\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Galois/Counter_Mode"\u003EWikipedia, Galois/Counter Mode\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/327"\u003ECWE-327 - Use of a Broken or Risky Cryptographic Algorithm\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EExample with a symmetric cipher, AES:\u003C/p\u003E\n\u003Cpre data-diff-id="11" data-diff-type="noncompliant"\u003E\nopenssl_encrypt($plaintext, "BF-ECB", $key, $options=OPENSSL_RAW_DATA, $iv); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EFor the AES symmetric cipher, use the GCM mode:\u003C/p\u003E\n\u003Cpre data-diff-id="11" data-diff-type="compliant"\u003E\nopenssl_encrypt($plaintext, "aes-256-gcm", $key, $options=OPENSSL_RAW_DATA, $iv);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAs a rule of thumb, use the cryptographic algorithms and mechanisms that are considered strong by the cryptographic community.\u003C/p\u003E\n\u003Cp\u003EAppropriate choices are currently the following.\u003C/p\u003E\n\u003Ch4\u003EFor AES: use authenticated encryption modes\u003C/h4\u003E\n\u003Cp\u003EThe best-known authenticated encryption mode for AES is Galois/Counter mode (GCM).\u003C/p\u003E\n\u003Cp\u003EGCM mode combines encryption with authentication and integrity checks using a cryptographic hash function and provides both confidentiality and\nauthenticity of data.\u003C/p\u003E\n\u003Cp\u003EOther similar modes are:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CCM: \u003Ccode\u003ECounter with CBC-MAC\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E CWC: \u003Ccode\u003ECipher Block Chaining with Message Authentication Code\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E EAX: \u003Ccode\u003EEncrypt-and-Authenticate\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E IAPM: \u003Ccode\u003EInteger Authenticated Parallelizable Mode\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E OCB: \u003Ccode\u003EOffset Codebook Mode\u003C/code\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIt is also possible to use AES-CBC with HMAC for integrity checks. However, it is considered more straightforward to use AES-GCM directly\ninstead.\u003C/p\u003E\n\u003Ch4\u003EFor RSA: use the OAEP scheme\u003C/h4\u003E\n\u003Cp\u003EThe Optimal Asymmetric Encryption Padding scheme (OAEP) adds randomness and a secure hash function that strengthens the regular inner workings of\nRSA.\u003C/p\u003E',
          context: {
            displayName: "OpenSSL",
            key: "openssl",
          },
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EEncryption algorithms are essential for protecting sensitive information and ensuring secure communications in a variety of domains. They are used\nfor several important reasons:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Confidentiality, privacy, and intellectual property protection \u003C/li\u003E\n  \u003Cli\u003E Security during transmission or on storage devices \u003C/li\u003E\n  \u003Cli\u003E Data integrity, general trust, and authentication \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EWhen selecting encryption algorithms, tools, or combinations, you should also consider two things:\u003C/p\u003E\n\u003Col\u003E\n  \u003Cli\u003E No encryption is unbreakable. \u003C/li\u003E\n  \u003Cli\u003E The strength of an encryption algorithm is usually measured by the effort required to crack it within a reasonable time frame. \u003C/li\u003E\n\u003C/ol\u003E\n\u003Cp\u003EFor these reasons, as soon as cryptography is included in a project, it is important to choose encryption algorithms that are considered strong and\nsecure by the cryptography community.\u003C/p\u003E\n\u003Cp\u003EFor AES, the weakest mode is ECB (Electronic Codebook). Repeated blocks of data are encrypted to the same value, making them easy to identify and\nreducing the difficulty of recovering the original cleartext.\u003C/p\u003E\n\u003Cp\u003EUnauthenticated modes such as CBC (Cipher Block Chaining) may be used but are prone to attacks that manipulate the ciphertext. They must be used\nwith caution.\u003C/p\u003E\n\u003Cp\u003EFor RSA, the weakest algorithms are either using it without padding or using the PKCS1v1.5 padding scheme.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EThe cleartext of an encrypted message might be recoverable. Additionally, it might be possible to modify the cleartext of an encrypted message.\u003C/p\u003E\n\u003Cp\u003EBelow are some real-world scenarios that illustrate possible impacts of an attacker exploiting the vulnerability.\u003C/p\u003E\n\u003Ch4\u003ETheft of sensitive data\u003C/h4\u003E\n\u003Cp\u003EThe encrypted message might contain data that is considered sensitive and should not be known to third parties.\u003C/p\u003E\n\u003Cp\u003EBy using a weak algorithm the likelihood that an attacker might be able to recover the cleartext drastically increases.\u003C/p\u003E\n\u003Ch4\u003EAdditional attack surface\u003C/h4\u003E\n\u003Cp\u003EBy modifying the cleartext of the encrypted message it might be possible for an attacker to trigger other vulnerabilities in the code. Encrypted\nvalues are often considered trusted, since under normal circumstances it would not be possible for a third party to modify them.\u003C/p\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis vulnerability exposes encrypted data to a number of attacks whose goal is to recover the plaintext.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S2277",
      name: "Cryptographic RSA algorithms should always incorporate OAEP (Optimal Asymmetric Encryption Padding)",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWithout OAEP in RSA encryption, it takes less work for an attacker to decrypt the data or infer patterns from the ciphertext. This rule logs an\nissue when \u003Ccode\u003Eopenssl_public_encrypt\u003C/code\u003E is used with one the following padding constants: \u003Ccode\u003EOPENSSL_NO_PADDING\u003C/code\u003E or\n\u003Ccode\u003EOPENSSL_PKCS1_PADDING\u003C/code\u003E or \u003Ccode\u003EOPENSSL_SSLV23_PADDING\u003C/code\u003E.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nfunction encrypt($data, $key) {\n  $crypted='';\n  openssl_public_encrypt($data, $crypted, $key, OPENSSL_NO_PADDING); // Noncompliant\n  return $crypted;\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\nfunction encrypt($data, $key) {\n  $crypted='';\n  openssl_public_encrypt($data, $crypted, $key, OPENSSL_PKCS1_OAEP_PADDING);\n  return $crypted;\n}\n\u003C/pre\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule is deprecated; use \u003Ca href='/organizations/my-org/rules?open=php%3AS5542&rule_key=php%3AS5542'\u003ES5542\u003C/a\u003E instead.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/780"\u003ECWE-780 - Use of RSA Algorithm without OAEP\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/327"\u003ECWE-327 - Use of a Broken or Risky Cryptographic Algorithm\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rule \u003Ca href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#RSA_NO_PADDING"\u003ERSA NoPadding Unsafe\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S3923",
      name: "All branches in a conditional structure should not have exactly the same implementation",
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EHaving all branches of a \u003Ccode\u003Eswitch\u003C/code\u003E or \u003Ccode\u003Eif\u003C/code\u003E chain with the same implementation indicates a problem.\u003C/p\u003E\n\u003Cp\u003EIn the following code:\u003C/p\u003E\n\u003Cpre\u003E\nif ($b == 0) {  // Noncompliant\n  doOneMoreThing();\n} else {\n  doOneMoreThing();\n}\n\n$b = $a &gt; 12 ? 4 : 4;  // Noncompliant\n\nswitch ($i) {  // Noncompliant\n  case 1:\n    doSomething();\n    break;\n  case 2:\n    doSomething();\n    break;\n  case 3:\n    doSomething();\n    break;\n  default:\n    doSomething();\n}\n\u003C/pre\u003E\n\u003Cp\u003EEither there is a copy-paste error that needs fixing or an unnecessary \u003Ccode\u003Eswitch\u003C/code\u003E or \u003Ccode\u003Eif\u003C/code\u003E chain that should be removed.\u003C/p\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003EThis rule does not apply to \u003Ccode\u003Eif\u003C/code\u003E chains without \u003Ccode\u003Eelse\u003C/code\u003E, nor to \u003Ccode\u003Eswitch\u003C/code\u003E without a \u003Ccode\u003Edefault\u003C/code\u003E clause.\u003C/p\u003E\n\u003Cpre\u003E\nif($b == 0) {    //no issue, this could have been done on purpose to make the code more readable\n  doSomething();\n} elseif($b == 1) {\n  doSomething();\n}\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S836",
      name: "Variables should be initialized before use",
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/457"\u003ECWE-457 - Use of Uninitialized Variable\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EIn PHP it is not required to initialize variables before their usage. However, using uninitialized variables is considered bad practice and should\nbe avoided because of the following reasons:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E The value and type of uninitialized variables depend on the context of their first usage. It is better to be explicit about those to avoid\n  confusion. \u003C/li\u003E\n  \u003Cli\u003E The interpreter raises a warning or a notice in many cases. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\n&lt;?php\n\nfunction getText(array $lines): string {\n    foreach ($lines as $line) {\n        $text .= $line;\n    }\n\n    return $text;\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\n&lt;?php\n\nfunction getText(array $lines): string {\n    $text = "";\n\n    foreach ($lines as $line) {\n        $text .= $line;\n    }\n\n    return $text;\n}\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S5876",
      name: "A new session should be created during user authentication",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cp\u003E\u003Ca href="https://symfony.com/doc/current/reference/configuration/security.html#session-fixation-strategy"\u003ESecurity Configuration Reference -\nSession Fixation Strategy\u003C/a\u003E\u003C/p\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication"\u003ETop 10 2017 Category A2 - Broken Authentication\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://owasp.org/www-community/attacks/Session_fixation"\u003EOWASP Sesssion Fixation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/384"\u003ECWE-384 - Session Fixation\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ESession fixation attacks take advantage of the way web applications manage session identifiers. Here’s how a session fixation attack typically\nworks:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E When a user visits a website or logs in, a session is created for them. \u003C/li\u003E\n  \u003Cli\u003E This session is assigned a unique session identifier, stored in a cookie, in local storage, or through URL parameters. \u003C/li\u003E\n  \u003Cli\u003E In a session fixation attack, an attacker tricks a user into using a predetermined session identifier controlled by the attacker. For example,\n  the attacker sends the victim an email containing a link with this predetermined session identifier. \u003C/li\u003E\n  \u003Cli\u003E When the victim clicks on the link, the web application does not create a new session identifier but uses this identifier known to the\n  attacker. \u003C/li\u003E\n  \u003Cli\u003E At this point, the attacker can hijack and impersonate the victim’s session. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003ESession fixation attacks pose a significant security risk to web applications and their users. By exploiting this vulnerability, attackers can gain\nunauthorized access to user sessions, potentially leading to various malicious activities. Some of the most relevant scenarios are the following:\u003C/p\u003E\n\u003Ch4\u003EImpersonation\u003C/h4\u003E\n\u003Cp\u003EOnce an attacker successfully fixes a session identifier, they can impersonate the victim and gain access to their account without providing valid\ncredentials. This can result in unauthorized actions, such as modifying personal information, making unauthorized transactions, or even performing\nmalicious activities on behalf of the victim. An attacker can also manipulate the victim into performing actions they wouldn’t normally do, such as\nrevealing sensitive information or conducting financial transactions on the attacker’s behalf.\u003C/p\u003E\n\u003Ch4\u003EData Breach\u003C/h4\u003E\n\u003Cp\u003EIf an attacker gains access to a user’s session, they may also gain access to sensitive data associated with that session. This can include\npersonal information, financial details, or any other confidential data that the user has access to within the application. The compromised data can\nbe used for identity theft, financial fraud, or other malicious purposes.\u003C/p\u003E\n\u003Ch4\u003EPrivilege Escalation\u003C/h4\u003E\n\u003Cp\u003EIn some cases, session fixation attacks can be used to escalate privileges within a web application. By fixing a session identifier with higher\nprivileges, an attacker can bypass access controls and gain administrative or privileged access to the application. This can lead to unauthorized\nmodifications, data manipulation, or even complete compromise of the application and its underlying systems.\u003C/p\u003E\n\u003Ch3\u003EHow to fix it in Symfony\u003C/h3\u003E\n\n\u003Cp\u003EIn a Symfony Security’s context, session fixation protection can be disabled with the value \u003Ccode\u003Enone\u003C/code\u003E for the\n\u003Ccode\u003Esession_fixation_strategy\u003C/code\u003E attribute.\u003C/p\u003E\n\u003Cp\u003ESession fixation protection is enabled by default in Symfony. It can be explicitly enabled with the values \u003Ccode\u003Emigrate\u003C/code\u003E and\n\u003Ccode\u003Einvalidate\u003C/code\u003E for the \u003Ccode\u003Esession_fixation_strategy\u003C/code\u003E attribute.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id=\"1\" data-diff-type=\"noncompliant\"\u003E\nnamespace Symfony\\Component\\DependencyInjection\\Loader\\Configurator;\n\nreturn static function (ContainerConfigurator $container) {\n    $container-&gt;extension('security', [\n        'session_fixation_strategy' =&gt; 'none', // Noncompliant\n    ]);\n};\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id=\"1\" data-diff-type=\"compliant\"\u003E\nnamespace Symfony\\Component\\DependencyInjection\\Loader\\Configurator;\n\nreturn static function (ContainerConfigurator $container) {\n    $container-&gt;extension('security', [\n        'session_fixation_strategy' =&gt; 'migrate',\n    ]);\n};\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EThe protection works by ensuring that the session identifier, which is used to identify and track a user’s session, is changed or regenerated\nduring the authentication process.\u003C/p\u003E\n\u003Cp\u003EHere’s how session fixation protection typically works:\u003C/p\u003E\n\u003Col\u003E\n  \u003Cli\u003E When a user visits a website or logs in, a session is created for them. This session is assigned a unique session identifier, which is stored\n  in a cookie or passed through URL parameters. \u003C/li\u003E\n  \u003Cli\u003E In a session fixation attack, an attacker tricks a user into using a predetermined session identifier controlled by the attacker. This allows\n  the attacker to potentially gain unauthorized access to the user’s session. \u003C/li\u003E\n  \u003Cli\u003E To protect against session fixation attacks, session fixation protection mechanisms come into play during the authentication process. When a\n  user successfully authenticates, this mechanism generates a new session identifier for the user’s session. \u003C/li\u003E\n  \u003Cli\u003E The old session identifier, which may have been manipulated by the attacker, is invalidated and no longer associated with the user’s session.\n  This ensures that any attempts by the attacker to use the fixed session identifier are rendered ineffective. \u003C/li\u003E\n  \u003Cli\u003E The user is then assigned the new session identifier, which is used for subsequent requests and session tracking. This new session identifier\n  is typically stored in a new session cookie or passed through URL parameters. \u003C/li\u003E\n\u003C/ol\u003E\n\u003Cp\u003EBy regenerating the session identifier upon authentication, session fixation protection helps ensure that the user’s session is tied to a new,\nsecure identifier that the attacker cannot predict or control. This mitigates the risk of an attacker gaining unauthorized access to the user’s\nsession and helps maintain the integrity and security of the application’s session management process.\u003C/p\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EAn attacker may trick a user into using a predetermined session identifier. Consequently, this attacker can gain unauthorized access and\nimpersonate the user’s session. This kind of attack is called session fixation, and protections against it should not be disabled.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S4787",
      name: "Encrypting data is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EThis rule is deprecated; use \u003Ca href='/organizations/my-org/rules?open=php%3AS4426&rule_key=php%3AS4426'\u003ES4426\u003C/a\u003E, \u003Ca href='/organizations/my-org/rules?open=php%3AS5542&rule_key=php%3AS5542'\u003ES5542\u003C/a\u003E, \u003Ca href='/organizations/my-org/rules?open=php%3AS5547&rule_key=php%3AS5547'\u003ES5547\u003C/a\u003E instead.\u003C/p\u003E\n\u003Cp\u003EEncrypting data is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href=\"http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-7902\"\u003ECVE-2017-7902\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-1378\"\u003ECVE-2006-1378\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1376\"\u003ECVE-2003-1376\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EProper encryption requires both the encryption algorithm and the key to be strong. Obviously the private key needs to remain secret and be renewed\nregularly. However these are not the only means to defeat or weaken an encryption.\u003C/p\u003E\n\u003Cp\u003EThis rule flags function calls that initiate encryption/decryption.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Generate encryption keys using secure random algorithms. \u003C/li\u003E\n  \u003Cli\u003E When generating cryptographic keys (or key pairs), it is important to use a key length that provides enough entropy against brute-force\n  attacks. For the Blowfish algorithm the key should be at least 128 bits long, while for the RSA algorithm it should be at least 2048 bits long.\n  \u003C/li\u003E\n  \u003Cli\u003E Regenerate the keys regularly. \u003C/li\u003E\n  \u003Cli\u003E Always store the keys in a safe location and transfer them only over safe channels. \u003C/li\u003E\n  \u003Cli\u003E If there is an exchange of cryptographic keys, check first the identity of the receiver. \u003C/li\u003E\n  \u003Cli\u003E Only use strong encryption algorithms. Check regularly that the algorithm is still deemed secure. It is also imperative that they are\n  implemented correctly. Use only encryption libraries which are deemed secure. Do not define your own encryption algorithms as they will most\n  probably have flaws. \u003C/li\u003E\n  \u003Cli\u003E When a nonce is used, generate it randomly every time. \u003C/li\u003E\n  \u003Cli\u003E When using the RSA algorithm, incorporate an Optimal Asymmetric Encryption Padding (OAEP). \u003C/li\u003E\n  \u003Cli\u003E When CBC is used for encryption, the IV must be random and unpredictable. Otherwise it exposes the encrypted value to crypto-analysis attacks\n  like \"Chosen-Plaintext Attacks\". Thus a secure random algorithm should be used. An IV value should be associated to one and only one encryption\n  cycle, because the IV’s purpose is to ensure that the same plaintext encrypted twice will yield two different ciphertexts. \u003C/li\u003E\n  \u003Cli\u003E The Advanced Encryption Standard (AES) encryption algorithm can be used with various modes. Galois/Counter Mode (GCM) with no padding should be\n  preferred to the following combinations which are not secured:\n    \u003Cul\u003E\n      \u003Cli\u003E Electronic Codebook (ECB) mode: Under a given key, any given plaintext block always gets encrypted to the same ciphertext block. Thus, it\n      does not hide data patterns well. In some senses, it doesn’t provide serious message confidentiality, and it is not recommended for use in\n      cryptographic protocols at all. \u003C/li\u003E\n      \u003Cli\u003E Cipher Block Chaining (CBC) with PKCS#5 padding (or PKCS#7) is susceptible to padding oracle attacks. \u003C/li\u003E\n    \u003C/ul\u003E  \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EBuiltin functions\u003C/p\u003E\n\u003Cpre\u003E\nfunction myEncrypt($cipher, $key, $data, $mode, $iv, $options, $padding, $infile, $outfile, $recipcerts, $headers, $nonce, $ad, $pub_key_ids, $env_keys)\n{\n    mcrypt_ecb ($cipher, $key, $data, $mode); // Sensitive\n    mcrypt_cfb($cipher, $key, $data, $mode, $iv); // Sensitive\n    mcrypt_cbc($cipher, $key, $data, $mode, $iv); // Sensitive\n    mcrypt_encrypt($cipher, $key, $data, $mode); // Sensitive\n\n    openssl_encrypt($data, $cipher, $key, $options, $iv); // Sensitive\n    openssl_public_encrypt($data, $crypted, $key, $padding); // Sensitive\n    openssl_pkcs7_encrypt($infile, $outfile, $recipcerts, $headers); // Sensitive\n    openssl_seal($data, $sealed_data, $env_keys, $pub_key_ids); // Sensitive\n\n    sodium_crypto_aead_aes256gcm_encrypt ($data, $ad, $nonce, $key); // Sensitive\n    sodium_crypto_aead_chacha20poly1305_encrypt ($data, $ad, $nonce, $key); // Sensitive\n    sodium_crypto_aead_chacha20poly1305_ietf_encrypt ($data, $ad, $nonce, $key); // Sensitive\n    sodium_crypto_aead_xchacha20poly1305_ietf_encrypt ($data, $ad, $nonce, $key); // Sensitive\n    sodium_crypto_box_seal ($data, $key); // Sensitive\n    sodium_crypto_box ($data, $nonce, $key); // Sensitive\n    sodium_crypto_secretbox ($data, $nonce, $key); // Sensitive\n    sodium_crypto_stream_xor ($data, $nonce, $key); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003ECakePHP\u003C/p\u003E\n\u003Cpre\u003E\nuse Cake\\Utility\\Security;\n\nfunction myCakeEncrypt($key, $data, $engine)\n{\n    Security::encrypt($data, $key); // Sensitive\n\n    // Do not use custom made engines and remember that Mcrypt is deprecated.\n    Security::engine($engine); // Sensitive. Setting the encryption engine.\n}\n\u003C/pre\u003E\n\u003Cp\u003ECodeIgniter\u003C/p\u003E\n\u003Cpre\u003E\nclass EncryptionController extends CI_Controller\n{\n    public function __construct()\n    {\n        parent::__construct();\n        $this-&gt;load-&gt;library('encryption');\n    }\n\n    public function index()\n    {\n        $this-&gt;encryption-&gt;create_key(16); // Sensitive. Review the key length.\n        $this-&gt;encryption-&gt;initialize( // Sensitive.\n            array(\n                'cipher' =&gt; 'aes-256',\n                'mode' =&gt; 'ctr',\n                'key' =&gt; 'the key',\n            )\n        );\n        $this-&gt;encryption-&gt;encrypt(\"mysecretdata\"); // Sensitive.\n    }\n}\n\u003C/pre\u003E\n\u003Cp\u003ECraftCMS version 3\u003C/p\u003E\n\u003Cpre\u003E\nuse Craft;\n\n// This is similar to Yii as it used by CraftCMS\nfunction craftEncrypt($data, $key, $password) {\n    Craft::$app-&gt;security-&gt;encryptByKey($data, $key); // Sensitive\n    Craft::$app-&gt;getSecurity()-&gt;encryptByKey($data, $key); // Sensitive\n    Craft::$app-&gt;security-&gt;encryptByPassword($data, $password); // Sensitive\n    Craft::$app-&gt;getSecurity()-&gt;encryptByPassword($data, $password); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003EDrupal 7 - Encrypt module\u003C/p\u003E\n\u003Cpre\u003E\nfunction drupalEncrypt() {\n    $encrypted_text = encrypt('some string to encrypt'); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003EJoomla\u003C/p\u003E\n\u003Cpre\u003E\nuse Joomla\\Crypt\\CipherInterface;\n\nabstract class MyCipher implements CipherInterface // Sensitive. Implementing custom cipher class\n{}\n\nfunction joomlaEncrypt() {\n    new Joomla\\Crypt\\Cipher_Sodium(); // Sensitive\n    new Joomla\\Crypt\\Cipher_Simple(); // Sensitive\n    new Joomla\\Crypt\\Cipher_Rijndael256(); // Sensitive\n    new Joomla\\Crypt\\Cipher_Crypto(); // Sensitive\n    new Joomla\\Crypt\\Cipher_Blowfish(); // Sensitive\n    new Joomla\\Crypt\\Cipher_3DES(); // Sensitive\n}\n}\n\u003C/pre\u003E\n\u003Cp\u003ELaravel\u003C/p\u003E\n\u003Cpre\u003E\nuse Illuminate\\Support\\Facades\\Crypt;\n\nfunction myLaravelEncrypt($data)\n{\n    Crypt::encryptString($data); // Sensitive\n    Crypt::encrypt($data); // Sensitive\n    // encrypt using the Laravel \"encrypt\" helper\n    encrypt($data); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003EPHP-Encryption library\u003C/p\u003E\n\u003Cpre\u003E\nuse Defuse\\Crypto\\Crypto;\nuse Defuse\\Crypto\\File;\n\nfunction mypPhpEncryption($data, $key, $password, $inputFilename, $outputFilename, $inputHandle, $outputHandle) {\n    Crypto::encrypt($data, $key); // Sensitive\n    Crypto::encryptWithPassword($data, $password); // Sensitive\n    File::encryptFile($inputFilename, $outputFilename, $key); // Sensitive\n    File::encryptFileWithPassword($inputFilename, $outputFilename, $password); // Sensitive\n    File::encryptResource($inputHandle, $outputHandle, $key); // Sensitive\n    File::encryptResourceWithPassword($inputHandle, $outputHandle, $password); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003EPhpSecLib\u003C/p\u003E\n\u003Cpre\u003E\nfunction myphpseclib($mode) {\n    new phpseclib\\Crypt\\RSA(); // Sensitive. Note: RSA can also be used for signing data.\n    new phpseclib\\Crypt\\AES(); // Sensitive\n    new phpseclib\\Crypt\\Rijndael(); // Sensitive\n    new phpseclib\\Crypt\\Twofish(); // Sensitive\n    new phpseclib\\Crypt\\Blowfish(); // Sensitive\n    new phpseclib\\Crypt\\RC4(); // Sensitive\n    new phpseclib\\Crypt\\RC2(); // Sensitive\n    new phpseclib\\Crypt\\TripleDES(); // Sensitive\n    new phpseclib\\Crypt\\DES(); // Sensitive\n\n    new phpseclib\\Crypt\\AES($mode); // Sensitive\n    new phpseclib\\Crypt\\Rijndael($mode); // Sensitive\n    new phpseclib\\Crypt\\TripleDES($mode); // Sensitive\n    new phpseclib\\Crypt\\DES($mode); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003ESodium Compat library\u003C/p\u003E\n\u003Cpre\u003E\nfunction mySodiumCompatEncrypt($data, $ad, $nonce, $key) {\n    ParagonIE_Sodium_Compat::crypto_aead_chacha20poly1305_ietf_encrypt($data, $ad, $nonce, $key); // Sensitive\n    ParagonIE_Sodium_Compat::crypto_aead_xchacha20poly1305_ietf_encrypt($data, $ad, $nonce, $key); // Sensitive\n    ParagonIE_Sodium_Compat::crypto_aead_chacha20poly1305_encrypt($data, $ad, $nonce, $key); // Sensitive\n\n    ParagonIE_Sodium_Compat::crypto_aead_aes256gcm_encrypt($data, $ad, $nonce, $key); // Sensitive\n\n    ParagonIE_Sodium_Compat::crypto_box($data, $nonce, $key); // Sensitive\n    ParagonIE_Sodium_Compat::crypto_secretbox($data, $nonce, $key); // Sensitive\n    ParagonIE_Sodium_Compat::crypto_box_seal($data, $key); // Sensitive\n    ParagonIE_Sodium_Compat::crypto_secretbox_xchacha20poly1305($data, $nonce, $key); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003EYii version 2\u003C/p\u003E\n\u003Cpre\u003E\nuse Yii;\n\n// Similar to CraftCMS as it uses Yii\nfunction YiiEncrypt($data, $key, $password) {\n    Yii::$app-&gt;security-&gt;encryptByKey($data, $key); // Sensitive\n    Yii::$app-&gt;getSecurity()-&gt;encryptByKey($data, $key); // Sensitive\n    Yii::$app-&gt;security-&gt;encryptByPassword($data, $password); // Sensitive\n    Yii::$app-&gt;getSecurity()-&gt;encryptByPassword($data, $password); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003EZend\u003C/p\u003E\n\u003Cpre\u003E\nuse Zend\\Crypt\\FileCipher;\nuse Zend\\Crypt\\PublicKey\\DiffieHellman;\nuse Zend\\Crypt\\PublicKey\\Rsa;\nuse Zend\\Crypt\\Hybrid;\nuse Zend\\Crypt\\BlockCipher;\n\nfunction myZendEncrypt($key, $data, $prime, $options, $generator, $lib)\n{\n    new FileCipher; // Sensitive. This is used to encrypt files\n\n    new DiffieHellman($prime, $generator, $key); // Sensitive\n\n    $rsa = Rsa::factory([ // Sensitive\n        'public_key'    =&gt; 'public_key.pub',\n        'private_key'   =&gt; 'private_key.pem',\n        'pass_phrase'   =&gt; 'mypassphrase',\n        'binary_output' =&gt; false,\n    ]);\n    $rsa-&gt;encrypt($data); // No issue raised here. The configuration of the Rsa object is the line to review.\n\n    $hybrid = new Hybrid(); // Sensitive\n\n    BlockCipher::factory($lib, $options); // Sensitive\n}\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure\"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration\"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/321\"\u003ECWE-321 - Use of Hard-coded Cryptographic Key\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/322\"\u003ECWE-322 - Key Exchange without Entity Authentication\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/323\"\u003ECWE-323 - Reusing a Nonce, Key Pair in Encryption\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/324\"\u003ECWE-324 - Use of a Key Past its Expiration Date\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/325\"\u003ECWE-325 - Missing Required Cryptographic Step\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/326\"\u003ECWE-326 - Inadequate Encryption Strength\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/327\"\u003ECWE-327 - Use of a Broken or Risky Cryptographic Algorithm\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E the private key might not be random, strong enough or the same key is reused for a long long time. \u003C/li\u003E\n  \u003Cli\u003E the private key might be compromised. It can happen when it is stored in an unsafe place or when it was transferred in an unsafe manner. \u003C/li\u003E\n  \u003Cli\u003E the key exchange is made without properly authenticating the receiver. \u003C/li\u003E\n  \u003Cli\u003E the encryption algorithm is not strong enough for the level of protection required. Note that encryption algorithms strength decreases as time\n  passes. \u003C/li\u003E\n  \u003Cli\u003E the chosen encryption library is deemed unsafe. \u003C/li\u003E\n  \u003Cli\u003E a nonce is used, and the same value is reused multiple times, or the nonce is not random. \u003C/li\u003E\n  \u003Cli\u003E the RSA algorithm is used, and it does not incorporate an Optimal Asymmetric Encryption Padding (OAEP), which might weaken the encryption.\n  \u003C/li\u003E\n  \u003Cli\u003E the CBC (Cypher Block Chaining) algorithm is used for encryption, and it’s IV (Initialization Vector) is not generated using a secure random\n  algorithm, or it is reused. \u003C/li\u003E\n  \u003Cli\u003E the Advanced Encryption Standard (AES) encryption algorithm is used with an unsecure mode. See the recommended practices for more information.\n  \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EYou are at risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4423",
      name: "Weak SSL/TLS protocols should not be used",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            "\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id=\"1\" data-diff-type=\"noncompliant\"\u003E\n$opts = array(\n  'ssl' =&gt; [\n    'crypto_method' =&gt; STREAM_CRYPTO_METHOD_TLSv1_1_CLIENT // Noncompliant\n  ],\n  'http'=&gt;array(\n    'method'=&gt;\"GET\"\n  )\n);\n\n$context = stream_context_create($opts);\n\n$fp = fopen('https://www.example.com', 'r', false, $context);\nfpassthru($fp);\nfclose($fp);\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id=\"1\" data-diff-type=\"compliant\"\u003E\n$opts = array(\n  'ssl' =&gt; [\n    'crypto_method' =&gt; STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT\n  ],\n  'http'=&gt;array(\n    'method'=&gt;\"GET\"\n  )\n);\n\n$context = stream_context_create($opts);\n\n$fp = fopen('https://www.example.com', 'r', false, $context);\nfpassthru($fp);\nfclose($fp);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAs a rule of thumb, by default you should use the cryptographic algorithms and mechanisms that are considered strong by the cryptographic\ncommunity.\u003C/p\u003E\n\u003Cp\u003EThe best choices at the moment are the following.\u003C/p\u003E\n\u003Ch4\u003EUse TLS v1.2 or TLS v1.3\u003C/h4\u003E\n\u003Cp\u003EEven though TLS V1.3 is available, using TLS v1.2 is still considered good and secure practice by the cryptography community.\u003Cbr\u003E\u003C/p\u003E\n\u003Cp\u003EThe use of TLS v1.2 ensures compatibility with a wide range of platforms and enables seamless communication between different systems that do not\nyet have TLS v1.3 support.\u003C/p\u003E\n\u003Cp\u003EThe only drawback depends on whether the framework used is outdated: its TLS v1.2 settings may enable older and insecure cipher suites that are\ndeprecated as insecure.\u003C/p\u003E\n\u003Cp\u003EOn the other hand, TLS v1.3 removes support for older and weaker cryptographic algorithms, eliminates known vulnerabilities from previous TLS\nversions, and improves performance.\u003C/p\u003E",
          context: {
            displayName: "Core PHP",
            key: "core_php",
          },
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EEncryption algorithms are essential for protecting sensitive information and ensuring secure communications in a variety of domains. They are used\nfor several important reasons:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Confidentiality, privacy, and intellectual property protection \u003C/li\u003E\n  \u003Cli\u003E Security during transmission or on storage devices \u003C/li\u003E\n  \u003Cli\u003E Data integrity, general trust, and authentication \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EWhen selecting encryption algorithms, tools, or combinations, you should also consider two things:\u003C/p\u003E\n\u003Col\u003E\n  \u003Cli\u003E No encryption is unbreakable. \u003C/li\u003E\n  \u003Cli\u003E The strength of an encryption algorithm is usually measured by the effort required to crack it within a reasonable time frame. \u003C/li\u003E\n\u003C/ol\u003E\n\u003Cp\u003EFor these reasons, as soon as cryptography is included in a project, it is important to choose encryption algorithms that are considered strong and\nsecure by the cryptography community.\u003C/p\u003E\n\u003Cp\u003ETo provide communication security over a network, SSL and TLS are generally used. However, it is important to note that the following protocols are\nall considered weak by the cryptographic community, and are officially deprecated:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E SSL versions 1.0, 2.0 and 3.0 \u003C/li\u003E\n  \u003Cli\u003E TLS versions 1.0 and 1.1 \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EWhen these unsecured protocols are used, it is best practice to expect a breach: that a user or organization with malicious intent will perform\nmathematical attacks on this data after obtaining it by other means.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EAfter retrieving encrypted data and performing cryptographic attacks on it on a given timeframe, attackers can recover the plaintext that\nencryption was supposed to protect.\u003C/p\u003E\n\u003Cp\u003EDepending on the recovered data, the impact may vary.\u003C/p\u003E\n\u003Cp\u003EBelow are some real-world scenarios that illustrate the potential impact of an attacker exploiting the vulnerability.\u003C/p\u003E\n\u003Ch4\u003EAdditional attack surface\u003C/h4\u003E\n\u003Cp\u003EBy modifying the plaintext of the encrypted message, an attacker may be able to trigger additional vulnerabilities in the code. An attacker can\nfurther exploit a system to obtain more information.\u003Cbr\u003E Encrypted values are often considered trustworthy because it would not be possible for a\nthird party to modify them under normal circumstances.\u003C/p\u003E\n\u003Ch4\u003EBreach of confidentiality and privacy\u003C/h4\u003E\n\u003Cp\u003EWhen encrypted data contains personal or sensitive information, its retrieval by an attacker can lead to privacy violations, identity theft,\nfinancial loss, reputational damage, or unauthorized access to confidential systems.\u003C/p\u003E\n\u003Cp\u003EIn this scenario, the company, its employees, users, and partners could be seriously affected.\u003C/p\u003E\n\u003Cp\u003EThe impact is twofold, as data breaches and exposure of encrypted data can undermine trust in the organization, as customers, clients and\nstakeholders may lose confidence in the organization’s ability to protect their sensitive data.\u003C/p\u003E\n\u003Ch4\u003ELegal and compliance issues\u003C/h4\u003E\n\u003Cp\u003EIn many industries and locations, there are legal and compliance requirements to protect sensitive data. If encrypted data is compromised and the\nplaintext can be recovered, companies face legal consequences, penalties, or violations of privacy laws.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EArticles &amp; blog posts\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Padding_oracle_attack"\u003EWikipedia, Padding Oracle Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Chosen-ciphertext_attack"\u003EWikipedia, Chosen-Ciphertext Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Chosen-plaintext_attack"\u003EWikipedia, Chosen-Plaintext Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Semantic_security"\u003EWikipedia, Semantically Secure Cryptosystems\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding"\u003EWikipedia, OAEP\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Galois/Counter_Mode"\u003EWikipedia, Galois/Counter Mode\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/327"\u003ECWE-327 - Use of a Broken or Risky Cryptographic Algorithm\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis vulnerability exposes encrypted data to a number of attacks whose goal is to recover the plaintext.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S2245",
      name: "Using pseudorandom number generators (PRNGs) is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E the code using the generated value requires it to be unpredictable. It is the case for all encryption mechanisms or when a secret value, such\n  as a password, is hashed. \u003C/li\u003E\n  \u003Cli\u003E the function you use generates a value which can be predicted (pseudo-random). \u003C/li\u003E\n  \u003Cli\u003E the generated value is used multiple times. \u003C/li\u003E\n  \u003Cli\u003E an attacker can access the generated value. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Use functions which rely on a cryptographically strong random number generator such as \u003Ccode\u003Erandom_int()\u003C/code\u003E or \u003Ccode\u003Erandom_bytes()\u003C/code\u003E\n  or \u003Ccode\u003Eopenssl_random_pseudo_bytes()\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E When using \u003Ccode\u003Eopenssl_random_pseudo_bytes()\u003C/code\u003E, provide and check the \u003Ccode\u003Ecrypto_strong\u003C/code\u003E parameter \u003C/li\u003E\n  \u003Cli\u003E Use the generated random values only once. \u003C/li\u003E\n  \u003Cli\u003E You should not expose the generated random value. If you have to store it, make sure that the database or file is secure. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n$random = rand();\n$random2 = mt_rand(0, 99);\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\n$randomInt = random_int(0,99); // Compliant; generates a cryptographically secure random integer\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://mobile-security.gitbook.io/masvs/security-requirements/0x08-v3-cryptography_verification_requirements"\u003EMobile AppSec\n  Verification Standard - Cryptography Requirements\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-mobile-top-10/2016-risks/m5-insufficient-cryptography"\u003EMobile Top 10 2016 Category M5 -\n  Insufficient Cryptography\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/338"\u003ECWE-338 - Use of Cryptographically Weak Pseudo-Random Number Generator (PRNG)\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/330"\u003ECWE-330 - Use of Insufficiently Random Values\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/326"\u003ECWE-326 - Inadequate Encryption Strength\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/1241"\u003ECWE-1241 - Use of Predictable Algorithm in Random Number Generator\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rule \u003Ca href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#PREDICTABLE_RANDOM"\u003EPredictable Pseudo Random Number\n  Generator\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EUsing pseudorandom number generators (PRNGs) is security-sensitive. For example, it has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2013-6386"\u003ECVE-2013-6386\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-3419"\u003ECVE-2006-3419\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2008-4102"\u003ECVE-2008-4102\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EWhen software generates predictable values in a context requiring unpredictability, it may be possible for an attacker to guess the next value that\nwill be generated, and use this guess to impersonate another user or access sensitive information.\u003C/p\u003E\n\u003Cp\u003EAs the \u003Ccode\u003Erand()\u003C/code\u003E and \u003Ccode\u003Emt_rand()\u003C/code\u003E functions rely on a pseudorandom number generator, it should not be used for\nsecurity-critical applications or for protecting sensitive data.\u003C/p\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4426",
      name: "Cryptographic keys should be robust",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EHere is an example of a private key generation with RSA:\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n$config = [\n    "digest_alg"       =&gt; "sha512",\n    "private_key_bits" =&gt; 1024,                 // Noncompliant\n    "private_key_type" =&gt; OPENSSL_KEYTYPE_RSA,\n];\n\n$res = openssl_pkey_new($config);\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n$config = [\n    "digest_alg"       =&gt; "sha512",\n    "private_key_bits" =&gt; 2048,\n    "private_key_type" =&gt; OPENSSL_KEYTYPE_RSA,\n];\n\n$res = openssl_pkey_new($config);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAs a rule of thumb, use the cryptographic algorithms and mechanisms that are considered strong by the cryptography community.\u003C/p\u003E\n\u003Cp\u003EThe appropriate choices are the following.\u003C/p\u003E\n\u003Ch4\u003ERSA (Rivest-Shamir-Adleman) and DSA (Digital Signature Algorithm)\u003C/h4\u003E\n\u003Cp\u003EThe security of these algorithms depends on the difficulty of attacks attempting to solve their underlying mathematical problem.\u003C/p\u003E\n\u003Cp\u003EIn general, a minimum key size of \u003Cstrong\u003E2048\u003C/strong\u003E bits is recommended for both. It provides 112 bits of security. A key length of\n\u003Cstrong\u003E3072\u003C/strong\u003E or \u003Cstrong\u003E4092\u003C/strong\u003E should be preferred when possible.\u003C/p\u003E\n\u003Ch4\u003EAES (Advanced Encryption Standard)\u003C/h4\u003E\n\u003Cp\u003EAES supports three key sizes: 128 bits, 192 bits and 256 bits. The security of the AES algorithm is based on the computational complexity of trying\nall possible keys.\u003Cbr\u003E A larger key size increases the number of possible keys and makes exhaustive search attacks computationally infeasible.\nTherefore, a 256-bit key provides a higher level of security than a 128-bit or 192-bit key.\u003C/p\u003E\n\u003Cp\u003ECurrently, a minimum key size of \u003Cstrong\u003E128 bits\u003C/strong\u003E is recommended for AES.\u003C/p\u003E\n\u003Ch4\u003EElliptic Curve Cryptography (ECC)\u003C/h4\u003E\n\u003Cp\u003EElliptic curve cryptography is also used in various algorithms, such as ECDSA, ECDH, or ECMQV. The length of keys generated with elliptic curve\nalgorithms is mentioned directly in their names. For example, \u003Ccode\u003Esecp256k1\u003C/code\u003E generates a 256-bits long private key.\u003C/p\u003E\n\u003Cp\u003ECurrently, a minimum key size of \u003Cstrong\u003E224 bits\u003C/strong\u003E is recommended for EC-based algorithms.\u003C/p\u003E\n\u003Cp\u003EAdditionally, some curves that theoretically provide sufficiently long keys are still discouraged. This can be because of a flaw in the curve\nparameters, a bad overall design, or poor performance. It is generally advised to use a NIST-approved elliptic curve wherever possible. Such curves\ncurrently include:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E NIST P curves with a size of at least 224 bits, e.g. secp256r1. \u003C/li\u003E\n  \u003Cli\u003E Curve25519, generally known as ed25519 or x25519 depending on its application. \u003C/li\u003E\n  \u003Cli\u003E Curve448. \u003C/li\u003E\n  \u003Cli\u003E Brainpool curves with a size of at least 224 bits, e.g. brainpoolP224r1 \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EGoing the extra mile\u003C/h3\u003E\n\u003Ch4\u003EPre-Quantum Cryptography\u003C/h4\u003E\n\u003Cp\u003EEncrypted data and communications recorded today could be decrypted in the future by an attack from a quantum computer.\u003Cbr\u003E It is important to keep\nin mind that NIST-approved digital signature schemes, key agreement, and key transport may need to be replaced with secure quantum-resistant (or\n"post-quantum") counterpart.\u003C/p\u003E\n\u003Cp\u003EThus, if data is to remain secure beyond 2030, proactive measures should be taken now to ensure its safety.\u003C/p\u003E\n\u003Cp\u003E\u003Ca href="https://www.enisa.europa.eu/publications/post-quantum-cryptography-current-state-and-quantum-mitigation"\u003ELearn more here\u003C/a\u003E.\u003C/p\u003E',
          context: {
            displayName: "Core PHP",
            key: "core_php",
          },
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EEncryption algorithms are essential for protecting sensitive information and ensuring secure communications in a variety of domains. They are used\nfor several important reasons:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Confidentiality, privacy, and intellectual property protection \u003C/li\u003E\n  \u003Cli\u003E Security during transmission or on storage devices \u003C/li\u003E\n  \u003Cli\u003E Data integrity, general trust, and authentication \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EWhen selecting encryption algorithms, tools, or combinations, you should also consider two things:\u003C/p\u003E\n\u003Col\u003E\n  \u003Cli\u003E No encryption is unbreakable. \u003C/li\u003E\n  \u003Cli\u003E The strength of an encryption algorithm is usually measured by the effort required to crack it within a reasonable time frame. \u003C/li\u003E\n\u003C/ol\u003E\n\u003Cp\u003EIn today’s cryptography, the length of the \u003Cstrong\u003Ekey\u003C/strong\u003E directly affects the security level of cryptographic algorithms.\u003C/p\u003E\n\u003Cp\u003ENote that depending on the algorithm, the term \u003Cstrong\u003Ekey\u003C/strong\u003E refers to a different mathematical property. For example:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E For RSA, the key is the product of two large prime numbers, also called the \u003Cstrong\u003Emodulus\u003C/strong\u003E. \u003C/li\u003E\n  \u003Cli\u003E For AES and Elliptic Curve Cryptography (ECC), the key is only a sequence of randomly generated bytes.\n    \u003Cul\u003E\n      \u003Cli\u003E In some cases, AES keys are derived from a master key or a passphrase using a Key Derivation Function (KDF) like PBKDF2 (Password-Based Key\n      Derivation Function 2) \u003C/li\u003E\n    \u003C/ul\u003E  \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIf an application uses a key that is considered short and \u003Cstrong\u003Einsecure\u003C/strong\u003E, the encrypted data is exposed to attacks aimed at getting at\nthe plaintext.\u003C/p\u003E\n\u003Cp\u003EIn general, it is best practice to expect a breach: that a user or organization with malicious intent will perform cryptographic attacks on this\ndata after obtaining it by other means.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EAfter retrieving encrypted data and performing cryptographic attacks on it on a given timeframe, attackers can recover the plaintext that\nencryption was supposed to protect.\u003C/p\u003E\n\u003Cp\u003EDepending on the recovered data, the impact may vary.\u003C/p\u003E\n\u003Cp\u003EBelow are some real-world scenarios that illustrate the potential impact of an attacker exploiting the vulnerability.\u003C/p\u003E\n\u003Ch4\u003EAdditional attack surface\u003C/h4\u003E\n\u003Cp\u003EBy modifying the plaintext of the encrypted message, an attacker may be able to trigger additional vulnerabilities in the code. An attacker can\nfurther exploit a system to obtain more information.\u003Cbr\u003E Encrypted values are often considered trustworthy because it would not be possible for a\nthird party to modify them under normal circumstances.\u003C/p\u003E\n\u003Ch4\u003EBreach of confidentiality and privacy\u003C/h4\u003E\n\u003Cp\u003EWhen encrypted data contains personal or sensitive information, its retrieval by an attacker can lead to privacy violations, identity theft,\nfinancial loss, reputational damage, or unauthorized access to confidential systems.\u003C/p\u003E\n\u003Cp\u003EIn this scenario, the company, its employees, users, and partners could be seriously affected.\u003C/p\u003E\n\u003Cp\u003EThe impact is twofold, as data breaches and exposure of encrypted data can undermine trust in the organization, as customers, clients and\nstakeholders may lose confidence in the organization’s ability to protect their sensitive data.\u003C/p\u003E\n\u003Ch4\u003ELegal and compliance issues\u003C/h4\u003E\n\u003Cp\u003EIn many industries and locations, there are legal and compliance requirements to protect sensitive data. If encrypted data is compromised and the\nplaintext can be recovered, companies face legal consequences, penalties, or violations of privacy laws.\u003C/p\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis vulnerability exposes encrypted data to attacks whose goal is to recover the plaintext.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E Documentation\n    \u003Cul\u003E\n      \u003Cli\u003E NIST Documentation - \u003Ca href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-186.pdf"\u003ENIST SP 800-186: Recommendations\n      for Discrete Logarithm-based Cryptography: Elliptic Curve Domain Parameters\u003C/a\u003E \u003C/li\u003E\n      \u003Cli\u003E IETF - \u003Ca href="https://datatracker.ietf.org/doc/html/rfc5639"\u003Erfc5639: Elliptic Curve Cryptography (ECC) Brainpool Standard Curves and\n      Curve Generation\u003C/a\u003E \u003C/li\u003E\n    \u003C/ul\u003E  \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EArticles &amp; blog posts\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://learn.microsoft.com/en-us/dotnet/standard/security/vulnerabilities-cbc-mode"\u003EMicrosoft, Timing vulnerabilities with CBC-mode\n  symmetric decryption using padding\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Padding_oracle_attack"\u003EWikipedia, Padding Oracle Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Chosen-ciphertext_attack"\u003EWikipedia, Chosen-Ciphertext Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Chosen-plaintext_attack"\u003EWikipedia, Chosen-Plaintext Attack\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Semantic_security"\u003EWikipedia, Semantically Secure Cryptosystems\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding"\u003EWikipedia, OAEP\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://en.wikipedia.org/wiki/Galois/Counter_Mode"\u003EWikipedia, Galois/Counter Mode\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://www.owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://mobile-security.gitbook.io/masvs/security-requirements/0x08-v3-cryptography_verification_requirements"\u003EMobile AppSec\n  Verification Standard - Cryptography Requirements\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-mobile-top-10/2016-risks/m5-insufficient-cryptography"\u003EMobile Top 10 2016 Category M5 -\n  Insufficient Cryptography\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar1.pdf"\u003ENIST 800-131A\u003C/a\u003E - Recommendation for Transitioning the\n  Use of Cryptographic Algorithms and Key Lengths \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/326"\u003ECWE-326 - Inadequate Encryption Strength\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/327"\u003ECWE-327 - Use of a Broken or Risky Cryptographic Algorithm\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://wiki.sei.cmu.edu/confluence/x/hDdGBQ"\u003ECERT, MSC61-J.\u003C/a\u003E - Do not use insecure or weak cryptographic algorithms \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S3332",
      name: "Session-management cookies should not be persistent",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)"\u003ETop 10 2017 Category A7 - Cross-Site Scripting\n  (XSS)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#expire-and-max-age-attributes"\u003EOWASP, Session\n  Management Cheat Sheet\u003C/a\u003E - Expire and Max-Age Attributes \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rule \u003Ca href="https://find-sec-bugs.github.io/bugs.htm#COOKIE_PERSISTENT"\u003ECOOKIE_PERSISTENT\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003ECookies without fixed lifetimes or expiration dates are known as non-persistent, or "session" cookies, meaning they last only as long as the\nbrowser session, and poof away when the browser closes. Cookies with expiration dates, "persistent" cookies, are stored/persisted until those\ndates.\u003C/p\u003E\n\u003Cp\u003ENon-persistent cookies should be used for the management of logged-in sessions on web sites. To make a cookie non-persistent, simply omit the\n\u003Ccode\u003Eexpires\u003C/code\u003E attribute.\u003C/p\u003E\n\u003Cp\u003EThis rule raises an issue when \u003Ccode\u003Eexpires\u003C/code\u003E is set for a session cookie, either programmatically or via configuration, such as\n\u003Ccode\u003Esession.cookie_lifetime\u003C/code\u003E.\u003C/p\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S131",
      name: '"switch" statements should have "default" clauses',
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/478"\u003ECWE-478 - Missing Default Case in Switch Statement\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EThe requirement for a final \u003Ccode\u003Ecase default\u003C/code\u003E clause is defensive programming. The clause should either take appropriate action, or contain\na suitable comment as to why no action is taken. Even when the \u003Ccode\u003Eswitch\u003C/code\u003E covers all current values of an \u003Ccode\u003Eenum\u003C/code\u003E, a default case\nshould still be used because there is no guarantee that the \u003Ccode\u003Eenum\u003C/code\u003E won’t be extended.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nswitch ($param) {  //missing default clause\n  case 0:\n    do_something();\n    break;\n  case 1:\n    do_something_else();\n    break;\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\nswitch ($param) {\n  case 0:\n    do_something();\n    break;\n  case 1:\n    do_something_else();\n    break;\n  default:\n    error();\n    break;\n}\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S3330",
      name: 'Creating cookies without the "HttpOnly" flag is security-sensitive',
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E the cookie is sensitive, used to authenticate the user, for instance a \u003Cem\u003Esession-cookie\u003C/em\u003E \u003C/li\u003E\n  \u003Cli\u003E the \u003Ccode\u003EHttpOnly\u003C/code\u003E attribute offer an additional protection (not the case for an \u003Cem\u003EXSRF-TOKEN cookie\u003C/em\u003E / CSRF token for example)\n  \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWhen a cookie is configured with the \u003Ccode\u003EHttpOnly\u003C/code\u003E attribute set to \u003Cem\u003Etrue\u003C/em\u003E, the browser guaranties that no client-side script will\nbe able to read it. In most cases, when a cookie is created, the default value of \u003Ccode\u003EHttpOnly\u003C/code\u003E is \u003Cem\u003Efalse\u003C/em\u003E and it’s up to the developer\nto decide whether or not the content of the cookie can be read by the client-side script. As a majority of Cross-Site Scripting (XSS) attacks target\nthe theft of session-cookies, the \u003Ccode\u003EHttpOnly\u003C/code\u003E attribute can help to reduce their impact as it won’t be possible to exploit the XSS\nvulnerability to steal session-cookies.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E By default the \u003Ccode\u003EHttpOnly\u003C/code\u003E flag should be set to \u003Cem\u003Etrue\u003C/em\u003E for most of the cookies and it’s mandatory for session /\n  sensitive-security cookies. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EIn \u003Cem\u003Ephp.ini\u003C/em\u003E you can specify the flags for the session cookie which is security-sensitive:\u003C/p\u003E\n\u003Cpre\u003E\nsession.cookie_httponly = 0;  // Sensitive: this sensitive session cookie is created with the httponly flag set to false and so it can be stolen easily in case of XSS vulnerability\n\u003C/pre\u003E\n\u003Cp\u003ESame thing in PHP code:\u003C/p\u003E\n\u003Cpre\u003E\nsession_set_cookie_params($lifetime, $path, $domain, true, false);  // Sensitive: this sensitive session cookie is created with the httponly flag (the fifth argument) set to false and so it can be stolen easily in case of XSS vulnerability\n\u003C/pre\u003E\n\u003Cp\u003EIf you create a custom security-sensitive cookie in your PHP code:\u003C/p\u003E\n\u003Cpre\u003E\n$value = "sensitive data";\nsetcookie($name, $value, $expire, $path, $domain, true, false); // Sensitive: this sensitive cookie is created with the httponly flag (the seventh argument) set to false  and so it can be stolen easily in case of XSS vulnerability\n\u003C/pre\u003E\n\u003Cp\u003EBy default \u003Ca href="https://www.php.net/manual/en/function.setcookie.php"\u003E\u003Ccode\u003Esetcookie\u003C/code\u003E\u003C/a\u003E and \u003Ca\nhref="https://www.php.net/manual/en/function.setrawcookie.php"\u003E\u003Ccode\u003Esetrawcookie\u003C/code\u003E\u003C/a\u003E functions set \u003Ccode\u003EhttpOnly\u003C/code\u003E flag to\n\u003Cem\u003Efalse\u003C/em\u003E (the seventh argument) and so cookies can be stolen easily in case of XSS vulnerability:\u003C/p\u003E\n\u003Cpre\u003E\n$value = "sensitive data";\nsetcookie($name, $value, $expire, $path, $domain, true); // Sensitive: a sensitive cookie is created with the httponly flag  (the seventh argument) not defined (by default set to false)\nsetrawcookie($name, $value, $expire, $path, $domain, true); // Sensitive: a sensitive cookie is created with the httponly flag (the seventh argument) not defined  (by default set to false)\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\nsession.cookie_httponly = 1; // Compliant: the sensitive cookie is protected against theft thanks (cookie_httponly=1)\n\u003C/pre\u003E\n\u003Cpre\u003E\nsession_set_cookie_params($lifetime, $path, $domain, true, true); // Compliant: the sensitive cookie is protected against theft thanks to the fifth argument set to true (HttpOnly=true)\n\u003C/pre\u003E\n\u003Cpre\u003E\n$value = "sensitive data";\nsetcookie($name, $value, $expire, $path, $domain, true, true); // Compliant: the sensitive cookie is protected against theft thanks to the seventh argument set to true (HttpOnly=true)\nsetrawcookie($name, $value, $expire, $path, $domain, true, true); // Compliant: the sensitive cookie is protected against theft thanks to the seventh argument set to true (HttpOnly=true)\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://owasp.org/www-community/HttpOnly"\u003EOWASP HttpOnly\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)"\u003ETop 10 2017 Category A7 - Cross-Site Scripting\n  (XSS)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/1004"\u003ECWE-1004 - Sensitive Cookie Without \'HttpOnly\' Flag\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rule \u003Ca href="https://find-sec-bugs.github.io/bugs.htm#HTTPONLY_COOKIE"\u003EHTTPONLY_COOKIE\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4784",
      name: "Using regular expressions is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThis rule is deprecated; use \u003Ca href=\'/organizations/my-org/rules?open=phpsecurity%3AS2631&rule_key=phpsecurity%3AS2631\'\u003ES2631\u003C/a\u003E instead.\u003C/p\u003E\n\u003Cp\u003EUsing regular expressions is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-16021"\u003ECVE-2017-16021\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-13863"\u003ECVE-2018-13863\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-8926"\u003ECVE-2018-8926\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EEvaluating regular expressions against input strings is potentially an extremely CPU-intensive task. Specially crafted regular expressions such as\n\u003Ccode\u003E/(a+)+s/\u003C/code\u003E will take several seconds to evaluate the input string \u003Ccode\u003Eaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabs\u003C/code\u003E. The problem is that with\nevery additional \u003Ccode\u003Ea\u003C/code\u003E character added to the input, the time required to evaluate the regex doubles. However, the equivalent regular\nexpression, \u003Ccode\u003Ea+s\u003C/code\u003E (without grouping) is efficiently evaluated in milliseconds and scales linearly with the input size.\u003C/p\u003E\n\u003Cp\u003EEvaluating such regular expressions opens the door to \u003Ca\nhref="https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS"\u003ERegular expression Denial of Service (ReDoS)\u003C/a\u003E attacks.\nIn the context of a web application, attackers can force the web server to spend all of its resources evaluating regular expressions thereby making\nthe service inaccessible to genuine users.\u003C/p\u003E\n\u003Cp\u003EThis rule flags any execution of a hardcoded regular expression which has at least 3 characters and contains at at least two instances of any of\nthe following characters \u003Ccode\u003E*+{\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003EExample: \u003Ccode\u003E(a+)*\u003C/code\u003E\u003C/p\u003E\n\u003Cp\u003EThe following functions are detected as executing regular expressions:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://php.net/manual/en/book.pcre.php"\u003EPCRE\u003C/a\u003E: Perl style regular expressions: \u003Ca\n  href="http://php.net/manual/en/function.preg-filter.php"\u003Epreg_filter\u003C/a\u003E, \u003Ca href="http://php.net/manual/en/function.preg-grep.php"\u003Epreg_grep\u003C/a\u003E,\n  \u003Ca href="http://php.net/manual/en/function.preg-match-all.php"\u003Epreg_match_all\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.preg-match.php"\u003Epreg_match\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.preg-replace-callback.php"\u003Epreg_replace_callback\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.preg-replace.php"\u003Epreg_replace\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.preg-split.php"\u003Epreg_split\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://php.net/manual/en/book.regex.php"\u003EPOSIX extended\u003C/a\u003E, which are deprecated: \u003Ca\n  href="http://php.net/manual/en/function.ereg-replace.php"\u003Eereg_replace\u003C/a\u003E, \u003Ca href="http://php.net/manual/en/function.ereg.php"\u003Eereg\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.eregi-replace.php"\u003Eeregi_replace\u003C/a\u003E, \u003Ca href="http://php.net/manual/en/function.eregi.php"\u003Eeregi\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.split.php"\u003Esplit\u003C/a\u003E, \u003Ca href="http://php.net/manual/en/function.spliti.php"\u003Espliti\u003C/a\u003E. \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://php.net/manual/en/function.fnmatch.php"\u003Efnmatch\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Any of the multibyte string regular expressions: \u003Ca href="http://php.net/manual/en/function.mb-eregi-replace.php"\u003Emb_eregi_replace\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.mb-ereg-match.php"\u003Emb_ereg_match\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.mb-ereg-replace-callback.php"\u003Emb_ereg_replace_callback\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.mb-ereg-replace.php"\u003Emb_ereg_replace\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.mb-ereg-search-init.php"\u003Emb_ereg_search_init\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.mb-ereg-search-pos.php"\u003Emb_ereg_search_pos\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.mb-ereg-search-regs.php"\u003Emb_ereg_search_regs\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.mb-ereg-search.php"\u003Emb_ereg_search\u003C/a\u003E, \u003Ca href="http://php.net/manual/en/function.mb-ereg.php"\u003Emb_ereg\u003C/a\u003E,\n  \u003Ca href="http://php.net/manual/en/function.mb-eregi-replace.php"\u003Emb_eregi_replace\u003C/a\u003E, \u003Ca\n  href="http://php.net/manual/en/function.mb-eregi.php"\u003Emb_eregi\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ENote that \u003Ccode\u003Eereg*\u003C/code\u003E functions have been removed in PHP 7 and \u003Cstrong\u003EPHP 5 end of life date is the 1st of January 2019. Using PHP 5 is\ndangerous as there will be no security fix\u003C/strong\u003E.\u003C/p\u003E\n\u003Cp\u003EThis rule’s goal is to guide security code reviews.\u003C/p\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EDo not set the constant \u003Ccode\u003Epcre.backtrack_limit\u003C/code\u003E to a high value as it will increase the resource consumption of PCRE functions.\u003C/p\u003E\n\u003Cp\u003ECheck the error codes of PCRE functions via \u003Ccode\u003Epreg_last_error\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003ECheck whether your regular expression engine (the algorithm executing your regular expression) has any known vulnerabilities. Search for\nvulnerability reports mentioning the one engine you’re are using. Do not run vulnerable regular expressions on user input.\u003C/p\u003E\n\u003Cp\u003EUse if possible a library which is not vulnerable to Redos Attacks such as \u003Ca href="https://github.com/google/re2"\u003EGoogle Re2\u003C/a\u003E.\u003C/p\u003E\n\u003Cp\u003ERemember also that a ReDos attack is possible if a user-provided regular expression is executed. This rule won’t detect this kind of injection.\u003C/p\u003E\n\u003Cp\u003EAvoid executing a user input string as a regular expression or use at least \u003Ccode\u003Epreg_quote\u003C/code\u003E to escape regular expression characters.\u003C/p\u003E\n\u003Ch2\u003EExceptions\u003C/h2\u003E\n\u003Cp\u003EAn issue will be created for the functions \u003Ccode\u003Emb_ereg_search_pos\u003C/code\u003E, \u003Ccode\u003Emb_ereg_search_regs\u003C/code\u003E and \u003Ccode\u003Emb_ereg_search\u003C/code\u003E if and\nonly if at least the first argument, i.e. the $pattern, is provided.\u003C/p\u003E\n\u003Cp\u003EThe current implementation does not follow variables. It will only detect regular expressions hard-coded directly in the function call.\u003C/p\u003E\n\u003Cpre\u003E\n$pattern = "/(a+)+/";\n$result = eregi($pattern, $input);  // No issue will be raised even if it is Sensitive\n\u003C/pre\u003E\n\u003Cp\u003ESome corner-case regular expressions will not raise an issue even though they might be vulnerable. For example: \u003Ccode\u003E(a|aa)+\u003C/code\u003E,\n\u003Ccode\u003E(a|a?)+\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003EIt is a good idea to test your regular expression if it has the same pattern on both side of a "\u003Ccode\u003E|\u003C/code\u003E".\u003C/p\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A1_2017-Injection"\u003ETop 10 2017 Category A1 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS"\u003ECWE-624 - Executable Regular Expression\n  Error\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP Regular expression Denial of Service - ReDoS \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E the executed regular expression is sensitive and a user can provide a string which will be analyzed by this regular expression. \u003C/li\u003E\n  \u003Cli\u003E your regular expression engine performance decrease with specially crafted inputs and regular expressions. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S3331",
      name: 'Creating cookies with broadly defined "domain" flags is security-sensitive',
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E the \u003Ccode\u003Edomain\u003C/code\u003E attribute has only one level as domain naming. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EYou are at risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EA cookie’s domain specifies which websites should be able to read it. Left blank, browsers are supposed to only send the cookie to sites that\nexactly match the sending domain. For example, if a cookie was set by \u003Cem\u003Elovely.dream.com\u003C/em\u003E, it should only be readable by that domain, and not by\n\u003Cem\u003Enightmare.com\u003C/em\u003E or even \u003Cem\u003Estrange.dream.com\u003C/em\u003E. If you want to allow sub-domain access for a cookie, you can specify it by adding a dot in\nfront of the cookie’s domain, like so: \u003Cem\u003E.dream.com\u003C/em\u003E. But cookie domains should always use at least two levels.\u003C/p\u003E\n\u003Cp\u003ECookie domains can be set either programmatically or via configuration. This rule raises an issue when any cookie domain is set with a single\nlevel, as in \u003Cem\u003E.com\u003C/em\u003E.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E You should check the \u003Ccode\u003Edomain\u003C/code\u003E attribute has been set and its value has more than one level of domain nanimg, like:\n  \u003Cem\u003Esonarsource.com\u003C/em\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\nsetcookie("TestCookie", $value, time()+3600, "/~path/", ".com", 1); // Noncompliant\nsession_set_cookie_params(3600, "/~path/", ".com"); // Noncompliant\n\n// inside php.ini\nsession.cookie_domain=".com"; // Noncompliant\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\nsetcookie("TestCookie", $value, time()+3600, "/~path/", ".myDomain.com", 1);\nsession_set_cookie_params(3600, "/~path/", ".myDomain.com");\n\n// inside php.ini\nsession.cookie_domain=".myDomain.com";\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S3338",
      name: '"file_uploads" should be disabled',
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/434"\u003ECWE-434 - Unrestricted Upload of File with Dangerous Type\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003E\u003Ccode\u003Efile_uploads\u003C/code\u003E is an on-by-default PHP configuration that allows files to be uploaded to your site. Since accepting \u003Cspan\u003Ecandy\u003C/span\u003E\nfiles from strangers is inherently dangerous, this feature should be disabled unless it is absolutely necessary for your site.\u003C/p\u003E\n\u003Cp\u003EThis rule raises an issue when \u003Ccode\u003Efile_uploads\u003C/code\u003E is not explicitly disabled.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\n; php.ini\nfile_uploads=1  ; Noncompliant\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\n; php.ini\nfile_uploads=0\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S128",
      name: 'Switch cases should end with an unconditional "break" statement',
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/484"\u003ECWE-484 - Omitted Break Statement in Switch\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWhen the execution is not explicitly terminated at the end of a switch case, it continues to execute the statements of the following case. While\nthis is sometimes intentional, it often is a mistake which leads to unexpected behavior.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nswitch ($myVariable) {\n  case 1:\n    foo();\n    break;\n  case 2:  // Both 'doSomething()' and 'doSomethingElse()' will be executed. Is it on purpose ?\n    do_something();\n  default:\n    do_something_else();\n   break;\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\nswitch ($myVariable) {\n  case 1:\n    foo();\n    break;\n  case 2:\n    do_something();\n    break;\n  default:\n    do_something_else();\n   break;\n}\n\u003C/pre\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003EThis rule is relaxed in following cases:\u003C/p\u003E\n\u003Cpre\u003E\nswitch ($myVariable) {\n  case 0:                  // Empty case used to specify the same behavior for a group of cases.\n  case 1:\n    do_something();\n    break;\n  case 2:                  // Use of continue statement\n    continue;\n  case 3:                  // Case includes a jump statement (exit, return, break &amp;etc)\n    exit(0);\n  case 4:\n    echo 'Second case, which falls through';\n    // no break        &lt;- comment is used when fall-through is intentional in a non-empty case body\n  default:                 // For the last case, use of break statement is optional\n    doSomethingElse();\n}\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S2255",
      name: "Writing cookies is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003ECookies should only be used to manage the user session. The best practice is to keep all user-related information server-side and link them to the\nuser session, never sending them to the client. In a very few corner cases, cookies can be used for non-sensitive information that need to live longer\nthan the user session.\u003C/p\u003E\n\u003Cp\u003EDo not try to encode sensitive information in a non human-readable format before writing them in a cookie. The encoding can be reverted and the\noriginal information will be exposed.\u003C/p\u003E\n\u003Cp\u003EUsing cookies only for session IDs doesn’t make them secure. Follow \u003Ca\nhref="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#cookies"\u003EOWASP best practices\u003C/a\u003E when you configure your\ncookies.\u003C/p\u003E\n\u003Cp\u003EAs a side note, every information read from a cookie should be \u003Ca\nhref="https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet"\u003ESanitized\u003C/a\u003E.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n$value = "1234 1234 1234 1234";\n\n// Review this cookie as it seems to send sensitive information (credit card number).\nsetcookie("CreditCardNumber", $value, $expire, $path, $domain, true, true); // Sensitive\nsetrawcookie("CreditCardNumber", $value, $expire, $path, $domain, true, true); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/312"\u003ECWE-312 - Cleartext Storage of Sensitive Information\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/315"\u003ECWE-315 - Cleartext Storage of Sensitive Information in a Cookie\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rule \u003Ca href="https://find-sec-bugs.github.io/bugs.htm#COOKIE_USAGE"\u003ECOOKIE_USAGE\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EUsing cookies is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11639"\u003ECVE-2018-11639\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-6537"\u003ECVE-2016-6537\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EAttackers can use widely-available tools to read cookies. Any sensitive information they may contain will be exposed.\u003C/p\u003E\n\u003Cp\u003EThis rule flags code that writes cookies.\u003C/p\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E sensitive information is stored inside the cookie. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EYou are at risk if you answered yes to this question.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4433",
      name: "LDAP connections should be authenticated",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWhen configured to accept the Anonymous or Unauthenticated authentication mechanism, an LDAP server will accept connections from clients that do\nnot provide a password or other authentication credentials. Such users will be able to read or modify part or all of the data contained in the hosted\ndirectory.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EAn attacker exploiting unauthenticated access to an LDAP server can access the data that is stored in the corresponding directory. The impact\nvaries depending on the permission obtained on the directory and the type of data it stores.\u003C/p\u003E\n\u003Ch4\u003EAuthentication bypass\u003C/h4\u003E\n\u003Cp\u003EIf attackers get write access to the directory, they will be able to alter most of the data it stores. This might include sensitive technical data\nsuch as user passwords or asset configurations. Such an attack can typically lead to an authentication bypass on applications and systems that use the\naffected directory as an identity provider.\u003C/p\u003E\n\u003Cp\u003EIn such a case, all users configured in the directory might see their identity and privileges taken over.\u003C/p\u003E\n\u003Ch4\u003ESensitive information leak\u003C/h4\u003E\n\u003Cp\u003EIf attackers get read-only access to the directory, they will be able to read the data it stores. That data might include security-sensitive pieces\nof information.\u003C/p\u003E\n\u003Cp\u003ETypically, attackers might get access to user account lists that they can use in further intrusion steps. For example, they could use such lists to\nperform password spraying, or related attacks, on all systems that rely on the affected directory as an identity provider.\u003C/p\u003E\n\u003Cp\u003EIf the directory contains some Personally Identifiable Information, an attacker accessing it might represent a violation of regulatory requirements\nin some countries. For example, this kind of security event would go against the European GDPR law.\u003C/p\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003ELightweight Directory Access Protocol (LDAP) servers provide two main authentication methods: the \u003Cem\u003ESASL\u003C/em\u003E and \u003Cem\u003ESimple\u003C/em\u003E ones. The\n\u003Cem\u003ESimple Authentication\u003C/em\u003E method also breaks down into three different mechanisms:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Cem\u003EAnonymous\u003C/em\u003E Authentication \u003C/li\u003E\n  \u003Cli\u003E \u003Cem\u003EUnauthenticated\u003C/em\u003E Authentication \u003C/li\u003E\n  \u003Cli\u003E \u003Cem\u003EName/Password\u003C/em\u003E Authentication \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EA server that accepts either the \u003Cem\u003EAnonymous\u003C/em\u003E or \u003Cem\u003EUnauthenticated\u003C/em\u003E mechanisms will accept connections from clients not providing\ncredentials.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code indicates an anonymous LDAP authentication vulnerability because it binds to a remote server using an Anonymous Simple\nauthentication mechanism.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n$ldapconn = ldap_connect("ldap.example.com");\n\nif ($ldapconn) {\n    $ldapbind = ldap_bind($ldapconn); // Noncompliant\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n$ldaprdn  = \'uname\';\n$ldappass = \'password\';\n\n$ldapconn = ldap_connect("ldap.example.com");\n\nif ($ldapconn) {\n    $ldapbind = ldap_bind($ldapconn, $ldaprdn, $ldappass); // Compliant\n}\n\u003C/pre\u003E',
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://datatracker.ietf.org/doc/html/rfc4513#section-5"\u003ERFC 4513 - Lightweight Directory Access Protocol (LDAP): Authentication\n  Methods and Security Mechanisms\u003C/a\u003E - Bind operations \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication"\u003ETop 10 2017 Category A2 - Broken Authentication\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/521"\u003ECWE-521 - Weak Password Requirements\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S5527",
      name: "Server hostnames should be verified during SSL/TLS connections",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://mobile-security.gitbook.io/masvs/security-requirements/0x10-v5-network_communication_requirements"\u003EMobile AppSec\n  Verification Standard - Network Communication Requirements\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-mobile-top-10/2016-risks/m3-insecure-communication"\u003EMobile Top 10 2016 Category M3 - Insecure\n  Communication\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/297"\u003ECWE-297 - Improper Validation of Certificate with Host Mismatch\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis vulnerability allows attackers to impersonate a trusted host.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code contains examples of disabled hostname validation.\u003C/p\u003E\n\u003Cp\u003EThe hostname validation gets disabled by setting \u003Ccode\u003ECURLOPT_SSL_VERIFYHOST\u003C/code\u003E to \u003Ccode\u003E0 or false\u003C/code\u003E. To enable validation set the value\nto \u003Ccode\u003E2 or true\u003C/code\u003E or do not set \u003Ccode\u003ECURLOPT_SSL_VERIFYHOST\u003C/code\u003E at all to use the secure default value.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n$curl = curl_init();\ncurl_setopt($curl, CURLOPT_URL, \'https://example.com/\');\ncurl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);  // Noncompliant\ncurl_exec($curl);\ncurl_close($curl);\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n$curl = curl_init();\ncurl_setopt($curl, CURLOPT_URL, \'https://example.com/\');\ncurl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);\ncurl_exec($curl);\ncurl_close($curl);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003ETo fix the vulnerability of disabled hostname validation, it is strongly recommended to first re-enable the default validation and fix the root\ncause: the validity of the certificate.\u003C/p\u003E\n\u003Ch4\u003EUse valid certificates\u003C/h4\u003E\n\u003Cp\u003EIf a hostname validation failure prevents connecting to the target server, keep in mind that \u003Cstrong\u003Eone system’s code should not work around\nanother system’s problems\u003C/strong\u003E, as this creates unnecessary dependencies and can lead to reliability issues.\u003C/p\u003E\n\u003Cp\u003ETherefore, the first solution is to change the remote host’s certificate to match its identity. If the remote host is not under your control,\nconsider replicating its service to a server whose certificate you can change yourself.\u003C/p\u003E\n\u003Cp\u003EIn case the contacted host is located on a development machine, and if there is no other choice, try following this solution:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Create a self-signed certificate for that machine. \u003C/li\u003E\n  \u003Cli\u003E Add this self-signed certificate to the system’s trust store. \u003C/li\u003E\n  \u003Cli\u003E If the hostname is not \u003Ccode\u003Elocalhost\u003C/code\u003E, add the hostname in the \u003Ccode\u003E/etc/hosts\u003C/code\u003E file. \u003C/li\u003E\n\u003C/ul\u003E',
          context: {
            displayName: "cURL",
            key: "curl",
          },
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ETransport Layer Security (TLS) provides secure communication between systems over the internet by encrypting the data sent between them. In this\nprocess, the role of hostname validation, combined with certificate validation, is to ensure that a system is indeed the one it claims to be, adding\nan extra layer of trust and security.\u003C/p\u003E\n\u003Cp\u003EWhen hostname validation is disabled, the client skips this critical check. This creates an opportunity for attackers to pose as a trusted entity\nand intercept, manipulate, or steal the data being transmitted.\u003C/p\u003E\n\u003Cp\u003ETo do so, an attacker would obtain a valid certificate authenticating \u003Ccode\u003Eexample.com\u003C/code\u003E, serve it using a different hostname, and the\napplication code would still accept it.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EEstablishing trust in a secure way is a non-trivial task. When you disable hostname validation, you are removing a key mechanism designed to build\nthis trust in internet communication, opening your system up to a number of potential threats.\u003C/p\u003E\n\u003Ch4\u003EIdentity spoofing\u003C/h4\u003E\n\u003Cp\u003EIf a system does not validate hostnames, it cannot confirm the identity of the other party involved in the communication. An attacker can exploit\nthis by creating a fake server and masquerading it as a legitimate one. For example, they might set up a server that looks like your bank’s server,\ntricking your system into thinking it is communicating with the bank. This scenario, called identity spoofing, allows the attacker to collect any data\nyour system sends to them, potentially leading to significant data breaches.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S4790",
      name: "Using weak hashing algorithms is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003ESafer alternatives, such as \u003Ccode\u003ESHA-256\u003C/code\u003E, \u003Ccode\u003ESHA-512\u003C/code\u003E, \u003Ccode\u003ESHA-3\u003C/code\u003E are recommended, and for password hashing, it’s even\nbetter to use algorithms that do not compute too "quickly", like \u003Ccode\u003Ebcrypt\u003C/code\u003E, \u003Ccode\u003Escrypt\u003C/code\u003E, \u003Ccode\u003Eargon2\u003C/code\u003E or \u003Ccode\u003Epbkdf2\u003C/code\u003E\nbecause it slows down \u003Ccode\u003Ebrute force attacks\u003C/code\u003E.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n$hash = md5($data); // Sensitive\n$hash = sha1($data);   // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\n// for a password\n$hash = password_hash($password, PASSWORD_BCRYPT); // Compliant\n\n// other context\n$hash = hash("sha512", $data);\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://mobile-security.gitbook.io/masvs/security-requirements/0x08-v3-cryptography_verification_requirements"\u003EMobile AppSec\n  Verification Standard - Cryptography Requirements\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-mobile-top-10/2016-risks/m5-insufficient-cryptography"\u003EMobile Top 10 2016 Category M5 -\n  Insufficient Cryptography\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/1240"\u003ECWE-1240 - Use of a Risky Cryptographic Primitive\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ECryptographic hash algorithms such as \u003Ccode\u003EMD2\u003C/code\u003E, \u003Ccode\u003EMD4\u003C/code\u003E, \u003Ccode\u003EMD5\u003C/code\u003E, \u003Ccode\u003EMD6\u003C/code\u003E, \u003Ccode\u003EHAVAL-128\u003C/code\u003E,\n\u003Ccode\u003EHMAC-MD5\u003C/code\u003E, \u003Ccode\u003EDSA\u003C/code\u003E (which uses \u003Ccode\u003ESHA-1\u003C/code\u003E), \u003Ccode\u003ERIPEMD\u003C/code\u003E, \u003Ccode\u003ERIPEMD-128\u003C/code\u003E, \u003Ccode\u003ERIPEMD-160\u003C/code\u003E,\n\u003Ccode\u003EHMACRIPEMD160\u003C/code\u003E and \u003Ccode\u003ESHA-1\u003C/code\u003E are no longer considered secure, because it is possible to have \u003Ccode\u003Ecollisions\u003C/code\u003E (little\ncomputational effort is enough to find two or more different inputs that produce the same hash).\u003C/p\u003E",
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cp\u003EThe hashed value is used in a security context like:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E User-password storage. \u003C/li\u003E\n  \u003Cli\u003E Security token generation (used to confirm e-mail when registering on a website, reset password, etc …​). \u003C/li\u003E\n  \u003Cli\u003E To compute some message integrity. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4792",
      name: "Configuring loggers is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Check that your production deployment doesn’t have its loggers in \"debug\" mode as it might write sensitive information in logs. \u003C/li\u003E\n  \u003Cli\u003E Production logs should be stored in a secure location which is only accessible to system administrators. \u003C/li\u003E\n  \u003Cli\u003E Configure the loggers to display all warnings, info and error messages. Write relevant information such as the precise time of events and the\n  hostname. \u003C/li\u003E\n  \u003Cli\u003E Choose log format which is easy to parse and process automatically. It is important to process logs rapidly in case of an attack so that the\n  impact is known and limited. \u003C/li\u003E\n  \u003Cli\u003E Check that the permissions of the log files are correct. If you index the logs in some other service, make sure that the transfer and the\n  service are secure too. \u003C/li\u003E\n  \u003Cli\u003E Add limits to the size of the logs and make sure that no user can fill the disk with logs. This can happen even when the user does not control\n  the logged information. An attacker could just repeat a logged action many times. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ERemember that configuring loggers properly doesn’t make them bullet-proof. Here is a list of recommendations explaining on how to use your\nlogs:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Don’t log any sensitive information. This obviously includes passwords and credit card numbers but also any personal information such as user\n  names, locations, etc…​ Usually any information which is protected by law is good candidate for removal. \u003C/li\u003E\n  \u003Cli\u003E Sanitize all user inputs before writing them in the logs. This includes checking its size, content, encoding, syntax, etc…​ As for any user\n  input, validate using whitelists whenever possible. Enabling users to write what they want in your logs can have many impacts. It could for example\n  use all your storage space or compromise your log indexing service. \u003C/li\u003E\n  \u003Cli\u003E Log enough information to monitor suspicious activities and evaluate the impact an attacker might have on your systems. Register events such as\n  failed logins, successful logins, server side input validation failures, access denials and any important transaction. \u003C/li\u003E\n  \u003Cli\u003E Monitor the logs for any suspicious activity. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EBasic PHP configuration:\u003C/p\u003E\n\u003Cpre\u003E\nfunction configure_logging() {\n  error_reporting(E_RECOVERABLE_ERROR); // Sensitive\n  error_reporting(32); // Sensitive\n\n  ini_set('docref_root', '1'); // Sensitive\n  ini_set('display_errors', '1'); // Sensitive\n  ini_set('display_startup_errors', '1'); // Sensitive\n  ini_set('error_log', \"path/to/logfile\"); // Sensitive - check logfile is secure\n  ini_set('error_reporting', E_PARSE ); // Sensitive\n  ini_set('error_reporting', 64); // Sensitive\n  ini_set('log_errors', '0'); // Sensitive\n  ini_set('log_errors_max_length', '512'); // Sensitive\n  ini_set('ignore_repeated_errors', '1'); // Sensitive\n  ini_set('ignore_repeated_source', '1'); // Sensitive\n  ini_set('track_errors', '0'); // Sensitive\n\n  ini_alter('docref_root', '1'); // Sensitive\n  ini_alter('display_errors', '1'); // Sensitive\n  ini_alter('display_startup_errors', '1'); // Sensitive\n  ini_alter('error_log', \"path/to/logfile\"); // Sensitive - check logfile is secure\n  ini_alter('error_reporting', E_PARSE ); // Sensitive\n  ini_alter('error_reporting', 64); // Sensitive\n  ini_alter('log_errors', '0'); // Sensitive\n  ini_alter('log_errors_max_length', '512'); // Sensitive\n  ini_alter('ignore_repeated_errors', '1'); // Sensitive\n  ini_alter('ignore_repeated_source', '1'); // Sensitive\n  ini_alter('track_errors', '0'); // Sensitive\n}\n\u003C/pre\u003E\n\u003Cp\u003EDefinition of custom loggers with \u003Ccode\u003Epsr/log\u003C/code\u003E\u003C/p\u003E\n\u003Cpre\u003E\nabstract class MyLogger implements \\Psr\\Log\\LoggerInterface { // Sensitive\n    // ...\n}\n\nabstract class MyLogger2 extends \\Psr\\Log\\AbstractLogger { // Sensitive\n    // ...\n}\n\nabstract class MyLogger3 {\n    use \\Psr\\Log\\LoggerTrait; // Sensitive\n    // ...\n}\n\u003C/pre\u003E\n\u003Ch2\u003EExceptions\u003C/h2\u003E\n\u003Cp\u003ENo issue will be raised for logger configuration when it follows \u003Ca href=\"https://www.loggly.com/ultimate-guide/php-logging-basics/\"\u003Erecommended\nsettings\u003C/a\u003E for production servers. The following examples are all valid:\u003C/p\u003E\n\u003Cpre\u003E\n  ini_set('docref_root', '0');\n  ini_set('display_errors', '0');\n  ini_set('display_startup_errors', '0');\n\n  error_reporting(0);\n  ini_set('error_reporting', 0);\n\n  ini_set('log_errors', '1');\n  ini_set('log_errors_max_length', '0');\n  ini_set('ignore_repeated_errors', '0');\n  ini_set('ignore_repeated_source', '0');\n  ini_set('track_errors', '1');\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/\"\u003ETop 10 2021 Category A9 - Security Logging and\n  Monitoring Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure\"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A10_2017-Insufficient_Logging%2526Monitoring\"\u003ETop 10 2017 Category A10 -\n  Insufficient Logging &amp; Monitoring\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/117\"\u003ECWE-117 - Improper Output Neutralization for Logs\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/532\"\u003ECWE-532 - Information Exposure Through Log Files\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EConfiguring loggers is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-0285"\u003ECVE-2018-0285\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2000-1127"\u003ECVE-2000-1127\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-15113"\u003ECVE-2017-15113\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-5742"\u003ECVE-2015-5742\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ELogs are useful before, during and after a security incident.\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Attackers will most of the time start their nefarious work by probing the system for vulnerabilities. Monitoring this activity and stopping it\n  is the first step to prevent an attack from ever happening. \u003C/li\u003E\n  \u003Cli\u003E In case of a successful attack, logs should contain enough information to understand what damage an attacker may have inflicted. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ELogs are also a target for attackers because they might contain sensitive information. Configuring loggers has an impact on the type of information\nlogged and how they are logged.\u003C/p\u003E\n\u003Cp\u003EThis rule flags for review code that initiates loggers configuration. The goal is to guide security code reviews.\u003C/p\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E unauthorized users might have access to the logs, either because they are stored in an insecure location or because the application gives\n  access to them. \u003C/li\u003E\n  \u003Cli\u003E the logs contain sensitive information on a production server. This can happen when the logger is in debug mode. \u003C/li\u003E\n  \u003Cli\u003E the log can grow without limit. This can happen when additional information is written into logs every time a user performs an action and the\n  user can perform the action as many times as he/she wants. \u003C/li\u003E\n  \u003Cli\u003E the logs do not contain enough information to understand the damage an attacker might have inflicted. The loggers mode (info, warn, error)\n  might filter out important information. They might not print contextual information like the precise time of events or the server hostname. \u003C/li\u003E\n  \u003Cli\u003E the logs are only stored locally instead of being backuped or replicated. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S930",
      name: "The number of arguments passed to a function should match the number of parameters",
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ECalling a function or a method with fewer or more arguments than expected will raise a TypeError. This is usually a bug and should be fixed.\u003C/p\u003E\n\u003Cp\u003EProvide missing arguments to the call, or define default values if there are fewer arguments.\u003C/p\u003E\n\u003Cp\u003EReduce the number of arguments provided by the function call, or add more parameter if there are more arguments than expected.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nfunction myFunction($a, $b, $c = null) {\n  //...\n}\n\nmyFunction($a); // Noncompliant - 2 arguments are required\n\u003C/pre\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003ENo issue is reported when arguments are used in the body of the function being called.\u003C/p\u003E\n\u003Cpre\u003E\nfunction myFunction() {\n  $arg_list = func_get_args();\n  //...\n}\n\nmyFunction($a, $b);\n\u003C/pre\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/628"\u003ECWE-628 - Function Call with Incorrectly Specified Arguments\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S2068",
      name: "Hard-coded credentials are security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Credentials allow access to a sensitive component like a database, a file storage, an API or a service. \u003C/li\u003E\n  \u003Cli\u003E Credentials are used in production environments. \u003C/li\u003E\n  \u003Cli\u003E Application re-distribution is required before updating the credentials. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Store the credentials in a configuration file that is not pushed to the code repository. \u003C/li\u003E\n  \u003Cli\u003E Store the credentials in a database. \u003C/li\u003E\n  \u003Cli\u003E Use your cloud provider’s service for managing secrets. \u003C/li\u003E\n  \u003Cli\u003E If a password has been disclosed through the source code: change it. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n$password = "65DBGgwe4uazdWQA"; // Sensitive\n\n$httpUrl = "https://example.domain?user=user&amp;password=65DBGgwe4uazdWQA" // Sensitive\n$sshUrl = "ssh://user:65DBGgwe4uazdWQA@example.domain" // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\n$user = getUser();\n$password = getPassword(); // Compliant\n\n$httpUrl = "https://example.domain?user=$user&amp;password=$password" // Compliant\n$sshUrl = "ssh://$user:$password@example.domain" // Compliant\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication"\u003ETop 10 2017 Category A2 - Broken Authentication\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/798"\u003ECWE-798 - Use of Hard-coded Credentials\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/259"\u003ECWE-259 - Use of Hard-coded Password\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rule \u003Ca href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#HARD_CODE_PASSWORD"\u003EHard Coded Password\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EBecause it is easy to extract strings from an application source code or binary, credentials should not be hard-coded. This is particularly true\nfor applications that are distributed or that are open-source.\u003C/p\u003E\n\u003Cp\u003EIn the past, it has led to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13466"\u003ECVE-2019-13466\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15389"\u003ECVE-2018-15389\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ECredentials should be stored outside of the code in a configuration file, a database, or a management service for secrets.\u003C/p\u003E\n\u003Cp\u003EThis rule flags instances of hard-coded credentials used in database and LDAP connections. It looks for hard-coded credentials in connection\nstrings, and for variable names that match any of the patterns from the provided list.\u003C/p\u003E\n\u003Cp\u003EIt’s recommended to customize the configuration of this rule with additional credential words such as "oauthToken", "secret", …​\u003C/p\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S5332",
      name: "Using clear-text protocols is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EClear-text protocols such as \u003Ccode\u003Eftp\u003C/code\u003E, \u003Ccode\u003Etelnet\u003C/code\u003E, or \u003Ccode\u003Ehttp\u003C/code\u003E lack encryption of transported data, as well as the\ncapability to build an authenticated connection. It means that an attacker able to sniff traffic from the network can read, modify, or corrupt the\ntransported content. These protocols are not secure as they expose applications to an extensive range of risks:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E sensitive data exposure \u003C/li\u003E\n  \u003Cli\u003E traffic redirected to a malicious endpoint \u003C/li\u003E\n  \u003Cli\u003E malware-infected software update or installer \u003C/li\u003E\n  \u003Cli\u003E execution of client-side code \u003C/li\u003E\n  \u003Cli\u003E corruption of critical information \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EEven in the context of isolated networks like offline environments or segmented cloud environments, the insider threat exists. Thus, attacks\ninvolving communications being sniffed or tampered with can still happen.\u003C/p\u003E\n\u003Cp\u003EFor example, attackers could successfully compromise prior security layers by:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E bypassing isolation mechanisms \u003C/li\u003E\n  \u003Cli\u003E compromising a component of the network \u003C/li\u003E\n  \u003Cli\u003E getting the credentials of an internal IAM account (either from a service account or an actual person) \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIn such cases, encrypting communications would decrease the chances of attackers to successfully leak data or steal credentials from other network\ncomponents. By layering various security practices (segmentation and encryption, for example), the application will follow the\n\u003Cem\u003Edefense-in-depth\u003C/em\u003E principle.\u003C/p\u003E\n\u003Cp\u003ENote that using the \u003Ccode\u003Ehttp\u003C/code\u003E protocol is being deprecated by \u003Ca\nhref="https://blog.mozilla.org/security/2015/04/30/deprecating-non-secure-http"\u003Emajor web browsers\u003C/a\u003E.\u003C/p\u003E\n\u003Cp\u003EIn the past, it has led to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://nvd.nist.gov/vuln/detail/CVE-2019-6169"\u003ECVE-2019-6169\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://nvd.nist.gov/vuln/detail/CVE-2019-12327"\u003ECVE-2019-12327\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://nvd.nist.gov/vuln/detail/CVE-2019-11065"\u003ECVE-2019-11065\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Application data needs to be protected against falsifications or leaks when transiting over the network. \u003C/li\u003E\n  \u003Cli\u003E Application data transits over an untrusted network. \u003C/li\u003E\n  \u003Cli\u003E Compliance rules require the service to encrypt data in transit. \u003C/li\u003E\n  \u003Cli\u003E Your application renders web pages with a relaxed mixed content policy. \u003C/li\u003E\n  \u003Cli\u003E OS-level protections against clear-text traffic are deactivated. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Make application data transit over a secure, authenticated and encrypted protocol like TLS or SSH. Here are a few alternatives to the most\n  common clear-text protocols:\n    \u003Cul\u003E\n      \u003Cli\u003E Use \u003Ccode\u003Essh\u003C/code\u003E as an alternative to \u003Ccode\u003Etelnet\u003C/code\u003E. \u003C/li\u003E\n      \u003Cli\u003E Use \u003Ccode\u003Esftp\u003C/code\u003E, \u003Ccode\u003Escp\u003C/code\u003E, or \u003Ccode\u003Eftps\u003C/code\u003E instead of \u003Ccode\u003Eftp\u003C/code\u003E. \u003C/li\u003E\n      \u003Cli\u003E Use \u003Ccode\u003Ehttps\u003C/code\u003E instead of \u003Ccode\u003Ehttp\u003C/code\u003E. \u003C/li\u003E\n      \u003Cli\u003E Use \u003Ccode\u003ESMTP\u003C/code\u003E over \u003Ccode\u003ESSL/TLS\u003C/code\u003E or \u003Ccode\u003ESMTP\u003C/code\u003E with \u003Ccode\u003ESTARTTLS\u003C/code\u003E instead of clear-text SMTP. \u003C/li\u003E\n    \u003C/ul\u003E  \u003C/li\u003E\n  \u003Cli\u003E Enable encryption of cloud components communications whenever it is possible. \u003C/li\u003E\n  \u003Cli\u003E Configure your application to block mixed content when rendering web pages. \u003C/li\u003E\n  \u003Cli\u003E If available, enforce OS-level deactivation of all clear-text traffic. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIt is recommended to secure all transport channels, even on local networks, as it can take a single non-secure connection to compromise an entire\napplication or system.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n$url = "http://example.com"; // Sensitive\n$url = "ftp://anonymous@example.com"; // Sensitive\n$url = "telnet://anonymous@example.com"; // Sensitive\n\n$con = ftp_connect(\'example.com\'); // Sensitive\n\n$trans = (new Swift_SmtpTransport(\'XXX\', 1234)); // Sensitive\n\n$mailer = new PHPMailer(true); // Sensitive\n\ndefine( \'FORCE_SSL_ADMIN\', false); // Sensitive\ndefine( \'FORCE_SSL_LOGIN\', false); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\n$url = "https://example.com";\n$url = "sftp://anonymous@example.com";\n$url = "ssh://anonymous@example.com";\n\n$con = ftp_ssl_connect(\'example.com\');\n\n$trans = (new Swift_SmtpTransport(\'smtp.example.org\', 1234))\n  -&gt;setEncryption(\'tls\')\n;\n\n$mailer = new PHPMailer(true);\n$mailer-&gt;SMTPSecure = \'tls\';\n\ndefine( \'FORCE_SSL_ADMIN\', true);\ndefine( \'FORCE_SSL_LOGIN\', true);\n\u003C/pre\u003E\n\u003Ch2\u003EExceptions\u003C/h2\u003E\n\u003Cp\u003ENo issue is reported for the following cases because they are not considered sensitive:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Insecure protocol scheme followed by loopback addresses like 127.0.0.1 or \u003Ccode\u003Elocalhost\u003C/code\u003E. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data Exposure\n  \u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://mobile-security.gitbook.io/masvs/security-requirements/0x10-v5-network_communication_requirements"\u003EMobile AppSec\n  Verification Standard - Network Communication Requirements\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-mobile-top-10/2016-risks/m3-insecure-communication"\u003EMobile Top 10 2016 Category M3 - Insecure\n  Communication\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/200"\u003ECWE-200 - Exposure of Sensitive Information to an Unauthorized Actor\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/319"\u003ECWE-319 - Cleartext Transmission of Sensitive Information\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html"\u003EGoogle, Moving towards more secure web\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://blog.mozilla.org/security/2015/04/30/deprecating-non-secure-http/"\u003EMozilla, Deprecating non secure http\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html"\u003EAWS Documentation\u003C/a\u003E - Listeners\n  for your Application Load Balancers \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesis-stream-streamencryption.html"\u003EAWS\n  Documentation\u003C/a\u003E - Stream Encryption \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S112",
      name: "Generic exceptions ErrorException, RuntimeException and Exception should not be thrown",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule raises an issue when a generic exception (such as \u003Ccode\u003EErrorException\u003C/code\u003E, \u003Ccode\u003ERuntimeException\u003C/code\u003E or \u003Ccode\u003EException\u003C/code\u003E)\nis thrown.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/397"\u003ECWE-397 Declaration of Throws for Generic Exception\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EThrowing generic exceptions such as \u003Ccode\u003EError\u003C/code\u003E, \u003Ccode\u003ERuntimeException\u003C/code\u003E, \u003Ccode\u003EThrowable\u003C/code\u003E, and \u003Ccode\u003EException\u003C/code\u003E will have\na negative impact on any code trying to catch these exceptions.\u003C/p\u003E\n\u003Cp\u003EFrom a consumer perspective, it is generally a best practice to only catch exceptions you intend to handle. Other exceptions should ideally be let\nto propagate up the stack trace so that they can be dealt with appropriately. When a generic exception is thrown, it forces consumers to catch\nexceptions they do not intend to handle, which they then have to re-throw.\u003C/p\u003E\n\u003Cp\u003EBesides, when working with a generic type of exception, the only way to distinguish between multiple exceptions is to check their message, which is\nerror-prone and difficult to maintain. Legitimate exceptions may be unintentionally silenced and errors may be hidden.\u003C/p\u003E\n\u003Cp\u003EWhen throwing an exception, it is therefore recommended to throw the most specific exception possible so that it can be handled intentionally by\nconsumers.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003ETo fix this issue, make sure to throw specific exceptions that are relevant to the context in which they arise. It is recommended to either:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Throw a subtype of \u003Ccode\u003EException\u003C/code\u003E that already exists in the Standard PHP Library. For instance \u003Ccode\u003EInvalidArgumentException\u003C/code\u003E\n  could be raised when an unexpected argument is provided to a function. \u003C/li\u003E\n  \u003Cli\u003E Define a custom exception type that derives from \u003Ccode\u003EException\u003C/code\u003E or one of its subclasses. \u003C/li\u003E\n\u003C/ul\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nfunction checkValue($value) {\n    if ($value == 42) {\n        throw new Exception("Value is 42"); // Noncompliant: This will be difficult for consumers to handle\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nfunction checkValue($value) {\n    if ($value == 42) {\n        throw new UnexpectedValueException("Value is 42"); // Compliant\n    }\n}\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S905",
      name: "Non-empty statements should change control flow or have at least one side-effect",
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            "\u003Cp\u003EIdentify statements that do not contribute to the functionality of the code and verify if they are intended to be part of the logic. If they are,\nthere is a bug to be fixed. If they are not, then they are redundant and should be removed.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre\u003E\nfunction getResult() {\n    $result = 42;\n    if (shouldBeZero()) {\n        $result == 0; // Noncompliant: no side effect, was an assignment intended?\n    }\n    return $result;\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre\u003E\nfunction getResult() {\n    $result = 42;\n    if (shouldBeZero()) {\n        $result = 0; // Compliant\n    }\n    return $result;\n}\n\u003C/pre\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EStatements with no side effects and no change of control flow do not contribute to the functionality of the code and can indicate a programming\nerror.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWhen writing code, it is important to ensure that each statement serves a purpose and contributes to the overall functionality of the program. When\nthey have no side effects or do not change the control flow, they can either indicate a programming error or be redundant:\u003C/p\u003E\n\u003Col\u003E\n  \u003Cli\u003E The code does not behave as intended: The statements are expected to have an effect but they do not. This can be caused by mistyping,\n  copy-and-paste errors, etc. \u003C/li\u003E\n  \u003Cli\u003E The statements are residual after a refactoring. \u003C/li\u003E\n\u003C/ol\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003EThe rule does not raise an issue on statements containing only a semicolon (\u003Ccode\u003E;\u003C/code\u003E).\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/482"\u003ECWE-482 Comparing instead of Assigning\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S5693",
      name: "Allowing requests with excessive content length is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            '\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E size limits are not defined for the different resources of the web application. \u003C/li\u003E\n  \u003Cli\u003E the web application is not protected by \u003Ca href="https://en.wikipedia.org/wiki/Rate_limiting"\u003Erate limiting\u003C/a\u003E features. \u003C/li\u003E\n  \u003Cli\u003E the web application infrastructure has limited resources. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ERejecting requests with significant content length is a good practice to control the network traffic intensity and thus resource consumption in\norder to prevent DoS attacks.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E For most of the features of an application, it is recommended to limit the size of requests to:\n    \u003Cul\u003E\n      \u003Cli\u003E lower or equal to 8mb for file uploads. \u003C/li\u003E\n      \u003Cli\u003E lower or equal to 2mb for other requests. \u003C/li\u003E\n    \u003C/ul\u003E  \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIt is recommended to customize the rule with the limit values that correspond to the web application.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://symfony.com/doc/current/reference/constraints/File.html#maxsize\"\u003ESymfony Constraints\u003C/a\u003E:\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Component\\Validator\\Constraints as Assert;\nuse Symfony\\Component\\Validator\\Mapping\\ClassMetadata;\n\nclass TestEntity\n{\n    public static function loadValidatorMetadata(ClassMetadata $metadata)\n    {\n        $metadata-&gt;addPropertyConstraint('upload', new Assert\\File([\n            'maxSize' =&gt; '100M', // Sensitive\n        ]));\n    }\n}\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://laravel.com/docs/8.x/validation#rule-max\"\u003ELaravel Validator\u003C/a\u003E:\u003C/p\u003E\n\u003Cpre\u003E\nuse App\\Http\\Controllers\\Controller;\nuse Illuminate\\Http\\Request;\n\nclass TestController extends Controller\n{\n    public function test(Request $request)\n    {\n        $validatedData = $request-&gt;validate([\n            'upload' =&gt; 'required|file', // Sensitive\n        ]);\n    }\n}\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://symfony.com/doc/current/reference/constraints/File.html#maxsize\"\u003ESymfony Constraints\u003C/a\u003E:\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Component\\Validator\\Constraints as Assert;\nuse Symfony\\Component\\Validator\\Mapping\\ClassMetadata;\n\nclass TestEntity\n{\n    public static function loadValidatorMetadata(ClassMetadata $metadata)\n    {\n        $metadata-&gt;addPropertyConstraint('upload', new Assert\\File([\n            'maxSize' =&gt; '8M', // Compliant\n        ]));\n    }\n}\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href=\"https://laravel.com/docs/8.x/validation#rule-max\"\u003ELaravel Validator\u003C/a\u003E:\u003C/p\u003E\n\u003Cpre\u003E\nuse App\\Http\\Controllers\\Controller;\nuse Illuminate\\Http\\Request;\n\nclass TestController extends Controller\n{\n    public function test(Request $request)\n    {\n        $validatedData = $request-&gt;validate([\n            'upload' =&gt; 'required|file|max:8000', // Compliant\n        ]);\n    }\n}\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A05_2021-Security_Misconfiguration/\"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html\"\u003EOwasp Cheat Sheet\u003C/a\u003E - Owasp Denial of Service\n  Cheat Sheet \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration\"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/770\"\u003ECWE-770 - Allocation of Resources Without Limits or Throttling\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/400\"\u003ECWE-400 - Uncontrolled Resource Consumption\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S107",
      name: "Functions should not have too many parameters",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EFunctions with a long parameter list are difficult to use because maintainers must figure out the role of each parameter and keep track of their\nposition.\u003C/p\u003E\n\u003Cpre\u003E\nfunction setCoordinates($x1, $y1, $z1, $x2, $y2, $z2) { // Noncompliant\n    // ...\n}\n\u003C/pre\u003E\n\u003Cp\u003EThe solution can be to:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Split the function into smaller ones \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cpre\u003E\n// Each function does a part of what the original setCoordinates function was doing, so confusion risks are lower\nfunction setOrigin(int $x, int $y, int $z) {\n   // ...\n}\n\nfunction setSize(int $width, int $height, float $depth) {\n   // ...\n}\n\u003C/pre\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Find a better data structure for the parameters that group data in a way that makes sense for the specific application domain \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cpre\u003E\nclass Point\n{\n    // In geometry, Point is a logical structure to group data\n    public function __construct(\n        public int $x,\n        public int $y,\n        public int $z\n    ) {}\n}\n\nfunction setCoordinates(Point $p1, Point $p2) {\n    // ...\n}\n\u003C/pre\u003E\n\u003Cp\u003EThis rule raises an issue when a function has more parameters than the provided threshold.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S6437",
      name: "Credentials should not be hard-coded",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EIn most cases, trust boundaries are violated when a secret is exposed in a source code repository or an uncontrolled deployment environment.\nUnintended people who don’t need to know the secret might get access to it. They might then be able to use it to gain unwanted access to associated\nservices or resources.\u003C/p\u003E\n\u003Cp\u003EThe trust issue can be more or less severe depending on the people’s role and entitlement.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EThe consequences vary greatly depending on the situation and the secret-exposed audience. Still, two main scenarios should be considered.\u003C/p\u003E\n\u003Ch4\u003EFinancial loss\u003C/h4\u003E\n\u003Cp\u003EFinancial losses can occur when a secret is used to access a paid third-party-provided service and is disclosed as part of the source code of\nclient applications. Having the secret, each user of the application will be able to use it without limit to use the third party service to their own\nneed, including in a way that was not expected.\u003C/p\u003E\n\u003Cp\u003EThis additional use of the secret will lead to added costs with the service provider.\u003C/p\u003E\n\u003Cp\u003EMoreover, when rate or volume limiting is set up on the provider side, this additional use can prevent the regular operation of the affected\napplication. This might result in a partial denial of service for all the application’s users.\u003C/p\u003E\n\u003Ch4\u003EApplication’s security downgrade\u003C/h4\u003E\n\u003Cp\u003EA downgrade can happen when the disclosed secret is used to protect security-sensitive assets or features of the application. Depending on the\naffected asset or feature, the practical impact can range from a sensitive information leak to a complete takeover of the application, its hosting\nserver or another linked component.\u003C/p\u003E\n\u003Cp\u003EFor example, an application that would disclose a secret used to sign user authentication tokens would be at risk of user identity impersonation.\nAn attacker accessing the leaked secret could sign session tokens for arbitrary users and take over their privileges and entitlements.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E AWS Documentation - \u003Ca href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"\u003EWhat is AWS Secrets Manager\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Azure Documentation - \u003Ca href="https://learn.microsoft.com/en-us/azure/key-vault/"\u003EAzure Key Vault\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Google Cloud - \u003Ca href="https://cloud.google.com/secret-manager/docs"\u003ESecret Manager documentation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E HashiCorp Developer - \u003Ca href="https://developer.hashicorp.com/vault/docs"\u003EVault Documentation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Symfony - \u003Ca href="https://symfony.com/doc/current/configuration/secrets.html"\u003EHow to Keep Sensitive Information Secret\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 - Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication"\u003ETop 10 2017 - Category A2 - Broken\n  Authentication\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/798"\u003ECWE-798 - Use of Hard-coded Credentials\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/259"\u003ECWE-259 - Use of Hard-coded Password\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003E\u003Cstrong\u003ERevoke the secret\u003C/strong\u003E\u003C/p\u003E\n\u003Cp\u003ERevoke any leaked secrets and remove them from the application source code.\u003C/p\u003E\n\u003Cp\u003EBefore revoking the secret, ensure that no other applications or processes are using it. Other usages of the secret will also be impacted when the\nsecret is revoked.\u003C/p\u003E\n\u003Cp\u003E\u003Cstrong\u003EAnalyze recent secret use\u003C/strong\u003E\u003C/p\u003E\n\u003Cp\u003EWhen available, analyze authentication logs to identify any unintended or malicious use of the secret since its disclosure date. Doing this will\nallow determining if an attacker took advantage of the leaked secret and to what extent.\u003C/p\u003E\n\u003Cp\u003EThis operation should be part of a global incident response process.\u003C/p\u003E\n\u003Cp\u003E\u003Cstrong\u003EUse a secret vault\u003C/strong\u003E\u003C/p\u003E\n\u003Cp\u003EA secret vault should be used to generate and store the new secret. This will ensure the secret’s security and prevent any further unexpected\ndisclosure.\u003C/p\u003E\n\u003Cp\u003EDepending on the development platform and the leaked secret type, multiple solutions are currently available.\u003C/p\u003E\n\n\u003Cp\u003EThe following code example is noncompliant because it uses a hardcoded secret value.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nuse Defuse\\Crypto\\KeyOrPassword;\n\nfunction createKey() {\n    $password = "3xAmpl3";  // Noncompliant\n    return KeyOrPassword::createFromPassword($password);\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nuse Defuse\\Crypto\\KeyOrPassword;\n\nfunction createKey() {\n    $password = $_ENV["SECRET"]\n    return KeyOrPassword::createFromPassword($password);\n}\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EWhile the noncompliant code example contains a hard-coded password, the compliant solution retrieves the secret’s value from its environment. This\nallows to have an environment-dependent secret value and avoids storing the password in the source code itself.\u003C/p\u003E\n\u003Cp\u003EDepending on the application and its underlying infrastructure, how the secret gets added to the environment might change.\u003C/p\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003ESecret leaks often occur when a sensitive piece of authentication data is stored with the source code of an application. Considering the source\ncode is intended to be deployed across multiple assets, including source code repositories or application hosting servers, the secrets might get\nexposed to an unintended audience.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S2077",
      name: "Formatting SQL queries is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Some parts of the query come from untrusted values (like user inputs). \u003C/li\u003E\n  \u003Cli\u003E The query is repeated/duplicated in other parts of the code. \u003C/li\u003E\n  \u003Cli\u003E The application must support different types of relational databases. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EFormatted SQL queries can be difficult to maintain, debug and can increase the risk of SQL injection when concatenating untrusted values into the\nquery. However, this rule doesn’t detect SQL injections (unlike rule \u003Ca href='/organizations/my-org/rules?open=php%3AS3649&rule_key=php%3AS3649'\u003ES3649\u003C/a\u003E), the goal is only to highlight complex/formatted queries.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Use \u003Ca href="https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html"\u003Eparameterized queries, prepared\n  statements, or stored procedures\u003C/a\u003E and bind variables to SQL query parameters. \u003C/li\u003E\n  \u003Cli\u003E Consider using ORM frameworks if there is a need to have an abstract layer to access data. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n$id = $_GET[\'id\'];\nmysql_connect(\'localhost\', $username, $password) or die(\'Could not connect: \' . mysql_error());\nmysql_select_db(\'myDatabase\') or die(\'Could not select database\');\n\n$result = mysql_query("SELECT * FROM myTable WHERE id = " . $id);  // Sensitive, could be susceptible to SQL injection\n\nwhile ($row = mysql_fetch_object($result)) {\n    echo $row-&gt;name;\n}\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\n$id = $_GET[\'id\'];\ntry {\n    $conn = new PDO(\'mysql:host=localhost;dbname=myDatabase\', $username, $password);\n    $conn-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n\n    $stmt = $conn-&gt;prepare(\'SELECT * FROM myTable WHERE id = :id\');\n    $stmt-&gt;execute(array(\'id\' =&gt; $id));\n\n    while($row = $stmt-&gt;fetch(PDO::FETCH_OBJ)) {\n        echo $row-&gt;name;\n    }\n} catch(PDOException $e) {\n    echo \'ERROR: \' . $e-&gt;getMessage();\n}\n\u003C/pre\u003E\n\u003Ch2\u003EExceptions\u003C/h2\u003E\n\u003Cp\u003ENo issue will be raised if one of the functions is called with hard-coded string (no concatenation) and this string does not contain a "$"\nsign.\u003C/p\u003E\n\u003Cpre\u003E\n$result = mysql_query("SELECT * FROM myTable WHERE id = 42") or die(\'Query failed: \' . mysql_error());  // Compliant\n\u003C/pre\u003E\n\u003Cp\u003EThe current implementation does not follow variables. It will only detect SQL queries which are concatenated or contain a \u003Ccode\u003E$\u003C/code\u003E sign\ndirectly in the function call.\u003C/p\u003E\n\u003Cpre\u003E\n$query = "SELECT * FROM myTable WHERE id = " . $id;\n$result = mysql_query($query);  // No issue will be raised even if it is Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A03_2021-Injection/"\u003ETop 10 2021 Category A3 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A1_2017-Injection"\u003ETop 10 2017 Category A1 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/20"\u003ECWE-20 - Improper Input Validation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/89"\u003ECWE-89 - Improper Neutralization of Special Elements used in an SQL Command\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Derived from FindSecBugs rules \u003Ca href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#SQL_INJECTION_JPA"\u003EPotential SQL/JPQL Injection\n  (JPA)\u003C/a\u003E, \u003Ca href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#SQL_INJECTION_JDO"\u003EPotential SQL/JDOQL Injection (JDO)\u003C/a\u003E, \u003Ca\n  href="https://h3xstream.github.io/find-sec-bugs/bugs.htm#SQL_INJECTION_HIBERNATE"\u003EPotential SQL/HQL Injection (Hibernate)\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4818",
      name: "Using Sockets is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E In many cases there is no need to open a socket yourself. Use instead libraries and existing protocols. \u003C/li\u003E\n  \u003Cli\u003E Encrypt all data sent if it is sensitive. Usually it is better to encrypt it even if the data is not sensitive as it might change later. \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet"\u003ESanitize\u003C/a\u003E any input read from the socket. \u003C/li\u003E\n  \u003Cli\u003E Limit the number of sockets a given user can create. Close the sockets as soon as possible. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\nfunction handle_sockets($domain, $type, $protocol, $port, $backlog, $addr, $hostname, $local_socket, $remote_socket, $fd) {\n    socket_create($domain, $type, $protocol); // Sensitive\n    socket_create_listen($port, $backlog); // Sensitive\n    socket_addrinfo_bind($addr); // Sensitive\n    socket_addrinfo_connect($addr); // Sensitive\n    socket_create_pair($domain, $type, $protocol, $fd);\n\n    fsockopen($hostname); // Sensitive\n    pfsockopen($hostname); // Sensitive\n    stream_socket_server($local_socket); // Sensitive\n    stream_socket_client($remote_socket); // Sensitive\n    stream_socket_pair($domain, $type, $protocol); // Sensitive\n}\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/20"\u003ECWE-20 - Improper Input Validation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/400"\u003ECWE-400 - Uncontrolled Resource Consumption (\'Resource Exhaustion\')\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/200"\u003ECWE-200 - Exposure of Sensitive Information to an Unauthorized Actor\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E sockets are created without any limit every time a user performs an action. \u003C/li\u003E\n  \u003Cli\u003E input received from sockets is used without being sanitized. \u003C/li\u003E\n  \u003Cli\u003E sensitive data is sent via sockets without being encrypted. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EUsing sockets is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2011-1785"\u003ECVE-2011-178\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-5645"\u003ECVE-2017-5645\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-6597"\u003ECVE-2018-6597\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ESockets are vulnerable in multiple ways:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E They enable a software to interact with the outside world. As this world is full of attackers it is necessary to check that they cannot receive\n  sensitive information or inject dangerous input. \u003C/li\u003E\n  \u003Cli\u003E The number of sockets is limited and can be exhausted. Which makes the application unresponsive to users who need additional sockets. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThis rules flags code that creates sockets. It matches only the direct use of sockets, not use through frameworks or high-level APIs such as the\nuse of http connections.\u003C/p\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S2755",
      name: "XML parsers should not be vulnerable to XXE attacks",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EExternal Entity Processing allows for XML parsing with the involvement of external entities. However, when this functionality is enabled without\nproper precautions, it can lead to a vulnerability known as XML External Entity (XXE) attack.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Ch4\u003EExposing sensitive data\u003C/h4\u003E\n\u003Cp\u003EOne significant danger of XXE vulnerabilities is the potential for sensitive data exposure. By crafting malicious XML payloads, attackers can\nreference external entities that contain sensitive information, such as system files, database credentials, or configuration files. When these\nentities are processed during XML parsing, the attacker can extract the contents and gain unauthorized access to sensitive data. This poses a severe\nthreat to the confidentiality of critical information.\u003C/p\u003E\n\u003Ch4\u003EExhausting system resources\u003C/h4\u003E\n\u003Cp\u003EAnother consequence of XXE vulnerabilities is the potential for denial-of-service attacks. By exploiting the ability to include external entities,\nattackers can construct XML payloads that cause resource exhaustion. This can overwhelm the system’s memory, CPU, or other critical resources, leading\nto system unresponsiveness or crashes. A successful DoS attack can disrupt the availability of services and negatively impact the user experience.\u003C/p\u003E\n\u003Ch4\u003EForging requests\u003C/h4\u003E\n\u003Cp\u003EXXE vulnerabilities can also enable Server-Side Request Forgery (SSRF) attacks. By leveraging the ability to include external entities, an attacker\ncan make the vulnerable application send arbitrary requests to other internal or external systems. This can result in unintended actions, such as\nretrieving data from internal resources, scanning internal networks, or attacking other systems. SSRF attacks can lead to severe consequences,\nincluding unauthorized data access, system compromise, or even further exploitation within the network infrastructure.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code contains examples of XML parsers that have external entity processing enabled. As a result, the parsers are vulnerable to XXE\nattacks if an attacker can control the XML file that is processed.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n$xml = file_get_contents(\'xxe.xml\');\n$doc = simplexml_load_string($xml, \'SimpleXMLElement\', LIBXML_NOENT); // Noncompliant\n\u003C/pre\u003E\n\u003Cpre data-diff-id="2" data-diff-type="noncompliant"\u003E\n$doc = new DOMDocument();\n$doc-&gt;load(\'xxe.xml\', LIBXML_NOENT); // Noncompliant\n\u003C/pre\u003E\n\u003Cpre data-diff-id="3" data-diff-type="noncompliant"\u003E\n$reader = new XMLReader();\n$reader-&gt;open(\'xxe.xml\');\n$reader-&gt;setParserProperty(XMLReader::SUBST_ENTITIES, true); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EExternal entity substitution is disabled by default in \u003Ccode\u003Esimplexml_load_string()\u003C/code\u003E and \u003Ccode\u003EDOMDocument::open()\u003C/code\u003E.\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n$xml = file_get_contents(\'xxe.xml\');\n$doc = simplexml_load_string($xml, \'SimpleXMLElement\');\n\u003C/pre\u003E\n\u003Cpre data-diff-id="2" data-diff-type="compliant"\u003E\n$doc = new DOMDocument();\n$doc-&gt;load(\'xxe.xml\');\n\u003C/pre\u003E\n\u003Cpre data-diff-id="3" data-diff-type="compliant"\u003E\n$reader = new XMLReader();\n$reader-&gt;open(\'xxe.xml\');\n$reader-&gt;setParserProperty(XMLReader::SUBST_ENTITIES, false);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Ch4\u003EDisable external entities\u003C/h4\u003E\n\u003Cp\u003EThe most effective approach to prevent XXE vulnerabilities is to disable external entity processing entirely, unless it is explicitly required for\nspecific use cases. By default, XML parsers should be configured to reject the processing of external entities. This can be achieved by setting the\nappropriate properties or options in your XML parser library or framework.\u003C/p\u003E\n\u003Cp\u003EIf external entity processing is necessary for certain scenarios, adopt a whitelisting approach to restrict the entities that can be resolved\nduring XML parsing. Create a list of trusted external entities and disallow all others. This approach ensures that only known and safe entities are\nprocessed.\u003Cbr\u003E You should rely on features provided by your XML parser to restrict the external entities.\u003C/p\u003E',
          context: {
            displayName: "Core PHP",
            key: "core_php",
          },
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis vulnerability allows the usage of external entities in XML.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A4_2017-XML_External_Entities_(XXE)"\u003ETop 10 2017 Category A4 - XML External\n  Entities (XXE)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/611"\u003ECWE-611 - Information Exposure Through XML External Entity Reference\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/827"\u003ECWE-827 - Improper Control of Document Type Definition\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S1788",
      name: "Method arguments with default values should be last",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThe ability to define default values for method arguments can make a method easier to use. Default argument values allow callers to specify as many\nor as few arguments as they want while getting the same functionality and minimizing boilerplate, wrapper code.\u003C/p\u003E\n\u003Cp\u003EBut all method arguments with default values should be declared after the method arguments without default values. Otherwise, it makes it\nimpossible for callers to take advantage of defaults; they must re-specify the defaulted values in order to "get to" the non-default arguments.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nfunction makeyogurt($type = "acidophilus", $flavor){...}  // Noncompliant\n\nmakeyogurt("raspberry")}}  // Runtime error: Missing argument 2 in call to makeyogurt()\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\nfunction makeyogurt($flavor, $type = "acidophilus", ){...}\n\nmakeyogurt("raspberry")}} // Works as expected\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S2070",
      name: "SHA-1 and Message-Digest hash algorithms should not be used in secure contexts",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/328"\u003ECWE-328 - Reversible One-Way Hash\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/327"\u003ECWE-327 - Use of a Broken or Risky Cryptographic Algorithm\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://shattered.io/"\u003ESHAttered\u003C/a\u003E - The first concrete collision attack against SHA-1. \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EThe MD5 algorithm and its successor, SHA-1, are no longer considered secure, because it is too easy to create hash collisions with them. That is,\nit takes too little computational effort to come up with a different input that produces the same MD5 or SHA-1 hash, and using the new, same-hash\nvalue gives an attacker the same access as if he had the originally-hashed value. This applies as well to the other Message-Digest algorithms: MD2,\nMD4, MD6, HAVAL-128, HMAC-MD5, DSA (which uses SHA-1), RIPEMD, RIPEMD-128, RIPEMD-160, HMACRIPEMD160.\u003C/p\u003E\n\u003Cp\u003EConsider using safer alternatives, such as SHA-256, SHA-512 or SHA-3.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\n$password = ...\n\nif (md5($password) === '1f3870be274f6c49b3e31a0c6728957f') { // Noncompliant; md5() hashing algorithm is not secure for password management\n   [...]\n}\n\nif (sha1($password) === 'd0be2dc421be4fcd0172e5afceea3970e2f3d940') { // Noncompliant; sha1() hashing algorithm is not secure for password management\n   [...]\n}\n\u003C/pre\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule is deprecated; use \u003Ca href='/organizations/my-org/rules?open=php%3AS4790&rule_key=php%3AS4790'\u003ES4790\u003C/a\u003E instead.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S117",
      name: "Local variable and function parameter names should comply with a naming convention",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            "\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Wikipedia - \u003Ca href=\"https://en.wikipedia.org/wiki/Naming_convention_(programming)\"\u003ENaming Convention (programming)\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003ERelated rules\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS100&rule_key=php%3AS100'\u003ES100\u003C/a\u003E - Function names should comply with a naming convention \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS101&rule_key=php%3AS101'\u003ES101\u003C/a\u003E - Class names should comply with a naming convention \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS114&rule_key=php%3AS114'\u003ES114\u003C/a\u003E - Interface names should comply with a naming convention \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS115&rule_key=php%3AS115'\u003ES115\u003C/a\u003E - Constant names should comply with a naming convention \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS116&rule_key=php%3AS116'\u003ES116\u003C/a\u003E - Field names should comply with a naming convention \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS1578&rule_key=php%3AS1578'\u003ES1578\u003C/a\u003E - File names should comply with a naming convention \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href='/organizations/my-org/rules?open=php%3AS3360&rule_key=php%3AS3360'\u003ES3360\u003C/a\u003E - Test class names should end with \"Test\" \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EA naming convention in software development is a set of guidelines for naming code elements like variables, functions, and classes.\u003Cbr\u003E Local\nvariables and function parameters hold the meaning of the written code. Their names should be meaningful and follow a consistent and easily\nrecognizable pattern.\u003Cbr\u003E Adhering to a consistent naming convention helps to make the code more readable and understandable, which makes it easier to\nmaintain and debug. It also ensures consistency in the code, especially when multiple developers are working on the same project.\u003C/p\u003E\n\u003Cp\u003EThis rule checks that local variable and function parameter names match a provided regular expression.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EInconsistent naming of local variables and function parameters can lead to several issues in your code:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Cstrong\u003EReduced Readability\u003C/strong\u003E: Inconsistent local variable and function parameter names make the code harder to read and understand;\n  consequently, it is more difficult to identify the purpose of each variable, spot errors, or comprehend the logic. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EDifficulty in Identifying Variables\u003C/strong\u003E: The local variables and function parameters that don’t adhere to a standard naming\n  convention are challenging to identify; thus, the coding process slows down, especially when dealing with a large codebase. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EIncreased Risk of Errors\u003C/strong\u003E: Inconsistent or unclear local variable and function parameter names lead to misunderstandings about\n  what the variable represents. This ambiguity leads to incorrect assumptions and, consequently, bugs in the code. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003ECollaboration Difficulties\u003C/strong\u003E: In a team setting, inconsistent naming conventions lead to confusion and miscommunication among\n  team members. \u003C/li\u003E\n  \u003Cli\u003E \u003Cstrong\u003EDifficulty in Code Maintenance\u003C/strong\u003E: Inconsistent naming leads to an inconsistent codebase. The code is difficult to understand,\n  and making changes feels like refactoring constantly, as you face different naming methods. Ultimately, it makes the codebase harder to maintain.\n  \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIn summary, not adhering to a naming convention for local variables and function parameters can lead to confusion, errors, and inefficiencies,\nmaking the code harder to read, understand, and maintain.\u003C/p\u003E",
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003ELocal variables and function parameters should be named consistently to communicate intent and improve maintainability. Rename your local variable\nor function parameter to follow your project’s naming convention to address this issue.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EFirst, familiarize yourself with the particular naming convention of the project in question. Then, update the name to match the convention, as\nwell as all usages of the name. For many IDEs, you can use built-in renaming and refactoring features to update all usages at once.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EWith the default regular expression \u003Ccode\u003E^[a-z_][a-zA-Z0-9_]*$\u003C/code\u003E:\u003C/p\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nfunction printSomething($My_Param){ //Noncompliant\n  $LOCAL = ""; // Noncompliant\n  echo $My_Param . $LOCAL;\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nfunction dprintSomething($my_Param){\n  $local = "";\n  echo $my_Param . $local;\n}\n\u003C/pre\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "php:S1998",
      name: "References should not be passed to function calls",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/374"\u003ECWE-374 - Weakness Base Passing Mutable Objects to an Untrusted Method\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003ERefactor your code to not pass a reference as a function parameter.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nmyfun(&amp;$name);  // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nmyfun($name);\n\u003C/pre\u003E',
          context: {
            displayName: "Core PHP",
            key: "core_php",
          },
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EIn PHP, references allow you to create multiple names for the same variable, enabling you to access and manipulate its value through different\nidentifiers. They are denoted by the ampersand symbol &amp; placed before the variable name during declaration or assignment.\u003C/p\u003E\n\u003Cp\u003EAny modification a method makes to a function parameter passed by reference will also be made to the original value.\u003C/p\u003E\n\u003Cp\u003EThis feature can be difficult to use correctly, particularly if the callee is not expecting a reference.\u003C/p\u003E\n\u003Cp\u003EThe improper use of references in function calls can make code less efficient rather than more efficient.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EWhile references can provide flexibility and efficiency in certain scenarios, they can also introduce complexity and potential pitfalls. Incorrect\nusage of references may lead to unexpected behavior, difficult-to-debug code, and unintended side effects. It’s important to exercise caution and\nfully understand the implications before employing references.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S2964",
      name: '"sleep" should not be called',
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003E\u003Ccode\u003Esleep\u003C/code\u003E is sometimes used in a mistaken attempt to prevent Denial of Service (DoS) attacks by throttling response rate. But because it\nties up a thread, each request takes longer to serve that it otherwise would, making the application \u003Cem\u003Emore\u003C/em\u003E vulnerable to DoS attacks, rather\nthan less.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nif (is_bad_ip($requester)) {\n  sleep(5);  // Noncompliant\n}\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.Low,
        },
      ],
    },
    {
      key: "php:S1192",
      name: "String literals should not be duplicated",
      type: RawType.CodeSmell,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EDuplicated string literals make the process of refactoring complex and error-prone, as any change would need to be propagated on all\noccurrences.\u003C/p\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003ENo issue will be raised on:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E strings with less than 5 characters \u003C/li\u003E\n  \u003Cli\u003E strings with only letters, numbers, underscores, hyphens and periods \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "how_to_fix",
          content:
            "\u003Cp\u003EUse constants to replace the duplicated string literals. Constants can be referenced from many places, but only need to be updated in a single\nplace.\u003C/p\u003E\n\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EWith the default threshold of 3:\u003C/p\u003E\n\u003Cpre data-diff-id=\"1\" data-diff-type=\"noncompliant\"\u003E\nfunction run() {\n  prepare('this is a duplicate'); // Noncompliant - 'this is a duplicate' is duplicated 3 times\n  execute('this is a duplicate');\n  release('this is a duplicate');\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id=\"1\" data-diff-type=\"compliant\"\u003E\nMESSAGE = 'this is a duplicate';\n\nfunction run() {\n  prepare(MESSAGE); // Compliant - the duplicated string literal is replaced by a constant and can be safely re-used\n  execute(MESSAGE);\n  release(MESSAGE);\n}\n\u003C/pre\u003E\n\u003Cpre\u003E\n$severity = $request-&gt;getParam('severity-score');\n\u003C/pre\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Maintainability,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S1763",
      name: "All code should be reachable",
      type: RawType.Bug,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ESome statements (\u003Ccode\u003Ereturn\u003C/code\u003E, \u003Ccode\u003Ebreak\u003C/code\u003E, \u003Ccode\u003Econtinue\u003C/code\u003E, \u003Ccode\u003Egoto\u003C/code\u003E, \u003Ccode\u003Eswitch\u003C/code\u003E) and \u003Ccode\u003Ethrow\u003C/code\u003E\nexpressions move control flow out of the current code block. So any unlabeled statements that come after such a jump are unreachable, and either this\ndead code should be removed, or the logic should be corrected.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cpre\u003E\nfunction fun($a) {\n  $i = 10;\n  return $i + $a;\n  $i++;             // dead code\n}\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cpre\u003E\nfunction fun($a) {\n  $i = 10;\n  return $i + $a;\n}\n\u003C/pre\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/561"\u003ECWE-561 - Dead Code\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EOnce control flow has been moved out of the current code block, any subsequent statements become effectively unreachable.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Reliability,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S5328",
      name: "Manual generation of session ID is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E the session ID is not unique. \u003C/li\u003E\n  \u003Cli\u003E the session ID is set from a user-controlled input. \u003C/li\u003E\n  \u003Cli\u003E the session ID is generated with not secure pseudo random generator. \u003C/li\u003E\n  \u003Cli\u003E the session ID length is too short. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EIf a session ID can be guessed (not generated with a secure pseudo random generator, or with insufficient length …​) an attacker may be able to\nhijack another user’s session.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EDon’t manually generate session IDs, use instead language based native functionality.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\nsession_id(bin2hex(random_bytes(4))); // Sensitive: 4 bytes is too short\nsession_id($_POST["session_id"]); // Sensitive: session ID can be specified by the user\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\nsession_regenerate_id(); ; // Compliant\nsession_id(bin2hex(random_bytes(16))); // Compliant\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A04_2021-Insecure_Design/"\u003ETop 10 2021 Category A4 - Insecure Design\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://owasp.org/www-community/attacks/Session_fixation"\u003EOWASP Sesssion Fixation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/330"\u003ECWE-330 - Use of Insufficiently Random Values\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/340"\u003ECWE-340 - Generation of Predictable Numbers or Identifiers\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://www.php.net/random-bytes"\u003EPHP: random_bytes()\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://www.php.net/session-regenerate-id"\u003EPHP: session_regenerate_id()\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S2612",
      name: "Setting loose POSIX file permissions is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EThe most restrictive possible permissions should be assigned to files and directories.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\nchmod("foo", 0777); // Sensitive\n\u003C/pre\u003E\n\u003Cpre\u003E\numask(0); // Sensitive\numask(0750); // Sensitive\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href="https://symfony.com/doc/current/components/filesystem.html"\u003ESymfony Filesystem\u003C/a\u003E:\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Component\\Filesystem\\Filesystem;\n\n$fs = new Filesystem();\n$fs-&gt;chmod("foo", 0777); // Sensitive\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href="https://laravel.com/api/8.x/Illuminate/Filesystem/Filesystem.html"\u003ELaravel Filesystem\u003C/a\u003E:\u003C/p\u003E\n\u003Cpre\u003E\nuse Illuminate\\Filesystem\\Filesystem;\n\n$fs = new Filesystem();\n$fs-&gt;chmod("foo", 0777); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\nchmod("foo", 0750); // Compliant\n\u003C/pre\u003E\n\u003Cpre\u003E\numask(0027); // Compliant\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href="https://symfony.com/doc/current/components/filesystem.html"\u003ESymfony Filesystem\u003C/a\u003E:\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Component\\Filesystem\\Filesystem;\n\n$fs = new Filesystem();\n$fs-&gt;chmod("foo", 0750); // Compliant\n\u003C/pre\u003E\n\u003Cp\u003EFor \u003Ca href="https://laravel.com/api/8.x/Illuminate/Filesystem/Filesystem.html"\u003ELaravel Filesystem\u003C/a\u003E:\u003C/p\u003E\n\u003Cpre\u003E\nuse Illuminate\\Filesystem\\Filesystem;\n\n$fs = new Filesystem();\n$fs-&gt;chmod("foo", 0750); // Compliant\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/"\u003ETop 10 2021 Category A1 - Broken Access Control\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A04_2021-Insecure_Design/"\u003ETop 10 2021 Category A4 - Insecure Design\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control"\u003ETop 10 2017 Category A5 - Broken Access Control\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E \u003Ca\n  href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/09-Test_File_Permission"\u003EOWASP File Permission\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/732"\u003ECWE-732 - Incorrect Permission Assignment for Critical Resource\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/266"\u003ECWE-266 - Incorrect Privilege Assignment\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E The application is designed to be run on a multi-user environment. \u003C/li\u003E\n  \u003Cli\u003E Corresponding files and directories may contain confidential information. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EIn Unix file system permissions, the "\u003Ccode\u003Eothers\u003C/code\u003E" category refers to all users except the owner of the file system resource and the\nmembers of the group assigned to this resource.\u003C/p\u003E\n\u003Cp\u003EGranting permissions to this category can lead to unintended access to files or directories that could allow attackers to obtain sensitive\ninformation, disrupt services or elevate privileges.\u003C/p\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S1523",
      name: "Dynamically executing code is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E the executed code may come from an untrusted source and hasn’t been sanitized. \u003C/li\u003E\n  \u003Cli\u003E you really need to run code dynamically. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003ERegarding the execution of unknown code, the best solution is to not run code provided by an untrusted source. If you really need to do it, run the\ncode in a \u003Ca href="https://en.wikipedia.org/wiki/Sandbox_(computer_security)"\u003Esandboxed\u003C/a\u003E environment. Use jails, firewalls and whatever means your\noperating system and programming language provide (example: \u003Ca\nhref="https://wiki.sei.cmu.edu/confluence/display/java/SEC54-J.+Create+a+secure+sandbox+using+a+security+manager"\u003ESecurity Managers\u003C/a\u003E in java, \u003Ca\nhref="https://www.w3schools.com/tags/att_iframe_sandbox.asp"\u003Eiframes\u003C/a\u003E and \u003Ca href="https://en.wikipedia.org/wiki/Same-origin_policy"\u003Esame-origin\npolicy\u003C/a\u003E for javascript in a web browser).\u003C/p\u003E\n\u003Cp\u003EDo not try to create a blacklist of dangerous code. It is impossible to cover all attacks that way.\u003C/p\u003E\n\u003Cp\u003EAvoid using dynamic code APIs whenever possible. Hard-coded code is always safer.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\neval($code_to_be_dynamically_executed)\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A03_2021-Injection/"\u003ETop 10 2021 Category A3 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A1_2017-Injection"\u003ETop 10 2017 Category A1 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/95"\u003ECWE-95 - Improper Neutralization of Directives in Dynamically Evaluated Code (\'Eval\n  Injection\')\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EExecuting code dynamically is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-9807"\u003ECVE-2017-9807\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-9802"\u003ECVE-2017-9802\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ESome APIs enable the execution of dynamic code by providing it as strings at runtime. These APIs might be useful in some very specific\nmeta-programming use-cases. However most of the time their use is frowned upon as they also increase the risk of \u003Ca\nhref="https://owasp.org/www-community/attacks/Code_Injection"\u003EInjected Code\u003C/a\u003E. Such attacks can either run on the server or in the client (exemple:\nXSS attack) and have a huge impact on an application’s security.\u003C/p\u003E\n\u003Cp\u003EThis rule marks for review each occurrence of the \u003Ca href="https://www.php.net/manual/en/function.eval.php"\u003E\u003Ccode\u003Eeval\u003C/code\u003E function\u003C/a\u003E. This\nrule does not detect code injections. It only highlights the use of APIs which should be used sparingly and very carefully. The goal is to guide\nsecurity code reviews.\u003C/p\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S2053",
      name: "Password hashing functions should use an unpredictable salt",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code contains examples of hard-coded salts.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n$salt = \'salty\';\n$hash = hash_pbkdf2(\'sha256\', $password, $salt, 100000); // Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n$salt = random_bytes(16);\n$hash = hash_pbkdf2(\'sha256\', $password, $salt, 100000);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EThis code ensures that each user’s password has a unique salt value associated with it. It generates a salt randomly and with a length that\nprovides the required security level. It uses a salt length of at least 32 bytes (256 bits), as recommended by industry standards.\u003C/p\u003E\n\u003Cp\u003EHere, the compliant code example ensures the salt is random and has a sufficient length by calling the \u003Ccode\u003Erandom_bytes\u003C/code\u003E function with a\nlength parameter set to 16. This one internally uses a cryptographically secure pseudo random number generator.\u003C/p\u003E',
          context: {
            displayName: "Core PHP",
            key: "core_php",
          },
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EDuring the process of password hashing, an additional component, known as a "salt," is often integrated to bolster the overall security. This salt,\nacting as a defensive measure, primarily wards off certain types of attacks that leverage pre-computed tables to crack passwords.\u003C/p\u003E\n\u003Cp\u003EHowever, potential risks emerge when the salt is deemed insecure. This can occur when the salt is consistently the same across all users or when it\nis too short or predictable. In scenarios where users share the same password and salt, their password hashes will inevitably mirror each other.\nSimilarly, a short salt heightens the probability of multiple users unintentionally having identical salts, which can potentially lead to identical\npassword hashes. These identical hashes streamline the process for potential attackers to recover clear-text passwords. Thus, the emphasis on\nimplementing secure, unique, and sufficiently lengthy salts in password-hashing functions is vital.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EDespite best efforts, even well-guarded systems might have vulnerabilities that could allow an attacker to gain access to the hashed passwords.\nThis could be due to software vulnerabilities, insider threats, or even successful phishing attempts that give attackers the access they need.\u003C/p\u003E\n\u003Cp\u003EOnce the attacker has these hashes, they will likely attempt to crack them using a couple of methods. One is brute force, which entails trying\nevery possible combination until the correct password is found. While this can be time-consuming, having the same salt for all users or a short salt\ncan make the task significantly easier and faster.\u003C/p\u003E\n\u003Cp\u003EIf multiple users have the same password and the same salt, their password hashes would be identical. This means that if an attacker successfully\ncracks one hash, they have effectively cracked all identical ones, granting them access to multiple accounts at once.\u003C/p\u003E\n\u003Cp\u003EA short salt, while less critical than a shared one, still increases the odds of different users having the same salt. This might create clusters\nof password hashes with identical salt that can then be attacked as explained before.\u003C/p\u003E\n\u003Cp\u003EWith short salts, the probability of a collision between two users\' passwords and salts couple might be low depending on the salt size. The shorter\nthe salt, the higher the collision probability. In any case, using longer, cryptographically secure salt should be preferred.\u003C/p\u003E\n\u003Ch3\u003EExceptions\u003C/h3\u003E\n\u003Cp\u003ETo securely store password hashes, it is a recommended to rely on key derivation functions that are computationally intensive. Examples of such\nfunctions are:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Argon2 \u003C/li\u003E\n  \u003Cli\u003E PBKDF2 \u003C/li\u003E\n  \u003Cli\u003E Scrypt \u003C/li\u003E\n  \u003Cli\u003E Bcrypt \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EWhen they are used for password storage, using a secure, random salt is required.\u003C/p\u003E\n\u003Cp\u003EHowever, those functions can also be used for other purposes such as master key derivation or password-based pre-shared key generation. In those\ncases, the implemented cryptographic protocol might require using a fixed salt to derive keys in a deterministic way. In such cases, using a fixed\nsalt is safe and accepted.\u003C/p\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis vulnerability increases the likelihood that attackers are able to compute the cleartext of password hashes.\u003C/p\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://www.owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/759"\u003ECWE-759 - Use of a One-Way Hash without a Salt\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/760"\u003ECWE-760 - Use of a One-Way Hash with a Predictable Salt\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S6348",
      name: "Allowing unfiltered HTML content in WordPress is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EThe \u003Ccode\u003Eunfiltered_html\u003C/code\u003E capability should be granted to trusted roles that need to use markup when publishing dynamic content to the\nWordPress website. If this capability is not required for all users, including administrators and editors roles, then it’s recommended to set\n\u003Ccode\u003EDISALLOW_UNFILTERED_HTML\u003C/code\u003E to \u003Ccode\u003Etrue\u003C/code\u003E.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( \'DISALLOW_UNFILTERED_HTML\', false ); // sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( \'DISALLOW_UNFILTERED_HTML\', true );\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A03_2021-Injection/"\u003ETop 10 2021 Category A3 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)"\u003ETop 10 2017 Category A7 - Cross-Site Scripting\n  (XSS)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/79"\u003ECWE-79 - Improper Neutralization of Input During Web Page Generation (\'Cross-site\n  Scripting\')\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EBy default, the WordPress administrator and editor roles can add unfiltered HTML content in various places, such as post content. This includes the\ncapability to add JavaScript code.\u003C/p\u003E\n\u003Cp\u003EIf an account with such a role gets hijacked, this capability can be used to plant malicious JavaScript code that gets executed whenever somebody\nvisits the website.\u003C/p\u003E",
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E You really need the possibility to add unfiltered HTML with editor or administrator roles. \u003C/li\u003E\n  \u003Cli\u003E There’s a chance that the accounts of authorized users get compromised. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S6345",
      name: "Allowing all external requests from a WordPress server is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EExternal requests initiated by a WordPress server should be considered as security-sensitive. They may contain sensitive data which is stored in\nthe files or in the database of the server. It’s important for the administrator of a WordPress server to understand what they contain and to which\nserver they are sent.\u003C/p\u003E\n\u003Cp\u003EWordPress makes it possible to block external requests by setting the \u003Ccode\u003EWP_HTTP_BLOCK_EXTERNAL\u003C/code\u003E option to \u003Ccode\u003Etrue\u003C/code\u003E. It’s then\npossible to authorize requests to only a few servers using another option named \u003Ccode\u003EWP_ACCESSIBLE_HOSTS\u003C/code\u003E.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Uninstall WordPress plugins which send requests to servers you don’t know. \u003C/li\u003E\n  \u003Cli\u003E Make sure that \u003Ccode\u003EWP_HTTP_BLOCK_EXTERNAL\u003C/code\u003E is defined in \u003Ccode\u003Ewp-config.php\u003C/code\u003E. \u003C/li\u003E\n  \u003Cli\u003E Make sure that \u003Ccode\u003EWP_HTTP_BLOCK_EXTERNAL\u003C/code\u003E is set to \u003Ccode\u003Etrue\u003C/code\u003E. \u003C/li\u003E\n  \u003Cli\u003E Make sure that \u003Ccode\u003EWP_ACCESSIBLE_HOSTS\u003C/code\u003E is configured to authorize requests to the servers you trust. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( \'WP_HTTP_BLOCK_EXTERNAL\', false ); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( \'WP_HTTP_BLOCK_EXTERNAL\', true );\ndefine( \'WP_ACCESSIBLE_HOSTS\', \'api.wordpress.org\' );\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/"\u003ETop 10 2021 Category A10 - Server-Side Request\n  Forgery (SSRF)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://wordpress.org/support/article/editing-wp-config-php/#block-external-url-requestsl"\u003Ewordpress.org\u003C/a\u003E - Block External URL\n  Requests \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://owasp.org/www-community/attacks/Server_Side_Request_Forgery"\u003EOWASP Attack Category\u003C/a\u003E - Server Side Request Forgery \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/918"\u003ECWE-918 - Server-Side Request Forgery (SSRF)\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Your WordPress website contains code which may call external requests to servers you don’t know. \u003C/li\u003E\n  \u003Cli\u003E Your WordPress website may send sensitive data to other servers. \u003C/li\u003E\n  \u003Cli\u003E Your WordPress website uses a lot of plugins or themes. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S6346",
      name: "Allowing unauthenticated database repair in WordPress is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E The database is not currently corrupted. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to this question.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EIt’s recommended to enable automatic database repair mode only in case of database corruption. This feature should be deactivated again when the\ndatabase issue is resolved.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( \'WP_ALLOW_REPAIR\', true ); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\n// The default value is false, so the value does not have to be expilicitly set.\ndefine( \'WP_ALLOW_REPAIR\', false );\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://wordpress.org/support/article/editing-wp-config-php/#automatic-database-optimizing"\u003Ewordpress.org\u003C/a\u003E - Automatic Database\n  Optimizing \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWordPress has a database repair and optimization mode that can be activated by setting \u003Ccode\u003EWP_ALLOW_REPAIR\u003C/code\u003E to \u003Ccode\u003Etrue\u003C/code\u003E in the\nconfiguration.\u003C/p\u003E\n\u003Cp\u003EIf activated, the repair page can be accessed by any user, authenticated or not. This makes sense because if the database is corrupted, the\nauthentication mechanism might not work.\u003C/p\u003E\n\u003Cp\u003EMalicious users could trigger this potentially costly operation repeatadly slowing down the website, and making it unavailable.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S6341",
      name: "WordPress theme and plugin editors are security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWordPress makes it possible to edit theme and plugin files directly in the Administration Screens. While it may look like an easy way to customize\na theme or do a quick change, it’s a dangerous feature. When visiting the theme or plugin editor for the first time, WordPress displays a warning to\nmake it clear that using such a feature may break the web site by mistake. More importantly, users who have access to this feature can trigger the\nexecution of any PHP code and may therefore take full control of the WordPress instance. This security risk could be exploited by an attacker who\nmanages to get access to one of the authorized users. Setting the \u003Ccode\u003EDISALLOW_FILE_EDIT\u003C/code\u003E option to \u003Ccode\u003Etrue\u003C/code\u003E in\n\u003Ccode\u003Ewp-config.php\u003C/code\u003E disables this risky feature. The default value is \u003Ccode\u003Efalse\u003C/code\u003E.\u003C/p\u003E",
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E You really need to use the theme and plugin editors. \u003C/li\u003E\n  \u003Cli\u003E The theme and plugin editors are available to users who cannot be fully trusted. \u003C/li\u003E\n  \u003Cli\u003E There’s a chance that the accounts of authorized users get compromised. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Modify the theme and plugin files using a local editor and deploy them to the server in a secure way. \u003C/li\u003E\n  \u003Cli\u003E Make sure that \u003Ccode\u003EDISALLOW_FILE_EDIT\u003C/code\u003E is defined in \u003Ccode\u003Ewp-config.php\u003C/code\u003E. \u003C/li\u003E\n  \u003Cli\u003E Make sure that \u003Ccode\u003EDISALLOW_FILE_EDIT\u003C/code\u003E is set to \u003Ccode\u003Etrue\u003C/code\u003E. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( \'DISALLOW_FILE_EDIT\', false ); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( \'DISALLOW_FILE_EDIT\', true );\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A03_2021-Injection/"\u003ETop 10 2021 Category A3 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A04_2021-Insecure_Design/"\u003ETop 10 2021 Category A4 - Insecure Design\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://wordpress.org/support/article/editing-wp-config-php/#disable-the-plugin-and-theme-editor"\u003Ewordpress.org\u003C/a\u003E - Disable the\n  Plugin and Theme Editor \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A1_2017-Injection"\u003ETop 10 2017 Category A1 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)"\u003ETop 10 2017 Category A7 - Cross-Site Scripting\n  (XSS)\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/79"\u003ECWE-79 - Improper Neutralization of Input During Web Page Generation (\'Cross-site\n  Scripting\')\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/94"\u003ECWE-94 - Improper Control of Generation of Code (\'Code Injection\')\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/95"\u003ECWE-95 - Improper Neutralization of Directives in Dynamically Evaluated Code (\'Eval\n  Injection\')\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S6343",
      name: "Disabling automatic updates is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EAutomatic updates are a great way of making sure your application gets security updates as soon as they are available. Once a vendor releases a\nsecurity update, it is crucial to apply it in a timely manner before malicious actors exploit the vulnerability. Relying on manual updates is usually\ntoo late, especially if the application is publicly accessible on the internet.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EDon’t deactivate automatic updates unless you have a good reason to do so. This way, you’ll be sure to receive security updates as soon as they are\navailable. If you are worried about an automatic update breaking something, check if it is possible to only activate automatic updates for minor or\nsecurity updates.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( 'WP_AUTO_UPDATE_CORE', false ); // Sensitive\ndefine( 'AUTOMATIC_UPDATER_DISABLED', true ); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\ndefine( 'WP_AUTO_UPDATE_CORE', true ); // Minor and major automatic updates enabled\ndefine( 'WP_AUTO_UPDATE_CORE', 'minor' ); // Only minor updates are enabled\ndefine( 'AUTOMATIC_UPDATER_DISABLED', false );\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A05_2021-Security_Misconfiguration/\"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"https://wordpress.org/support/article/editing-wp-config-php/#disable-wordpress-auto-updates\"\u003EWordpress.org\u003C/a\u003E - Disable WordPress\n  Auto Updates \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration\"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E there is no specific reason for deactivating all automatic updates. \u003C/li\u003E\n  \u003Cli\u003E you meant to deactivate only automatic major updates. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S1313",
      name: "Using hardcoded IP addresses is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EDon’t hard-code the IP address in the source code, instead make it configurable with environment variables, configuration files, or a similar\napproach. Alternatively, if confidentially is not required a domain name can be used since it allows to change the destination quickly without having\nto rebuild the software.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);\nsocket_connect($socket, \'8.8.8.8\', 23);  // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\n$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);\nsocket_connect($socket, IP_ADDRESS, 23);  // Compliant\n\u003C/pre\u003E\n\u003Ch2\u003EExceptions\u003C/h2\u003E\n\u003Cp\u003ENo issue is reported for the following cases because they are not considered sensitive:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Loopback addresses 127.0.0.0/8 in CIDR notation (from 127.0.0.0 to 127.255.255.255) \u003C/li\u003E\n  \u003Cli\u003E Broadcast address 255.255.255.255 \u003C/li\u003E\n  \u003Cli\u003E Non-routable address 0.0.0.0 \u003C/li\u003E\n  \u003Cli\u003E Strings of the form \u003Ccode\u003E2.5.&lt;number&gt;.&lt;number&gt;\u003C/code\u003E as they \u003Ca href="http://www.oid-info.com/introduction.htm"\u003Eoften match\n  Object Identifiers\u003C/a\u003E (OID) \u003C/li\u003E\n  \u003Cli\u003E Addresses in the ranges 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24, reserved for documentation purposes by \u003Ca\n  href="https://datatracker.ietf.org/doc/html/rfc5737"\u003ERFC 5737\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E Addresses in the range 2001:db8::/32, reserved for documentation purposes by \u003Ca href="https://datatracker.ietf.org/doc/html/rfc3849"\u003ERFC\n  3849\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/"\u003ETop 10 2021 Category A1 - Broken Access Control\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cp\u003EThe disclosed IP address is sensitive, e.g.:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Can give information to an attacker about the network topology. \u003C/li\u003E\n  \u003Cli\u003E It’s a personal (assigned to an identifiable person) IP address. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of these questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EHardcoding IP addresses is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2006-5901"\u003ECVE-2006-5901\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2005-3725"\u003ECVE-2005-3725\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EToday’s services have an ever-changing architecture due to their scaling and redundancy needs. It is a mistake to think that a service will always\nhave the same IP address. When it does change, the hardcoded IP will have to be modified too. This will have an impact on the product development,\ndelivery, and deployment:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E The developers will have to do a rapid fix every time this happens, instead of having an operation team change a configuration file. \u003C/li\u003E\n  \u003Cli\u003E It misleads to use the same address in every environment (dev, sys, qa, prod). \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ELast but not least it has an effect on application security. Attackers might be able to decompile the code and thereby discover a potentially\nsensitive address. They can perform a Denial of Service attack on the service, try to get access to the system, or try to spoof the IP address to\nbypass security checks. Such attacks can always be possible, but in the case of a hardcoded IP address solving the issue will take more time, which\nwill increase an attack’s impact.\u003C/p\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4828",
      name: "Signaling processes is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E For stateful applications with user management, ensure that only administrators trigger this code. \u003C/li\u003E\n  \u003Cli\u003E Verify that the \u003Ccode\u003Epid\u003C/code\u003E and \u003Ccode\u003Esig\u003C/code\u003E parameters are correct before using them. \u003C/li\u003E\n  \u003Cli\u003E Ensure that the process sending the signals runs with as few OS privileges as possible. \u003C/li\u003E\n  \u003Cli\u003E Isolate the process on the system based on its (E)UID. \u003C/li\u003E\n  \u003Cli\u003E Ensure that the signal does not interrupt any essential functions when intercepted by a target’s signal handlers. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n$targetPid = (int)$_GET["pid"];\nposix_kill($targetPid, 9); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\n$targetPid = (int)$_GET["pid"];\n\n// Validate the untrusted PID,\n// With a pre-approved list or authorization checks\nif (isValidPid($targetPid)) {\n    posix_kill($targetPid, 9);\n}\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/283"\u003ECWE-283 - Unverified Ownership\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://man7.org/linux/man-pages/man1/kill.1.html"\u003Ekill(1) — Linux manual page\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://man7.org/linux/man-pages/man2/kill.2.html"\u003Ekill(2) — Linux manual page\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E The parameters \u003Ccode\u003Epid\u003C/code\u003E and \u003Ccode\u003Esig\u003C/code\u003E are untrusted (they come from an external source). \u003C/li\u003E\n  \u003Cli\u003E This function is triggered by non-administrators. \u003C/li\u003E\n  \u003Cli\u003E Signal handlers on the target processes stop important functions. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ESignaling processes or process groups can seriously affect the stability of this application or other applications on the same system.\u003C/p\u003E\n\u003Cp\u003EAccidentally setting an incorrect \u003Ccode\u003EPID\u003C/code\u003E or \u003Ccode\u003Esignal\u003C/code\u003E or allowing untrusted sources to assign arbitrary values to these\nparameters may result in a denial of service.\u003C/p\u003E\n\u003Cp\u003EAlso, the system treats the signal differently if the destination \u003Ccode\u003EPID\u003C/code\u003E is less than or equal to 0. This different behavior may affect\nmultiple processes with the same (E)UID simultaneously if the call is left uncontrolled.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4829",
      name: "Reading the Standard Input is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E data read from the standard input is not sanitized before being used. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EYou are at risk if you answered yes to this question.\u003C/p\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EReading Standard Input is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2005-2337"\u003ECVE-2005-2337\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-11449"\u003ECVE-2017-11449\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIt is common for attackers to craft inputs enabling them to exploit software vulnerabilities. Thus any data read from the standard input (stdin)\ncan be dangerous and should be validated.\u003C/p\u003E\n\u003Cp\u003EThis rule flags code that reads from the standard input.\u003C/p\u003E',
        },
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003E\u003Ca href=\"https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet\"\u003ESanitize\u003C/a\u003E all data read from the standard input before using it.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cpre\u003E\n// Any reference to STDIN is Sensitive\n$varstdin = STDIN; // Sensitive\nstream_get_line(STDIN, 40); // Sensitive\nstream_copy_to_stream(STDIN, STDOUT); // Sensitive\n// ...\n\n\n// Except those references as they can't create an injection vulnerability.\nftruncate(STDIN, 5); // OK\nftell(STDIN); // OK\nfeof(STDIN); // OK\nfseek(STDIN, 5); // OK\nfclose(STDIN); // OK\n\n\n// STDIN can also be referenced like this\n$mystdin = 'php://stdin'; // Sensitive\n\nfile_get_contents('php://stdin'); // Sensitive\nreadfile('php://stdin'); // Sensitive\n\n$input = fopen('php://stdin', 'r'); // Sensitive\nfclose($input); // OK\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/20\"\u003ECWE-20 - Improper Input Validation\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4823",
      name: "Using command line arguments is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EUsing command line arguments is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7281"\u003ECVE-2018-7281\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-12326"\u003ECVE-2018-12326\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2011-3198"\u003ECVE-2011-3198\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003ECommand line arguments can be dangerous just like any other user input. They should never be used without being first validated and sanitized.\u003C/p\u003E\n\u003Cp\u003ERemember also that any user can retrieve the list of processes running on a system, which makes the arguments provided to them visible. Thus\npassing sensitive information via command line arguments should be considered as insecure.\u003C/p\u003E\n\u003Cp\u003EThis rule raises an issue when on every program entry points (\u003Ccode\u003Emain\u003C/code\u003E methods) when command line arguments are used. The goal is to guide\nsecurity code reviews.\u003C/p\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E any of the command line arguments are used without being sanitized first. \u003C/li\u003E\n  \u003Cli\u003E your application accepts sensitive information via command line arguments. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIf you answered yes to any of these questions you are at risk.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003E\u003Ca href=\"https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet\"\u003ESanitize\u003C/a\u003E all command line arguments before using them.\u003C/p\u003E\n\u003Cp\u003EAny user or application can list running processes and see the command line arguments they were started with. There are safer ways of providing\nsensitive information to an application than exposing them in the command line. It is common to write them on the process' standard input, or give the\npath to a file containing the information.\u003C/p\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EBuiltin access to \u003Ccode\u003E$argv\u003C/code\u003E\u003C/p\u003E\n\u003Cpre\u003E\nfunction globfunc() {\n    global $argv; // Sensitive. Reference to global $argv\n    foreach ($argv as $arg) { // Sensitive.\n        // ...\n    }\n}\n\nfunction myfunc($argv) {\n    $param = $argv[0]; // OK. Reference to local $argv parameter\n    // ...\n}\n\nforeach ($argv as $arg) { // Sensitive. Reference to $argv.\n    // ...\n}\n\n$myargv = $_SERVER['argv']; // Sensitive. Equivalent to $argv.\n\nfunction serve() {\n    $myargv = $_SERVER['argv']; // Sensitive.\n    // ...\n}\n\nmyfunc($argv); // Sensitive\n\n$myvar = $HTTP_SERVER_VARS[0]; // Sensitive. Note: HTTP_SERVER_VARS has ben removed since PHP 5.4.\n\n$options = getopt('a:b:'); // Sensitive. Parsing arguments.\n\n$GLOBALS[\"argv\"]; // Sensitive. Equivalent to $argv.\n\nfunction myglobals() {\n    $GLOBALS[\"argv\"]; // Sensitive\n}\n\n$argv = [1,2,3]; // Sensitive. It is a bad idea to override argv.\n\u003C/pre\u003E\n\u003Cp\u003EZend Console\u003C/p\u003E\n\u003Cpre\u003E\nnew Zend\\Console\\Getopt(['myopt|m' =&gt; 'this is an option']); // Sensitive\n\u003C/pre\u003E\n\u003Cp\u003EGetopt-php library\u003C/p\u003E\n\u003Cpre\u003E\nnew \\GetOpt\\Option('m', 'myoption', \\GetOpt\\GetOpt::REQUIRED_ARGUMENT); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A1_2017-Injection\"\u003ETop 10 2017 Category A1 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/88\"\u003ECWE-88 - Argument Injection or Modification\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/214\"\u003ECWE-214 - Information Exposure Through Process Environment\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S4830",
      name: "Server certificates should be verified during SSL/TLS connections",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ETransport Layer Security (TLS) provides secure communication between systems over the internet by encrypting the data sent between them.\nCertificate validation adds an extra layer of trust and security to this process to ensure that a system is indeed the one it claims to be.\u003C/p\u003E\n\u003Cp\u003EWhen certificate validation is disabled, the client skips a critical security check. This creates an opportunity for attackers to pose as a trusted\nentity and intercept, manipulate, or steal the data being transmitted.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EEstablishing trust in a secure way is a non-trivial task. When you disable certificate validation, you are removing a key mechanism designed to\nbuild this trust in internet communication, opening your system up to a number of potential threats.\u003C/p\u003E\n\u003Ch4\u003EIdentity spoofing\u003C/h4\u003E\n\u003Cp\u003EIf a system does not validate certificates, it cannot confirm the identity of the other party involved in the communication. An attacker can\nexploit this by creating a fake server and masquerading as a legitimate one. For example, they might set up a server that looks like your bank’s\nserver, tricking your system into thinking it is communicating with the bank. This scenario, called identity spoofing, allows the attacker to collect\nany data your system sends to them, potentially leading to significant data breaches.\u003C/p\u003E\n\u003Ch4\u003ELoss of data integrity\u003C/h4\u003E\n\u003Cp\u003EWhen TLS certificate validation is disabled, the integrity of the data you send and receive cannot be guaranteed. An attacker could modify the data\nin transit, and you would have no way of knowing. This could range from subtle manipulations of the data you receive to the injection of malicious\ncode or malware into your system. The consequences of such breaches of data integrity can be severe, depending on the nature of the data and the\nsystem.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code contains examples of disabled certificate validation.\u003C/p\u003E\n\u003Cp\u003EThe certificate validation gets disabled by setting \u003Ccode\u003ECURLOPT_SSL_VERIFYPEER\u003C/code\u003E to \u003Ccode\u003Efalse\u003C/code\u003E. To enable validation set the value\nto \u003Ccode\u003Etrue\u003C/code\u003E or do not set \u003Ccode\u003ECURLOPT_SSL_VERIFYPEER\u003C/code\u003E at all to use the secure default value.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\n$curl = curl_init();\ncurl_setopt($curl, CURLOPT_URL, \'https://example.com/\');\ncurl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // Noncompliant\ncurl_exec($curl);\ncurl_close($curl);\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\n$curl = curl_init();\ncurl_setopt($curl, CURLOPT_URL, \'https://example.com/\');\ncurl_exec($curl);\ncurl_close($curl);\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAddressing the vulnerability of disabled TLS certificate validation primarily involves re-enabling the default validation.\u003C/p\u003E\n\u003Cp\u003ETo avoid running into problems with invalid certificates, consider the following sections.\u003C/p\u003E\n\u003Ch4\u003EUsing trusted certificates\u003C/h4\u003E\n\u003Cp\u003EIf possible, always use a certificate issued by a well-known, trusted CA for your server. Most programming environments come with a predefined list\nof trusted root CAs, and certificates issued by these authorities are validated automatically. This is the best practice, and it requires no\nadditional code or configuration.\u003C/p\u003E\n\u003Ch4\u003EWorking with self-signed certificates or non-standard CAs\u003C/h4\u003E\n\u003Cp\u003EIn some cases, you might need to work with a server using a self-signed certificate, or a certificate issued by a CA not included in your trusted\nroots. Rather than disabling certificate validation in your code, you can add the necessary certificates to your trust store.\u003C/p\u003E',
          context: {
            displayName: "cURL",
            key: "curl",
          },
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-mobile-top-10/2016-risks/m3-insecure-communication"\u003EMobile Top 10 2016 Category M3 - Insecure\n  Communication\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://mobile-security.gitbook.io/masvs/security-requirements/0x10-v5-network_communication_requirements"\u003EMobile AppSec\n  Verification Standard - Network Communication Requirements\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/295"\u003ECWE-295 - Improper Certificate Validation\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EThis vulnerability makes it possible that an encrypted communication is intercepted.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "php:S6339",
      name: "Secret keys and salt values should be robust",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003ESecret keys are used in combination with an algorithm to encrypt data. A typical use case is an authentication system. For such a system to be\nsecure, the secret key should have a value which cannot be guessed and which is long enough to not be vulnerable to brute-force attacks.\u003C/p\u003E\n\u003Cp\u003EA \"salt\" is an extra piece of data which is included when hashing data such as a password. Its value should have the same properties as a secret\nkey.\u003C/p\u003E\n\u003Cp\u003EThis rule raises an issue when it detects that a secret key or a salt has a predictable value or that it’s not long enough.\u003C/p\u003E\n\u003Ch3\u003ENoncompliant code example\u003C/h3\u003E\n\u003Cp\u003EWordPress:\u003C/p\u003E\n\u003Cpre\u003E\ndefine('AUTH_KEY', 'hello'); // Noncompliant\ndefine('AUTH_SALT', 'hello'); // Noncompliant\ndefine('AUTH_KEY', 'put your unique phrase here'); // Noncompliant, this is the default value\n\u003C/pre\u003E\n\u003Ch3\u003ECompliant solution\u003C/h3\u003E\n\u003Cp\u003EWordPress:\u003C/p\u003E\n\u003Cpre\u003E\ndefine('AUTH_KEY', 'D&amp;ovlU#|CvJ##uNq}bel+^MFtT&amp;.b9{UvR]g%ixsXhGlRJ7q!h}XWdEC[BOKXssj');\ndefine('AUTH_SALT', 'FIsAsXJKL5ZlQo)iD-pt??eUbdc{_Cn&lt;4!d~yqz))&amp;B D?AwK%)+)F2aNwI|siOe');\n\u003C/pre\u003E",
        },
        {
          key: "resources",
          content:
            '\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"\u003ETop 10 2021 Category A2 - Cryptographic Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://wordpress.org/support/article/editing-wp-config-php/#security-keys"\u003Ewordpress.org\u003C/a\u003E - WordPress Security Keys \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S5808",
      name: "Authorizations should be based on strong decisions",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EAccess control is a critical aspect of web frameworks that ensures proper authorization and restricts access to sensitive resources or actions. To\nenable access control, web frameworks offer components that are responsible for evaluating user permissions and making access control decisions. They\nmight examine the user’s credentials, such as roles or privileges, and compare them against predefined rules or policies to determine whether the user\nshould be granted access to a specific resource or action.\u003C/p\u003E\n\u003Cp\u003EConventionally, these checks should never grant access to every request received. If an endpoint or component is meant to be public, then it should\nbe ignored by access control components. Conversely, if an endpoint should deny some users from accessing it, then access control has to be configured\ncorrectly for this endpoint.\u003C/p\u003E\n\u003Cp\u003EGranting unrestricted access to all users can lead to security vulnerabilities and potential misuse of critical functionalities. It is important to\ncarefully assess access decisions based on factors such as user roles, resource sensitivity, and business requirements. Implementing a robust and\ngranular access control mechanism is crucial for the security and integrity of the web application itself and its surrounding environment.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003ENot verifying user access strictly can introduce significant security risks. Some of the most prominent risks are listed below. Depending on the\nuse case, it is very likely that other risks are introduced on top of the ones listed.\u003C/p\u003E\n\u003Ch4\u003EUnauthorized access\u003C/h4\u003E\n\u003Cp\u003EAs the access of users is not checked strictly, it becomes very easy for an attacker to gain access to restricted areas or functionalities,\npotentially compromising the confidentiality, integrity, and availability of sensitive resources. They may exploit this access to perform malicious\nactions, such as modifying or deleting data, impersonating legitimate users, or gaining administrative privileges, ultimately compromising the\nsecurity of the system.\u003C/p\u003E\n\u003Ch4\u003ETheft of sensitive data\u003C/h4\u003E\n\u003Cp\u003ETheft of sensitive data can result from incorrect access control if attackers manage to gain access to databases, file systems, or other storage\nmechanisms where sensitive data is stored. This can lead to the theft of personally identifiable information (PII), financial data, intellectual\nproperty, or other confidential information. The stolen data can be used for various malicious purposes, such as identity theft, financial fraud, or\nselling the data on the black market, causing significant harm to individuals and organizations affected by the breach.\u003C/p\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EThe \u003Ccode\u003Evote\u003C/code\u003E method of a \u003Ca href="https://symfony.com/doc/current/security/voters.html"\u003EVoterInterface\u003C/a\u003E implementation is not compliant\nwhen it returns only an affirmative decision (\u003Ccode\u003EACCESS_GRANTED\u003C/code\u003E):\u003C/p\u003E\n\u003Cpre data-diff-id="201" data-diff-type="noncompliant"\u003E\nclass NoncompliantVoter implements VoterInterface\n{\n    public function vote(TokenInterface $token, $subject, array $attributes)\n    {\n        return self::ACCESS_GRANTED; // Noncompliant\n    }\n}\n\u003C/pre\u003E\n\u003Cp\u003EThe \u003Ccode\u003EvoteOnAttribute\u003C/code\u003E method of a \u003Ca href="https://symfony.com/doc/current/security/voters.html"\u003EVoter\u003C/a\u003E class is not compliant when\nit returns only an affirmative decision (\u003Ccode\u003Etrue\u003C/code\u003E):\u003C/p\u003E\n\u003Cpre data-diff-id="202" data-diff-type="noncompliant"\u003E\nclass NoncompliantVoter extends Voter\n{\n    protected function supports(string $attribute, $subject)\n    {\n        return true;\n    }\n\n    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)\n    {\n        return true; // Noncompliant\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EThe \u003Ccode\u003Evote\u003C/code\u003E method of a \u003Ca href="https://symfony.com/doc/current/security/voters.html"\u003EVoterInterface\u003C/a\u003E type should return a negative\ndecision (\u003Ccode\u003EACCESS_DENIED\u003C/code\u003E) or abstain from making a decision (\u003Ccode\u003EACCESS_ABSTAIN\u003C/code\u003E):\u003C/p\u003E\n\u003Cpre data-diff-id="201" data-diff-type="compliant"\u003E\nclass CompliantVoter implements VoterInterface\n{\n    public function vote(TokenInterface $token, $subject, array $attributes)\n    {\n        if (foo()) {\n            return self::ACCESS_GRANTED;\n        } else if (bar()) {\n            return self::ACCESS_ABSTAIN;\n        }\n        return self::ACCESS_DENIED;\n    }\n}\n\u003C/pre\u003E\n\u003Cp\u003EThe \u003Ccode\u003EvoteOnAttribute\u003C/code\u003E method of a \u003Ca href="https://symfony.com/doc/current/security/voters.html"\u003EVoter\u003C/a\u003E type should return a negative\ndecision (\u003Ccode\u003Efalse\u003C/code\u003E):\u003C/p\u003E\n\u003Cpre data-diff-id="202" data-diff-type="compliant"\u003E\nclass CompliantVoter extends Voter\n{\n    protected function supports(string $attribute, $subject)\n    {\n        return true;\n    }\n\n    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)\n    {\n        if (foo()) {\n            return true;\n        }\n        return false;\n    }\n}\n\u003C/pre\u003E',
          context: {
            displayName: "Symfony",
            key: "symfony",
          },
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cp\u003EThe \u003Ccode\u003Edefine\u003C/code\u003E, \u003Ccode\u003Ebefore\u003C/code\u003E, and \u003Ccode\u003Eafter\u003C/code\u003E methods of a \u003Ca\nhref="https://laravel.com/docs/master/authorization#gates"\u003EGate\u003C/a\u003E are not compliant when they return only an affirmative decision (\u003Ccode\u003Etrue\u003C/code\u003E\nor \u003Ccode\u003EResponse::allow()\u003C/code\u003E):\u003C/p\u003E\n\u003Cpre data-diff-id="101" data-diff-type="noncompliant"\u003E\nclass NoncompliantGuard\n{\n    public function boot()\n    {\n        Gate::define(\'xxx\', function ($user) {\n            return true; // Noncompliant\n        });\n\n        Gate::define(\'xxx\', function ($user) {\n            return Response::allow(); // Noncompliant\n        });\n    }\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cp\u003EThe \u003Ccode\u003Edefine\u003C/code\u003E, \u003Ccode\u003Ebefore\u003C/code\u003E, and \u003Ccode\u003Eafter\u003C/code\u003E methods of a \u003Ca\nhref="https://laravel.com/docs/master/authorization#gates"\u003EGate\u003C/a\u003E should return a negative decision (\u003Ccode\u003Efalse\u003C/code\u003E or\n\u003Ccode\u003EResponse::deny()\u003C/code\u003E) or abstain from making a decision (\u003Ccode\u003Enull\u003C/code\u003E):\u003C/p\u003E\n\u003Cpre data-diff-id="101" data-diff-type="compliant"\u003E\nclass CompliantGuard\n{\n    public function boot()\n    {\n        Gate::define(\'xxx\', function ($user) {\n            if (foo()) {\n                return true;\n            }\n            return false;\n        });\n\n        Gate::define(\'xxx\', function ($user) {\n            if (foo()) {\n                return Response::allow();\n            }\n            return Response::deny();\n        });\n    }\n}\n\u003C/pre\u003E',
          context: {
            displayName: "Laravel",
            key: "laravel",
          },
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/"\u003ETop 10 2021 Category A1 - Broken Access Control\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control"\u003ETop 10 2017 Category A5 - Broken Access Control\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/285"\u003ECWE-285 - Improper Authorization\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "introduction",
          content:
            "\u003Cp\u003EWhen granting users access to resources of an application, such an authorization should be based on strong decisions. For instance, a user may be\nauthorized to access a resource only if they are authenticated, or if they have the correct role and privileges.\u003C/p\u003E",
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.Medium,
        },
      ],
    },
    {
      key: "php:S4834",
      name: "Controlling permissions is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EThis rule is deprecated, and will eventually be removed.\u003C/p\u003E\n\u003Cp\u003EThe access control of an application must be properly implemented in order to restrict access to resources to authorized entities otherwise this\ncould lead to vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-12999"\u003ECVE-2018-12999\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-10285"\u003ECVE-2018-10285\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-7455"\u003ECVE-2017-7455\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EGranting correct permissions to users, applications, groups or roles and defining required permissions that allow access to a resource is\nsensitive, must therefore be done with care. For instance, it is obvious that only users with administrator privilege should be authorized to\nadd/remove the administrator permission of another user.\u003C/p\u003E',
        },
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cp\u003EAt minimum, an access control system should:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Use a well-defined access control model like \u003Ca href="https://en.wikipedia.org/wiki/Role-based_access_control"\u003ERBAC\u003C/a\u003E or \u003Ca\n  href="https://en.wikipedia.org/wiki/Access-control_list"\u003EACL\u003C/a\u003E. \u003C/li\u003E\n  \u003Cli\u003E Entities\' permissions should be reviewed regularly to remove permissions that are no longer needed. \u003C/li\u003E\n  \u003Cli\u003E Respect \u003Ca href="https://en.wikipedia.org/wiki/Principle_of_least_privilege"\u003Ethe principle of least privilege\u003C/a\u003E ("\u003Cem\u003Ean entity has access\n  only the information and resources that are necessary for its legitimate purpose\u003C/em\u003E"). \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003ECakePHP\u003C/p\u003E\n\u003Cpre\u003E\nuse Cake\\Auth\\BaseAuthorize;\nuse Cake\\Controller\\Controller;\n\nabstract class MyAuthorize extends BaseAuthorize { // Sensitive. Method extending Cake\\Auth\\BaseAuthorize.\n    // ...\n}\n\n// Note that "isAuthorized" methods will only be detected in direct subclasses of Cake\\Controller\\Controller.\nabstract class MyController extends Controller {\n    public function isAuthorized($user) { // Sensitive. Method called isAuthorized in a Cake\\Controller\\Controller.\n        return false;\n    }\n}\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control"\u003ETop 10 2017 Category A5 - Broken Access Control\u003C/a\u003E\n  \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/276"\u003ECWE-276 - Incorrect Default Permissions\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/732"\u003ECWE-732 - Incorrect Permission Assignment for Critical Resource\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/668"\u003ECWE-668 - Exposure of Resource to Wrong Sphere\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/277"\u003ECWE-277 - Insecure Inherited Permissions\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "assess_the_problem",
          content:
            "\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Granted permission to an entity (user, application) allow access to information or functionalities not needed by this entity. \u003C/li\u003E\n  \u003Cli\u003E Privileges are easily acquired (eg: based on the location of the user, type of device used, defined by third parties, does not require approval\n  …​). \u003C/li\u003E\n  \u003Cli\u003E Inherited permission, default permission, no privileges (eg: anonymous user) is authorized to access to a protected resource. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E",
        },
      ],
      impacts: [],
    },
    {
      key: "php:S5122",
      name: "Having a permissive Cross-Origin Resource Sharing policy is security-sensitive",
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "assess_the_problem",
          content:
            '\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E You don’t trust the origin specified, example: \u003Ccode\u003EAccess-Control-Allow-Origin: untrustedwebsite.com\u003C/code\u003E. \u003C/li\u003E\n  \u003Cli\u003E Access control policy is entirely disabled: \u003Ccode\u003EAccess-Control-Allow-Origin: *\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E Your access control policy is dynamically defined by a user-controlled input like \u003Ca\n  href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin"\u003E\u003Ccode\u003Eorigin\u003C/code\u003E\u003C/a\u003E header. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E',
        },
        {
          key: "how_to_fix",
          content:
            "\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E The \u003Ccode\u003EAccess-Control-Allow-Origin\u003C/code\u003E header should be set only for a trusted origin and for specific resources. \u003C/li\u003E\n  \u003Cli\u003E Allow only selected, trusted domains in the \u003Ccode\u003EAccess-Control-Allow-Origin\u003C/code\u003E header. Prefer whitelisting domains over blacklisting or\n  allowing any domain (do not use * wildcard nor blindly return the \u003Ccode\u003EOrigin\u003C/code\u003E header content without any checks). \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EPHP built-in header function:\u003C/p\u003E\n\u003Cpre\u003E\nheader(\"Access-Control-Allow-Origin: *\"); // Sensitive\n\u003C/pre\u003E\n\u003Cp\u003ELaravel:\u003C/p\u003E\n\u003Cpre\u003E\nresponse()-&gt;header('Access-Control-Allow-Origin', \"*\"); // Sensitive\n\u003C/pre\u003E\n\u003Cp\u003ESymfony:\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Component\\HttpFoundation\\Response;\n\n$response = new Response(\n    'Content',\n    Response::HTTP_OK,\n    ['Access-Control-Allow-Origin' =&gt; '*'] // Sensitive\n);\n$response-&gt;headers-&gt;set('Access-Control-Allow-Origin', '*'); // Sensitive\n\u003C/pre\u003E\n\u003Cp\u003EUser-controlled origin:\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Component\\HttpFoundation\\Response;\nuse Symfony\\Component\\HttpFoundation\\Request;\n\n$origin = $request-&gt;headers-&gt;get('Origin');\n\n$response-&gt;headers-&gt;set('Access-Control-Allow-Origin', $origin); // Sensitive\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cp\u003EPHP built-in header function:\u003C/p\u003E\n\u003Cpre\u003E\nheader(\"Access-Control-Allow-Origin: $trusteddomain\");\n\u003C/pre\u003E\n\u003Cp\u003ELaravel:\u003C/p\u003E\n\u003Cpre\u003E\nresponse()-&gt;header('Access-Control-Allow-Origin', $trusteddomain);\n\u003C/pre\u003E\n\u003Cp\u003ESymfony:\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Component\\HttpFoundation\\Response;\n\n$response = new Response(\n    'Content',\n    Response::HTTP_OK,\n    ['Access-Control-Allow-Origin' =&gt; $trusteddomain]\n);\n\n$response-&gt;headers-&gt;set('Access-Control-Allow-Origin', $trusteddomain);\n\u003C/pre\u003E\n\u003Cp\u003EUser-controlled origin validated with an allow-list:\u003C/p\u003E\n\u003Cpre\u003E\nuse Symfony\\Component\\HttpFoundation\\Response;\nuse Symfony\\Component\\HttpFoundation\\Request;\n\n$origin = $request-&gt;headers-&gt;get('Origin');\n\nif (in_array($origin, $trustedOrigins)) {\n    $response-&gt;headers-&gt;set('Access-Control-Allow-Origin', $origin);\n}\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A05_2021-Security_Misconfiguration/\"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/\"\u003ETop 10 2021 Category A7 - Identification and\n  Authentication Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS\"\u003Edeveloper.mozilla.org\u003C/a\u003E - CORS \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy\"\u003Edeveloper.mozilla.org\u003C/a\u003E - Same origin policy \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href=\"https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration\"\u003ETop 10 2017 Category A6 - Security\n  Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href=\"https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#cross-origin-resource-sharing\"\u003EOWASP HTML5 Security\n  Cheat Sheet\u003C/a\u003E - Cross Origin Resource Sharing \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/346\"\u003ECWE-346 - Origin Validation Error\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href=\"https://cwe.mitre.org/data/definitions/942\"\u003ECWE-942 - Overly Permissive Cross-domain Whitelist\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EHaving a permissive Cross-Origin Resource Sharing policy is security-sensitive. It has led in the past to the following vulnerabilities:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-0269"\u003ECVE-2018-0269\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-14460"\u003ECVE-2017-14460\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003E\u003Ca href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"\u003ESame origin policy\u003C/a\u003E in browsers prevents, by default and for\nsecurity-reasons, a javascript frontend to perform a cross-origin HTTP request to a resource that has a different origin (domain, protocol, or port)\nfrom its own. The requested target can append additional HTTP headers in response, called \u003Ca\nhref="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"\u003ECORS\u003C/a\u003E, that act like directives for the browser and change the access control policy\n/ relax the same origin policy.\u003C/p\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "php:S2092",
      name: 'Creating cookies without the "secure" flag is security-sensitive',
      type: RawType.SecurityHotspot,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Ch2\u003ERecommended Secure Coding Practices\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E It is recommended to use \u003Ccode\u003EHTTPs\u003C/code\u003E everywhere so setting the \u003Ccode\u003Esecure\u003C/code\u003E flag to \u003Cem\u003Etrue\u003C/em\u003E should be the default behaviour\n  when creating cookies. \u003C/li\u003E\n  \u003Cli\u003E Set the \u003Ccode\u003Esecure\u003C/code\u003E flag to \u003Cem\u003Etrue\u003C/em\u003E for session-cookies. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch2\u003ESensitive Code Example\u003C/h2\u003E\n\u003Cp\u003EIn \u003Cem\u003Ephp.ini\u003C/em\u003E you can specify the flags for the session cookie which is security-sensitive:\u003C/p\u003E\n\u003Cpre\u003E\nsession.cookie_secure = 0; // Sensitive: this security-sensitive session cookie is created with the secure flag set to false (cookie_secure = 0)\n\u003C/pre\u003E\n\u003Cp\u003ESame thing in PHP code:\u003C/p\u003E\n\u003Cpre\u003E\nsession_set_cookie_params($lifetime, $path, $domain, false);\n// Sensitive: this security-sensitive session cookie is created with the secure flag (the fourth argument) set to _false_\n\u003C/pre\u003E\n\u003Cp\u003EIf you create a custom security-sensitive cookie in your PHP code:\u003C/p\u003E\n\u003Cpre\u003E\n$value = "sensitive data";\nsetcookie($name, $value, $expire, $path, $domain, false);  // Sensitive: a security-sensitive cookie is created with the secure flag  (the sixth argument) set to _false_\n\u003C/pre\u003E\n\u003Cp\u003EBy default \u003Ca href="https://www.php.net/manual/en/function.setcookie.php"\u003E\u003Ccode\u003Esetcookie\u003C/code\u003E\u003C/a\u003E and \u003Ca\nhref="https://www.php.net/manual/en/function.setrawcookie.php"\u003E\u003Ccode\u003Esetrawcookie\u003C/code\u003E\u003C/a\u003E functions set the sixth argument / \u003Ccode\u003Esecure\u003C/code\u003E\nflag to \u003Cem\u003Efalse:\u003C/em\u003E\u003C/p\u003E\n\u003Cpre\u003E\n$value = "sensitive data";\nsetcookie($name, $value, $expire, $path, $domain);  // Sensitive: a security-sensitive cookie is created with the secure flag (the sixth argument) not defined (by default to false)\nsetrawcookie($name, $value, $expire, $path, $domain);  // Sensitive: a security-sensitive cookie is created with the secure flag (the sixth argument) not defined (by default to false)\n\u003C/pre\u003E\n\u003Ch2\u003ECompliant Solution\u003C/h2\u003E\n\u003Cpre\u003E\nsession.cookie_secure = 1; // Compliant: the sensitive cookie will not be send during an unencrypted HTTP request thanks to cookie_secure property set to 1\n\u003C/pre\u003E\n\u003Cpre\u003E\nsession_set_cookie_params($lifetime, $path, $domain, true); // Compliant: the sensitive cookie will not be send during an unencrypted HTTP request thanks to the secure flag (the fouth argument) set to true\n\u003C/pre\u003E\n\u003Cpre\u003E\n$value = "sensitive data";\nsetcookie($name, $value, $expire, $path, $domain, true); // Compliant: the sensitive cookie will not be send during an unencrypted HTTP request thanks to the secure flag (the sixth  argument) set to true\nsetrawcookie($name, $value, $expire, $path, $domain, true);// Compliant: the sensitive cookie will not be send during an unencrypted HTTP request thanks to the secure flag (the sixth argument) set to true\n\u003C/pre\u003E\n\u003Ch2\u003ESee\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A04_2021-Insecure_Design/"\u003ETop 10 2021 Category A4 - Insecure Design\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"\u003ETop 10 2021 Category A5 - Security Misconfiguration\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"\u003ETop 10 2017 Category A3 - Sensitive Data\n  Exposure\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/311"\u003ECWE-311 - Missing Encryption of Sensitive Data\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/315"\u003ECWE-315 - Cleartext Storage of Sensitive Information in a Cookie\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/614"\u003ECWE-614 - Sensitive Cookie in HTTPS Session Without \'Secure\' Attribute\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EWhen a cookie is protected with the \u003Ccode\u003Esecure\u003C/code\u003E attribute set to \u003Cem\u003Etrue\u003C/em\u003E it will not be send by the browser over an unencrypted HTTP\nrequest and thus cannot be observed by an unauthorized person during a man-in-the-middle attack.\u003C/p\u003E",
        },
        {
          key: "assess_the_problem",
          content:
            '\u003Ch2\u003EAsk Yourself Whether\u003C/h2\u003E\n\u003Cul\u003E\n  \u003Cli\u003E the cookie is for instance a \u003Cem\u003Esession-cookie\u003C/em\u003E not designed to be sent over non-HTTPS communication. \u003C/li\u003E\n  \u003Cli\u003E it’s not sure that the website contains \u003Ca href="https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content"\u003Emixed content\u003C/a\u003E or not\n  (ie HTTPS everywhere or not) \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThere is a risk if you answered yes to any of those questions.\u003C/p\u003E',
        },
      ],
      impacts: [],
    },
    {
      key: "jssecurity:S3649",
      name: "Database queries should not be vulnerable to injection attacks",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            "\u003Cp\u003EThe following code is an example of an overly simple authentication function. It is vulnerable to SQL injection because user-controlled data is\ninserted directly into a query string: The application assumes that incoming data always has a specific range of characters, and ignores that some\ncharacters may change the query logic to a malicious one.\u003C/p\u003E\n\u003Cp\u003EIn this particular case, the query can be exploited with the following string:\u003C/p\u003E\n\u003Cpre\u003E\nfoo' OR 1=1 --\n\u003C/pre\u003E\n\u003Cp\u003EBy adapting and inserting this template string into one of the fields (\u003Ccode\u003Euser\u003C/code\u003E or \u003Ccode\u003Epass\u003C/code\u003E), an attacker would be able to log in\nas any user within the scoped user table.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id=\"11\" data-diff-type=\"noncompliant\"\u003E\nasync function index(req, res) {\n    const { db, User } = req.app.get('sequelize');\n\n    const user = req.query.user;\n    const pass = req.query.pass;\n\n    let loggedInUser = await db.query(\n        `SELECT * FROM users WHERE user = '${user}' AND pass = '${pass}'`,\n        {\n            model: User,\n        }\n    ); // Noncompliant\n\n    res.send(JSON.stringify(loggedInUser));\n    res.end();\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id=\"11\" data-diff-type=\"compliant\"\u003E\nasync function index(req, res) {\n    const { db, User, QueryTypes } = req.app.get('sequelize');\n\n    const user = req.query.user;\n    const pass = req.query.pass;\n\n    let loggedInUser = await db.query(\n        `SELECT * FROM users WHERE user = $user AND pass = $pass`,\n        {\n            bind: {\n                user: user,\n                pass: pass,\n            },\n            type: QueryTypes.SELECT,\n            model: User,\n        }\n    );\n\n    res.send(JSON.stringify(loggedInUser));\n    res.end();\n}\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Ch4\u003EUse prepared statements\u003C/h4\u003E\n\u003Cp\u003EAs a rule of thumb, the best approach to protect against injections is to systematically ensure that untrusted data cannot break out of an\ninterpreted context.\u003C/p\u003E\n\u003Cp\u003EFor database queries, prepared statements are a natural mechanism to achieve this due to their internal workings.\u003Cbr\u003E Here is an example with the\nfollowing query string (Java SE syntax):\u003C/p\u003E\n\u003Cpre\u003E\nSELECT * FROM users WHERE user = ? AND pass = ?\n\u003C/pre\u003E\n\u003Cp\u003E\u003Cstrong\u003ENote: Placeholders may take different forms, depending on the library used. For the above example, the question mark symbol '?' was used as\na placeholder.\u003C/strong\u003E\u003C/p\u003E\n\u003Cp\u003EWhen a prepared statement is used by an application, the database server compiles the query logic even before the application passes the literals\ncorresponding to the placeholders to the database.\u003Cbr\u003E Some libraries expose a \u003Ccode\u003EprepareStatement\u003C/code\u003E function that explicitly does so, and\nsome do not - because they do it transparently.\u003C/p\u003E\n\u003Cp\u003EThe compiled code that contains the query logic also includes the placeholders: they serve as parameters.\u003C/p\u003E\n\u003Cp\u003EAfter compilation, the query logic is frozen and cannot be changed.\u003Cbr\u003E So when the application passes the literals that replace the placeholders,\nthey are not considered application logic by the database.\u003C/p\u003E\n\u003Cp\u003EConsequently, the database server prevents the dynamic literals of a prepared statement from affecting the underlying query, and thus sanitizes\nthem.\u003C/p\u003E\n\u003Cp\u003EOn the other hand, the application does not automatically sanitize third-party data (for example, user-controlled data) inserted directly into a\nquery. An attacker who controls this third-party data can cause the database to execute malicious code.\u003C/p\u003E",
          context: {
            displayName: "Sequelize",
            key: "sequelize",
          },
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EArticles &amp; blog posts\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://blog.sonarsource.com/exploiting-hibernate-injections/"\u003ESonarSource, Exploiting Hibernate Injections\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"\u003EOWASP, SQL Injection Prevention Cheat\n  Sheet\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A03_2021-Injection/"\u003ETop 10 2021 Category A3 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A1_2017-Injection"\u003ETop 10 2017 Category A1 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/20"\u003ECWE-20 - Improper Input Validation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/89"\u003ECWE-89 - Improper Neutralization of Special Elements used in an SQL Command\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://wiki.sei.cmu.edu/confluence/x/ITdGBQ"\u003ECERT, IDS00-J.\u003C/a\u003E - Prevent SQL injection \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "how_to_fix",
          content:
            "\u003Cp\u003EThe following code is an example of an overly simple authentication function. It is vulnerable to SQL injection because user-controlled data is\ninserted directly into a query string: The application assumes that incoming data always has a specific range of characters, and ignores that some\ncharacters may change the query logic to a malicious one.\u003C/p\u003E\n\u003Cp\u003EIn this particular case, the query can be exploited with the following string:\u003C/p\u003E\n\u003Cpre\u003E\nfoo' OR 1=1 --\n\u003C/pre\u003E\n\u003Cp\u003EBy adapting and inserting this template string into one of the fields (\u003Ccode\u003Euser\u003C/code\u003E or \u003Ccode\u003Epass\u003C/code\u003E), an attacker would be able to log in\nas any user within the scoped user table.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id=\"1\" data-diff-type=\"noncompliant\"\u003E\nasync function index(req, res) {\n    const knex = req.app.get('knex');\n\n    let loggedInUser = await knex('users')\n        .whereRaw(`user = '${req.query.user}' and pass = '${req.query.pass}'`); // Noncompliant\n\n    res.send(JSON.stringify(loggedInUser));\n    res.end();\n}\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id=\"1\" data-diff-type=\"compliant\"\u003E\nasync function index(req, res) {\n    const knex = req.app.get('knex');\n\n    let loggedInUser = await knex('users')\n        .where('user', req.query.user)\n        .where('pass', req.query.pass);\n\n    res.send(JSON.stringify(loggedInUser));\n    res.end();\n}\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Ch4\u003EUse secure APIs\u003C/h4\u003E\n\u003Cp\u003ESome frameworks provide a database abstraction layer that frees the developers from sanitizing or writing prepared statements.\u003C/p\u003E\n\u003Cp\u003EThese provided APIs can be described as \"secure by design\".\u003Cbr\u003E By providing a builder pattern with parameter binding behind the scenes,\n\u003Ccode\u003EKnex\u003C/code\u003E can be called \"secure by design\" as it adds multiple layers of security to the code while keeping the codebase shorter.\u003C/p\u003E\n\u003Cp\u003E\u003Cstrong\u003ENote\u003C/strong\u003E: These types of APIs can also provide \"raw\" functions or equivalents. These functions allow developers to create complex\nqueries using the user-friendly builder pattern.\u003Cbr\u003E These methods should be considered unsafe and should not be used with untrusted data. For\nexample, \u003Ccode\u003EKnex\u003C/code\u003E exposes \u003Ccode\u003EwhereRaw()\u003C/code\u003E that is prone to injections.\u003C/p\u003E",
          context: {
            displayName: "Knex",
            key: "knex",
          },
        },
        {
          key: "root_cause",
          content:
            '\u003Cp\u003EDatabase injections (such as SQL injections) occur in an application when the application retrieves data from a user or a third-party service and\ninserts it into a database query without sanitizing it first.\u003C/p\u003E\n\u003Cp\u003EIf an application contains a database query that is vulnerable to injections, it is exposed to attacks that target any database where that query is\nused.\u003C/p\u003E\n\u003Cp\u003EA user with malicious intent carefully performs actions whose goal is to modify the existing query to change its logic to a malicious one.\u003C/p\u003E\n\u003Cp\u003EAfter creating the malicious request, the attacker can attack the databases affected by this vulnerability without relying on any\npre-requisites.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EIn the context of a web application that is vulnerable to SQL injection:\u003Cbr\u003E After discovering the injection, attackers inject data into the\nvulnerable field to execute malicious commands in the affected databases.\u003C/p\u003E\n\u003Cp\u003EBelow are some real-world scenarios that illustrate some impacts of an attacker exploiting the vulnerability.\u003C/p\u003E\n\u003Ch4\u003EIdentity spoofing and data manipulation\u003C/h4\u003E\n\u003Cp\u003EA malicious database query enables privilege escalation or direct data leakage from one or more databases. This threat is the most widespread\nimpact.\u003C/p\u003E\n\u003Ch4\u003EData deletion and denial of service\u003C/h4\u003E\n\u003Cp\u003EThe malicious query makes it possible for the attacker to delete data in the affected databases.\u003Cbr\u003E This threat is particularly insidious if the\nattacked organization does not maintain a disaster recovery plan (DRP).\u003C/p\u003E\n\u003Ch4\u003EChaining DB injections with other vulnerabilities\u003C/h4\u003E\n\u003Cp\u003EAttackers who exploit SQL injections rely on other vulnerabilities to maximize their profits.\u003Cbr\u003E Most of the time, organizations overlook some\ndefense in depth measures because they assume attackers cannot reach certain points in the infrastructure. This misbehavior can lead to multiple\nattacks with great impact:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E When secrets are stored unencrypted in databases: Secrets can be exfiltrated and lead to compromise of other components. \u003C/li\u003E\n  \u003Cli\u003E If server-side OS and/or database permissions are misconfigured, injection can lead to remote code execution (RCE).\n    \u003Cul\u003E\n      \u003Cli\u003E See \u003Ca href="https://blog.sonarsource.com/exploiting-hibernate-injections/"\u003Eour article on this topic\u003C/a\u003E \u003C/li\u003E\n    \u003C/ul\u003E  \u003C/li\u003E\n\u003C/ul\u003E',
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "pythonsecurity:S5135",
      name: "Deserialization should not be vulnerable to injection attacks",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "resources",
          content:
            '\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/"\u003ETop 10 2021 Category A8 - Software and Data Integrity\n  Failures\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A8_2017-Insecure_Deserialization"\u003ETop 10 2017 Category A8 - Insecure\n  Deserialization\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/20"\u003ECWE-20 - Improper Input Validation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/502"\u003ECWE-502 - Deserialization of Untrusted Data\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EDeserialization injections occur when applications deserialize wholly or partially untrusted data without verification.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EIn the context of a web application performing unsafe deserialization:\u003Cbr\u003E After detecting the injection vector, attackers inject a\ncarefully-crafted payload into the application.\u003C/p\u003E\n\u003Cp\u003EBelow are some real-world scenarios that illustrate some impacts of an attacker exploiting the vulnerability.\u003C/p\u003E\n\u003Ch4\u003EApplication-specific attacks\u003C/h4\u003E\n\u003Cp\u003EIn this scenario, the attackers succeed in injecting an object of the expected class, but with malicious properties that affect the object’s\nbehavior.\u003C/p\u003E\n\u003Cp\u003EIf the application relies on the properties of the deserialized object, attackers can modify the data structure or content to escalate privileges\nor perform unwanted actions.\u003Cbr\u003E In the context of an e-commerce application, this could be changing the number of products or prices.\u003C/p\u003E\n\u003Ch4\u003EFull application compromise\u003C/h4\u003E\n\u003Cp\u003EIn the worst-case scenario, the attackers succeed in injecting an object of a completely different class than expected, triggering code\nexecution.\u003C/p\u003E\n\u003Cp\u003EDepending on the attacker, code execution can be used with different intentions:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Download the internal server’s data, most likely to sell it. \u003C/li\u003E\n  \u003Cli\u003E Modify data, install malware, for instance, malware that mines cryptocurrencies. \u003C/li\u003E\n  \u003Cli\u003E Stop services or exhaust resources, for instance, with fork bombs. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThis threat is particularly insidious if the attacked organization does not maintain a Disaster Recovery Plan (DRP).\u003C/p\u003E\n\u003Ch4\u003ERoot privilege escalation and pivot\u003C/h4\u003E\n\u003Cp\u003EIn this scenario, the attacker can do everything described in the previous section. The difference is that the attacker additionally manages to\nelevate his privileges as an administrator and attack other servers.\u003C/p\u003E\n\u003Cp\u003EHere, the impact depends on how much the target company focuses on its Defense In Depth. For example, the entire infrastructure can be compromised\nthrough a combination of unsafe deserialization and misconfiguration:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Docker or Kubernetes clusters \u003C/li\u003E\n  \u003Cli\u003E cloud services \u003C/li\u003E\n  \u003Cli\u003E network firewalls and routing \u003C/li\u003E\n  \u003Cli\u003E OS access control \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code is vulnerable to deserialization attacks because it deserializes untrusted data without validating it first.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="11" data-diff-type="noncompliant"\u003E\nfrom flask import Flask, request\nimport yaml\n\napp = Flask(__name__)\n\n@app.route("/example")\ndef example():\n    obj = yaml.load(request.args.get("object"), Loader=yaml.Loader)\n    return str(obj["status"] == "OK")\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="11" data-diff-type="compliant"\u003E\nfrom flask import Flask, request\nimport yaml\n\napp = Flask(__name__)\n\n@app.route("/example")\ndef example():\n    obj = yaml.safe_load(request.args.get("object"))\n    return str(obj["status"] == "OK")\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAllowing users to provide data for deserialization generally creates more problems than it solves.\u003C/p\u003E\n\u003Cp\u003EAnything that can be done through deserialization can generally be done with more secure data structures.\u003Cbr\u003E Therefore, our first suggestion is to\navoid deserialization in the first place.\u003C/p\u003E\n\u003Cp\u003EHowever, if deserialization mechanisms are valid in your context, here are some security suggestions.\u003C/p\u003E\n\u003Ch4\u003EMore secure serialization methods\u003C/h4\u003E\n\u003Cp\u003ESome more secure serialization methods reduce the risk of security breaches, although not definitively.\u003C/p\u003E\n\u003Cp\u003EA complete object serializer is probably unnecessary if you only need to receive primitive data (for example integers, strings, bools, etc.).\u003Cbr\u003E\nIn this case, formats such as JSON and XML protect the application from deserialization attacks by default.\u003C/p\u003E\n\u003Cp\u003EFor more complex objects, the next step is to control which class fields are exposed by creating class-specific serialization methods.\u003Cbr\u003E The most\ncommon method is to use Data Transfer Objects (DTO) patterns or Google Protocol Buffers (protobufs). After creating the Protobuf data structure, the\nProtobuf compiler creates class files that handle operations such as serializing and deserializing data.\u003C/p\u003E\n\u003Cp\u003EThe example compliant solution uses the \u003Ccode\u003Esafe_load\u003C/code\u003E method in place of the less secure \u003Ccode\u003Eload\u003C/code\u003E one. It disables loading\narbitrary Python object and thus prevents the execution of arbitrary or dangerous functions.\u003C/p\u003E\n\u003Cp\u003ENote that the same level of security can be reached with the \u003Ccode\u003Eload\u003C/code\u003E method as soon as a safe \u003Ccode\u003ELoader\u003C/code\u003E component is passed to\nit.\u003C/p\u003E\n\u003Cpre\u003E\nyaml.load(untrusted, Loader=yaml.SafeLoader)\n\u003C/pre\u003E\n\u003Ch4\u003EIntegrity check\u003C/h4\u003E\n\u003Cp\u003EMessage authentication codes (MAC) can be used to prevent tampering with serialized data that is meant to be stored outside the application\nserver:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E On the server-side, when serializing an object, compute a MAC of the result and append it to the serialized object string. \u003C/li\u003E\n  \u003Cli\u003E When the serialized value is submitted back, verify the serialization string MAC on the server side before deserialization. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EDepending on the situation, two MAC computation modes can be used.\u003C/p\u003E\n\u003Cp\u003EIf the same application will be responsible for the MAC computing and validation, a symmetric signature algorithm can be used. In that case, HMAC\nshould be preferred, with a strong underlying hash algorithm such as SHA-256.\u003C/p\u003E\n\u003Cp\u003EIf multiple parties have to validate the serialized data, an asymetric signature algorithm should be used. This will reduce the chances for a\nsigning secret to be leaked. In that case, the \u003Ccode\u003ERSASSA-PSS\u003C/code\u003E algorithm can be used.\u003C/p\u003E\n\u003Cp\u003E\u003Cstrong\u003ENote\u003C/strong\u003E: Be sure to store the signing secret securely.\u003C/p\u003E',
          context: {
            displayName: "PyYAML",
            key: "pyyaml",
          },
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code is vulnerable to deserialization attacks because it deserializes HTTP data without validating it first.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nfrom flask import Flask, request\nfrom base64 import b64decode\nimport pickle\n\napp = Flask(__name__)\n\n@app.route("/example")\ndef example():\n    objstr = b64decode(request.args.get("object"))\n    obj = pickle.loads(objstr)\n    return str(obj.status == "OK")\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nfrom flask import Flask, request\nimport json\n\napp = Flask(__name__)\n\n@app.route("/example")\ndef example():\n    obj = json.loads(request.args.get("object"))\n    return str(obj["status"] == "OK")\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAllowing users to provide data for deserialization generally creates more problems than it solves.\u003C/p\u003E\n\u003Cp\u003EAnything that can be done through deserialization can generally be done with more secure data structures.\u003Cbr\u003E Therefore, our first suggestion is to\navoid deserialization in the first place.\u003C/p\u003E\n\u003Cp\u003EHowever, if deserialization mechanisms are valid in your context, here are some security suggestions.\u003C/p\u003E\n\u003Ch4\u003EMore secure serialization methods\u003C/h4\u003E\n\u003Cp\u003ESome more secure serialization methods reduce the risk of security breaches, although not definitively.\u003C/p\u003E\n\u003Cp\u003EA complete object serializer is probably unnecessary if you only need to receive primitive data (for example integers, strings, bools, etc.).\u003Cbr\u003E\nIn this case, formats such as JSON and XML protect the application from deserialization attacks by default.\u003C/p\u003E\n\u003Cp\u003EFor more complex objects, the next step is to control which class fields are exposed by creating class-specific serialization methods.\u003Cbr\u003E The most\ncommon method is to use Data Transfer Objects (DTO) patterns or Google Protocol Buffers (protobufs). After creating the Protobuf data structure, the\nProtobuf compiler creates class files that handle operations such as serializing and deserializing data.\u003C/p\u003E\n\u003Ch4\u003EIntegrity check\u003C/h4\u003E\n\u003Cp\u003EMessage authentication codes (MAC) can be used to prevent tampering with serialized data that is meant to be stored outside the application\nserver:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E On the server-side, when serializing an object, compute a MAC of the result and append it to the serialized object string. \u003C/li\u003E\n  \u003Cli\u003E When the serialized value is submitted back, verify the serialization string MAC on the server side before deserialization. \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EDepending on the situation, two MAC computation modes can be used.\u003C/p\u003E\n\u003Cp\u003EIf the same application will be responsible for the MAC computing and validation, a symmetric signature algorithm can be used. In that case, HMAC\nshould be preferred, with a strong underlying hash algorithm such as SHA-256.\u003C/p\u003E\n\u003Cp\u003EIf multiple parties have to validate the serialized data, an asymetric signature algorithm should be used. This will reduce the chances for a\nsigning secret to be leaked. In that case, the \u003Ccode\u003ERSASSA-PSS\u003C/code\u003E algorithm can be used.\u003C/p\u003E\n\u003Cp\u003E\u003Cstrong\u003ENote\u003C/strong\u003E: Be sure to store the signing secret securely.\u003C/p\u003E',
          context: {
            displayName: "Python Standard Library",
            key: "python_standard_library",
          },
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
    {
      key: "pythonsecurity:S2076",
      name: "OS commands should not be vulnerable to command injection attacks",
      type: RawType.Vulnerability,
      descriptionSections: [
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code is vulnerable to command injections because it is using untrusted inputs to set up a new process. Therefore an attacker can\nexecute an arbitrary program that is installed on the system.\u003C/p\u003E\n\u003Cp\u003EIn the following example, if the \u003Cstrong\u003Ehost\u003C/strong\u003E request parameter contains system shell control characters, the expected \u003Ccode\u003Eping\u003C/code\u003E\ncommand behavior will be changed.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="noncompliant"\u003E\nfrom flask import Flask, request\nfrom paramiko.client import SSHClient\n\napp = Flask(__name__)\n\n@app.route(\'/example\')\ndef example():\n    client = SSHClient()\n    client.connect("example.org", username=USER, password=PASS)\n\n    client.exec_command(request.args.get("cmd")) # Noncompliant\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="1" data-diff-type="compliant"\u003E\nfrom flask import Flask, request\nfrom paramiko.client import SSHClient\n\napp = Flask(__name__)\n\n@app.route(\'/example\')\ndef example():\n    client = SSHClient()\n    client.connect("example.org", username=USER, password=PASS)\n\n    DIAG_CMD=["/bin/ping -c 1 -- %s", "/bin/host -- %s"]\n    cmd = DIAG_CMD[int(request.args.get(\'cmdId\'))]\n    cmd = cmd % shlex.quote(request.args.get(\'host\'))\n    client.exec_command(cmd)\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAllowing users to execute operating system commands generally creates more problems than it solves.\u003C/p\u003E\n\u003Cp\u003EAnything that can be done via operating system commands can usually be done via a language’s native SDK.\u003Cbr\u003E Therefore, our first suggestion is to\navoid using OS commands in the first place.\u003Cbr\u003E However, if the application requires running OS commands with user-controlled data, here are some\nsecurity suggestions.\u003C/p\u003E\n\u003Ch4\u003EPre-Approved commands\u003C/h4\u003E\n\u003Cp\u003EIf the application aims to execute only a small number of OS commands (for example, \u003Ccode\u003Els\u003C/code\u003E, \u003Ccode\u003Epwd\u003C/code\u003E, and \u003Ccode\u003Egrep\u003C/code\u003E), the\ncleanest way to avoid this problem is to validate the input before using it in an OS command.\u003C/p\u003E\n\u003Cp\u003ECreate a list of authorized and secure commands that you want the application to be able to execute. Use absolute paths to avoid any ambiguity.\u003Cbr\u003E\nIf a user input does not match an entry in this list, it should be rejected because it is considered unsafe.\u003C/p\u003E\n\u003Cp\u003EDepending on the number of commands you want the application to support, the list can be either a regex string or any array type. If you use\nregexes, choose simple regexes to avoid ReDOS attacks. For example, you can accept only a specific set of executables, by using\n\u003Ccode\u003E^/bin/(ls|pwd|grep)$\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003E\u003Cstrong\u003EImportant note\u003C/strong\u003E: The application must do validation on the server side. Not on client-side front-ends.\u003C/p\u003E\n\u003Ch4\u003ENeutralize special characters\u003C/h4\u003E\n\u003Cp\u003EIf the application is to execute complex commands that cannot be controlled thanks to pre-approved lists, the cleanest approach is to use special\nsanitization components, such as \u003Ccode\u003Eshlex\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003EThe library helps you to get rid of common dangerous characters, such as:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ccode\u003E&amp;\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E|\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E;\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E$\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E&gt;\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E&lt;\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E`\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E\\\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E!\u003C/code\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIf user input is to be included in the arguments of a command, the application must ensure that dangerous options or argument delimiters are\nneutralized.\u003Cbr\u003E Argument delimiters count \u003Ccode\u003E\'\u003C/code\u003E, \u003Ccode\u003E-\u003C/code\u003E and spaces.\u003C/p\u003E\n\u003Cp\u003EFor example, the \u003Ccode\u003Efind\u003C/code\u003E command from UNIX supports the dangerous argument \u003Ccode\u003E-exec\u003C/code\u003E.\u003Cbr\u003E In this case, option processing can be\nterminated with a string containing \u003Ccode\u003E--\u003C/code\u003E or with special options. For example, \u003Ccode\u003Egit\u003C/code\u003E supports \u003Ccode\u003E--end-of-options\u003C/code\u003E \u003Ca\nhref="https://github.blog/2019-11-03-highlights-from-git-2-24/#tidbits"\u003Esince its version 2.24\u003C/a\u003E.\u003C/p\u003E\n\u003Cp\u003EIn the example compliant code, the \u003Ccode\u003Equote\u003C/code\u003E function from the \u003Ccode\u003Eshlex\u003C/code\u003E is used to encode the user-controlled command argument.\nIt escapes argument delimiters and shell control characters.\u003C/p\u003E',
          context: {
            displayName: "Paramiko",
            key: "paramiko",
          },
        },
        {
          key: "resources",
          content:
            '\u003Ch3\u003EDocumentation\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ca href="https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html"\u003EOWASP, OS Command Injection Defense\n  Cheaty Sheet\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://gtfobins.github.io/#+shell"\u003EGTFOBins, list of Unix binaries that can be used to bypass local security restrictions\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://lolbas-project.github.io/#"\u003ELOLBAS, list of Windows binaries that can be used to bypass local security restrictions\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ca href="https://peps.python.org/pep-0324/"\u003EPEP 324 – subprocess - New process module\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Ch3\u003EStandards\u003C/h3\u003E\n\u003Cul\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/Top10/A03_2021-Injection/"\u003ETop 10 2021 Category A3 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E OWASP - \u003Ca href="https://owasp.org/www-project-top-ten/2017/A1_2017-Injection"\u003ETop 10 2017 Category A1 - Injection\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/20"\u003ECWE-20 - Improper Input Validation\u003C/a\u003E \u003C/li\u003E\n  \u003Cli\u003E CWE - \u003Ca href="https://cwe.mitre.org/data/definitions/78"\u003ECWE-78 - Improper Neutralization of Special Elements used in an OS Command\u003C/a\u003E \u003C/li\u003E\n\u003C/ul\u003E',
        },
        {
          key: "root_cause",
          content:
            "\u003Cp\u003EOS command injections occur when applications build command lines from untrusted data before executing them with a system shell.\u003Cbr\u003E In that case,\nan attacker can tamper with the command line construction and force the execution of unexpected commands. This can lead to the compromise of the\nunderlying operating system.\u003C/p\u003E\n\u003Ch3\u003EWhat is the potential impact?\u003C/h3\u003E\n\u003Cp\u003EAn attacker exploiting an OS command injection vulnerability will be able to execute arbitrary commands on the underlying operating system.\u003C/p\u003E\n\u003Cp\u003EThe impact depends on the access control measures taken on the target system OS. In the worst-case scenario, the process runs with root privileges,\nand therefore any OS commands or programs may be affected.\u003C/p\u003E\n\u003Cp\u003EBelow are some real-world scenarios that illustrate some impacts of an attacker exploiting the vulnerability.\u003C/p\u003E\n\u003Ch4\u003EDenial of service and data leaks\u003C/h4\u003E\n\u003Cp\u003EIn this scenario, the attack aims to disrupt the organization’s activities and profit from data leaks.\u003C/p\u003E\n\u003Cp\u003EAn attacker could, for example:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E download the internal server’s data, most likely to sell it \u003C/li\u003E\n  \u003Cli\u003E modify data, send malware \u003C/li\u003E\n  \u003Cli\u003E stop services or exhaust resources (with fork bombs for example) \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EThis threat is particularly insidious if the attacked organization does not maintain a disaster recovery plan (DRP).\u003C/p\u003E\n\u003Ch4\u003ERoot privilege escalation and pivot\u003C/h4\u003E\n\u003Cp\u003EIn this scenario, the attacker can do everything described in the previous section. The difference is that the attacker also manages to elevate\ntheir privileges to an administrative level and attacks other servers.\u003C/p\u003E\n\u003Cp\u003EHere, the impact depends on how much the target company focuses on its Defense In Depth. For example, the entire infrastructure can be compromised\nby a combination of OS injections and \u003Cstrong\u003Emisconfiguration\u003C/strong\u003E of:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E Docker or Kubernetes clusters \u003C/li\u003E\n  \u003Cli\u003E cloud services \u003C/li\u003E\n  \u003Cli\u003E network firewalls and routing \u003C/li\u003E\n  \u003Cli\u003E OS access control \u003C/li\u003E\n\u003C/ul\u003E",
        },
        {
          key: "how_to_fix",
          content:
            '\u003Cp\u003EThe following code is vulnerable to command injections because it is using untrusted inputs to set up a new process. Therefore an attacker can\nexecute an arbitrary program that is installed on the system.\u003C/p\u003E\n\u003Cp\u003EEspecially, in this example, if the \u003Cstrong\u003Ehost\u003C/strong\u003E request parameter contains system shell control characters, the expected\n\u003Ccode\u003Eping\u003C/code\u003E command behavior will be changed.\u003C/p\u003E\n\u003Ch4\u003ENoncompliant code example\u003C/h4\u003E\n\u003Cpre data-diff-id="11" data-diff-type="noncompliant"\u003E\nfrom flask import Flask, request\nimport os\n\napp = Flask(__name__)\n\n@app.route(\'/example\')\ndef example():\n    host = request.args.get("host", "www.google.com")\n\n    status = os.system("ping -c 1 %s" % host) # Noncompliant\n    return str(status == 0)\n\u003C/pre\u003E\n\u003Ch4\u003ECompliant solution\u003C/h4\u003E\n\u003Cpre data-diff-id="11" data-diff-type="compliant"\u003E\nfrom flask import Flask, request\nimport os\n\napp = Flask(__name__)\n\n@app.route(\'/example\')\ndef example():\n    host = request.args.get("host", "www.google.com")\n\n    status = subprocess.run(["ping", "-c", "1", "--", host]).returncode\n    return str(status == 0)\n\u003C/pre\u003E\n\u003Ch3\u003EHow does this work?\u003C/h3\u003E\n\u003Cp\u003EAllowing users to execute operating system commands generally creates more problems than it solves.\u003C/p\u003E\n\u003Cp\u003EAnything that can be done via operating system commands can usually be done via a language’s native SDK.\u003Cbr\u003E Therefore, our first suggestion is to\navoid using OS commands in the first place.\u003Cbr\u003E However, if the application requires running OS commands with user-controlled data, here are some\nsecurity suggestions.\u003C/p\u003E\n\u003Ch4\u003EPre-Approved commands\u003C/h4\u003E\n\u003Cp\u003EIf the application aims to execute only a small number of OS commands (for example, \u003Ccode\u003Els\u003C/code\u003E, \u003Ccode\u003Epwd\u003C/code\u003E, and \u003Ccode\u003Egrep\u003C/code\u003E), the\ncleanest way to avoid this problem is to validate the input before using it in an OS command.\u003C/p\u003E\n\u003Cp\u003ECreate a list of authorized and secure commands that you want the application to be able to execute. Use absolute paths to avoid any ambiguity.\u003Cbr\u003E\nIf a user input does not match an entry in this list, it should be rejected because it is considered unsafe.\u003C/p\u003E\n\u003Cp\u003EDepending on the number of commands you want the application to support, the list can be either a regex string or any array type. If you use\nregexes, choose simple regexes to avoid ReDOS attacks. For example, you can accept only a specific set of executables, by using\n\u003Ccode\u003E^/bin/(ls|pwd|grep)$\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003E\u003Cstrong\u003EImportant note\u003C/strong\u003E: The application must do validation on the server side. Not on client-side front-ends.\u003C/p\u003E\n\u003Ch4\u003ENeutralize special characters\u003C/h4\u003E\n\u003Cp\u003EIf the application is to execute complex commands that cannot be controlled thanks to pre-approved lists, the cleanest approach is to use special\nsanitization components, such as \u003Ccode\u003Esubprocess\u003C/code\u003E.\u003C/p\u003E\n\u003Cp\u003EThe library helps you to get rid of common dangerous characters, such as:\u003C/p\u003E\n\u003Cul\u003E\n  \u003Cli\u003E \u003Ccode\u003E&amp;\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E|\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E;\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E$\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E&gt;\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E&lt;\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E`\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E\\\u003C/code\u003E \u003C/li\u003E\n  \u003Cli\u003E \u003Ccode\u003E!\u003C/code\u003E \u003C/li\u003E\n\u003C/ul\u003E\n\u003Cp\u003EIf user input is to be included in the arguments of a command, the application must ensure that dangerous options or argument delimiters are\nneutralized.\u003Cbr\u003E Argument delimiters count \u003Ccode\u003E\'\u003C/code\u003E, \u003Ccode\u003E-\u003C/code\u003E and spaces.\u003C/p\u003E\n\u003Cp\u003EFor example, the \u003Ccode\u003Efind\u003C/code\u003E command from UNIX supports the dangerous argument \u003Ccode\u003E-exec\u003C/code\u003E.\u003Cbr\u003E In this case, option processing can be\nterminated with a string containing \u003Ccode\u003E--\u003C/code\u003E or with special options. For example, \u003Ccode\u003Egit\u003C/code\u003E supports \u003Ccode\u003E--end-of-options\u003C/code\u003E \u003Ca\nhref="https://github.blog/2019-11-03-highlights-from-git-2-24/#tidbits"\u003Esince its version 2.24\u003C/a\u003E.\u003C/p\u003E\n\u003Cp\u003EIn the example compliant code, using the \u003Ccode\u003Esubprocess.run\u003C/code\u003E function helps to escape the passed arguments. It accepts a list of command\narguments that will be properly escaped and concatenated to form the command line to execute.\u003C/p\u003E\n\u003Ch4\u003EDisable shell integration\u003C/h4\u003E\n\u003Cp\u003EIn most cases, command execution libraries propose two ways to execute external program: with or without shell integration.\u003C/p\u003E\n\u003Cp\u003EWhen shell integration is allowed, an attacker with control over the command arguments can simply execute additional external programs using system\nshell features. For example, on Unix, command pipelining (\u003Ccode\u003E|\u003C/code\u003E) or string interpolation (\u003Ccode\u003E$()\u003C/code\u003E, \u003Ccode\u003E&lt;()\u003C/code\u003E, etc.) can be\nused to break out of a command call.\u003C/p\u003E\n\u003Cp\u003ETherefore, it is generally preferable to disable shell integration.\u003C/p\u003E\n\u003Cp\u003EIn the example compliant code, using the \u003Ccode\u003Esubprocess\u003C/code\u003E module’s functions is preferred over older alternative as the \u003Ccode\u003Eos\u003C/code\u003E or\n\u003Ccode\u003Epopen\u003C/code\u003E modules. Indeed, \u003Ccode\u003Esubprocess\u003C/code\u003E, while still a dangerous library, disables the system shell’s syntax interpretation by\ndefault.\u003C/p\u003E',
          context: {
            displayName: "Python Standard Library",
            key: "python_standard_library",
          },
        },
      ],
      impacts: [
        {
          softwareQuality: RawSoftwareQuality.Security,
          severity: RawSeverity.High,
        },
      ],
    },
  ],
};
