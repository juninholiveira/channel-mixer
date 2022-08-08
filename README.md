# Channel Mixer
A simple and practical utility to mix grayscale textures into a single RGBA mask.

## For Developers

### Building locally
A environment variable called `RESOLVED_VERSION` is needed to create the artifact name during build. Create a file on root called `electron-builder.env` and add the following:

```
# Dummy version to be used by electron-builder when building locally
RESOLVED_VERSION=v0.0.0
```

## CI/CD

Every push on main and PR must pass the Code Inspection action. The PRs must have the title following the Conventional Commit style.