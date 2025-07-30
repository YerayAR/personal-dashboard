# Configuration Directory

This directory contains all the configuration files for the FinDash project, organized for better maintainability and clarity.

## Files

### `tailwind.config.cjs`
Tailwind CSS configuration that defines:
- Dark mode settings (`class` mode)
- Content scanning paths for Tailwind classes
- Theme extensions
- Plugin configurations

### `postcss.config.cjs` 
PostCSS configuration that handles:
- Tailwind CSS processing
- Autoprefixing for browser compatibility
- References to the Tailwind config file

### `vitest.config.ts`
Vitest test runner configuration that:
- Integrates with SvelteKit
- Sets up the Node.js test environment
- Configures test file patterns and execution

## Root Level Config Files

The root level of the project contains wrapper configuration files that simply require the ones in this directory. This approach provides:

1. **Compatibility**: Build tools expect config files in the root
2. **Organization**: Actual configurations are centralized here
3. **Maintainability**: Easy to find and modify configurations

## Usage

These configurations are automatically picked up by their respective tools during development and build processes. No manual intervention is required unless you need to modify specific settings.
