# chefbstudios.com
Welcome to chefbstudios.com!

## Motivation
I produce music under the stage name, "chefB." I've always wanted to put my music on a platform that was more professional than SoundCloud, but less formal and tedious than any of the major streaming services (Apple Music, Spotify, etc...). 
So chefbstudios was born!

## Features
chefbstudios.com features 2 major components (so far):
- Browse
  - Users are able to browse through all my latest songs and play them through a custom streaming interface
- Schedule Time
  - Users can send me a message, either to schedule time to chat about music and record something, or just to drop a friendly message about my work
  
## Implementation
The stack for chefbstudios.com consists of a fullstack NextJS project. React/TypeScript is used for the frontend, and a few Node routes are setup for the API. The entire project is deployed and monitored using Vercel.
### Browse
`Browse` was created using a custom music streaming interface. It involves simply streaming audio files directly from an AWS S3 bucket and playing them into an HTML audio element.

### Schedule Time
`Schedule Time` was created using `nodemailer` and configuring the SMTP transport configuration to use AWS SES. It then forwards the user-submitted message from the website's frontend over to my personal email.
