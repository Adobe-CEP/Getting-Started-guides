# <!SDK/API/COMPONENT NAME>

Many use cases for Creative Cloud app extensions require the ability to talk to API services on the web. With both Chromium Embedded Framework (CEF) and Node.js at its core, CEP gives you the flexibility to make network calls from within your extension in the way that makes sense for your workflow.

![](<!IMAGE SRC URL HERE (optional image for UI components)>)

In this guide, we will cover how to call a third-party API service, update the panel UI according to the API response, and interact with the creative asset based on the API response.

By the end of this guide, we will have a CEP extension that:

1. Calls the Dark Sky API to get the current weather for a particular city.
1. Displays a string in the panel UI that tells the user the current weather.
1. Lets the user click a button to alter the open asset in Photoshop or InDesign.


## GitHub

You can find a companion GitHub repo for this developer guide [on GitHub](<!LINK HERE>).

Be sure to follow all instructions in the `readme`.


## Technology Used

- Supported Host Applications: Photoshop, InDesign
- Libraries/Frameworks/APIs: [CEP](), ExtendScript, [Fetch](), [Dark Sky]()


## Prerequisites

This guide will assume that you have installed all software and completed all steps in the following guides:

- [Getting Started](<!LINK HERE>)
- [Another Guide](<!LINK HERE>)


## Configuration

The following steps will help you get the sample extension for this guide up and running:

1. Install the `./com.cep.weather/` directory in your extensions folder. <!(where is this?)>
1. Download and move CEP's `CSInterface.js` library to `./com.cep.weather/client/js/lib/CSInterface.js`.
1. Get a free API Key from [Dark Sky](https://darksky.net/dev).
1. Make a file at this path: `./com.cep.weather/client/js/config.js`.
1. In your newly created `config.js` file, add this code, substituting in your Dark Sky API Key:

    ```
    const darkSkyKey = "YOUR_API_KEY";
    ```

After following these steps, you'll be able to run the sample extensions within apps indicated in the [Technology Used](#technology-used) section of this guide.


## <!INTEGRATION SECTION 1>


## <!INTEGRATION SECTION 2>
_(optional)_


## <!INTEGRATION SECTION 3>
_(optional)_


## Customization
_(optional)_


## Best Practices
_(optional)_


## Troubleshooting and Known Issues
Articles about common issues are [here](!LINK).

You can submit tickets for bugs and feature requests [here](!LINK).

## Other Resources
- [<!NAME>](<!LINK HERE>)
- [<!NAME>](<!LINK HERE>)
- [<!NAME>](<!LINK HERE>)
