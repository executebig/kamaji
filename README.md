# Kamajī
Execute Big's mail-merging service with templating, directly sent via SMTP.
## TODO
- SMTP pooling & stagger sends w/ nodemailer
- Email queueing by storing emails & executing when the server can next handle it
  - When stagger sending, take 20 i.e. from each domain (sorted)
  - Stagger sends should have customizable / previewable timestamps for when they send out
- Email scheduling w/ node-cronjob
- First email preview
- Make api only executebig
