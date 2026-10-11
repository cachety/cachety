# Security policy

Cachety handles sensitive documents: ID cards, tax notices, payslips, bank statements. Every vulnerability is taken seriously.

Threat model, controls in place, tests and known limits: **[docs/security.md](docs/security.md)**.

## Reporting a vulnerability

**Please do not open a public issue.** Use GitHub's private reporting: the **Security → Report a vulnerability** tab of the
[cachety/cachety](https://github.com/cachety/cachety/security/advisories/new) repository.

Please include:

- the affected version or commit, and your browser and operating system;
- the steps to reproduce, and a sample file if possible;
- the estimated impact (data leak, code execution, watermark bypass…).

We acknowledge reports within 7 days and aim to fix a confirmed vulnerability within 30 days, sooner if it is being exploited. Reporters are credited in the security advisory unless they prefer otherwise.

## Scope

In scope: the code in this repository and the deployed site [cachety.com](https://cachety.com). This includes in particular:

- any leak of a file outside the browser;
- any data from the original document surviving in the output;
- any code execution through a dropped file;
- any bypass of the Content-Security-Policy.

Out of scope: a watermark removed by image editing (an inherent limit, see docs/security.md §6), compromised devices or browser extensions, and reports from automated tools without a demonstrated impact.

## Supported versions

Only the latest version of the `main` branch (the deployed one) receives security fixes.
