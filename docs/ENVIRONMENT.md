# Cloud development environment

Reusable `install_script` and `start_skill` instructions were saved to the cloud environment draft. Installation uses `npm ci` and builds `dist/`; startup uses the existing checkout and Python HTTP server. Scripts contain no credentials and do not modify application source, copy or artwork.

Saving this draft does not execute the scripts or publish the environment snapshot. Review and save the draft in environment settings, then publish the cloud environment if you want this prepared setup available to future tasks. This is separate from publishing the website with GitHub Pages.

The current instance has Node 24, npm, Python 3 and system Chromium available. No application secrets or external services are required. Setup, startup and local HTTP/browser validation have been exercised here. New-task snapshot restoration has not been verified.
