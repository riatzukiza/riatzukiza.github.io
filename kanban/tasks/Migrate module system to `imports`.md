
## Description

Browsers have implemented the `import` syntax for regular scripts included via script tags. This makes much of the bundling we currently do largely unnessisary.
The system should be refactored to use `import` over `require`
## Related Epics

- [[devops pipeline]]
## Requirements

- All require calls to project files are replaced with identical import statements.
	- This excludes any requires that are made to externally included bundles.
- All module.export assignments are replaced with identical export statements
- All code continues to work as before.
## Tasks 

- [ ] Refactor all current code to use import pattern
