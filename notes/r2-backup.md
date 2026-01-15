# R2 Backup

Backup `wortle-originals` bucket using rclone with credentials from 1Password.

## Prerequisites

- 1Password CLI signed in to `my.1password.com`
- "Cloudflare backup token" item in Wortle vault with `Access Key ID` and `Secret Access Key`

## Commands

Dry run (see what would be copied):

```bash
nix develop -c op run --account=my.1password.com --env-file=.env.rclone -- rclone copy r2:wortle-originals /path/to/backup --dry-run -v
```

Actual backup:

```bash
nix develop -c op run --account=my.1password.com --env-file=.env.rclone -- rclone copy r2:wortle-originals /path/to/backup -v
```

The `copy` command is incremental (skips unchanged files) and never deletes from the destination.
