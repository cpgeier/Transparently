# Transparently

Lightweight Chrome extension designed to bring content transparency to Youtube. 

![Concept Art](/images/design.png)

I'm trying to build an interface so that people can share more information about what they are watching and what they want others to see. Youtube is the second largest site on in the internet however the focus is put on content creators rather than community. YoutubeAdLabeler will provide a platform to share basic information like the time stamps of ads in videos and when the videos intro/outro starts and stops. 

# Installation

First clone the repo:
```
git clone https://github.com/cpgeier/Transparently.git
```
Then load the package into chrome:
1. Visit chrome://extensions.
2. Enable Developer mode by ticking the checkbox in the upper-right corner.
3. Click on the "Load unpacked extension..." button.
4. Select the YoutubeAdLabeler containing the cloned repository.

# Usage

The YoutubeAdLabeler app needs no configuration/management. It simiply loads video labels whenever a youtube page is loaded. Try visiting https://www.youtube.com/watch?v=niz3Shv6QWY to see an example of the functionality.

If you do not see adds show up on this video, try waiting ~10-20 seconds and try again.

# Features

- Compatibilty with uBlock Origin
- Loads only on browser idle
- Ads labeled on page load

# Improvements

- Merging labeling and client apps
- Publishing on chrome web store
- Simple github pages website

# Notes

This is a work in progress - (3/30/2019)

Here is what the labeler app looks like:

![Labeler](/images/labeler.png)

Needs some work but is fully functional. You can add ads using the labeler app and whenever someone loads a page using the client app and ad bar appears on their screen.
