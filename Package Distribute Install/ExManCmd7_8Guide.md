ExManCmd 7.8 just came out, which macOS Catalina compatibility... with some caveats:

- [**Don't update to Catalina if you still depend on ExtendScript ToolKit.**](https://medium.com/adobetech/estk-and-macos-10-15-catalina-cbcc30300918?source=friends_link&sk=76b9896b1eec630691f5603839ae28fe "Don't update to Catalina if you still depend on ExtendScript ToolKit.") Perhaps try Catalina in a separate partition on your Mac first.
- The BridgeTalk component is not quite Catalina compliant and requires additional steps upon download, documented below.

Here's how to tell which version of ExManCmd you're running:

![](https://raw.githubusercontent.com/Adobe-CEP/Getting-Started-guides/master/.meta/readme-assets/ExManVersionWarrow.png "")

# Use the following steps to set up ExManCmd 7.8

1. Download ExManCmd 7.8 here: [https://partners.adobe.com/exchangeprogram/creativecloud/support/exman-com-line-tool.html](https://partners.adobe.com/exchangeprogram/creativecloud/support/exman-com-line-tool.html "https://partners.adobe.com/exchangeprogram/creativecloud/support/exman-com-line-tool.html")

2. Double click on the `.dmg` folder to mount the `.dmg` volume
3. Copy and paste the `Contents` folder to your hard drive (or other System location)
3. Open the folder `Contents - > MacOS`
4. Launch Terminal.app
5. This command will remove the BridgeTalk component from Apple's quarantine: `xattr -dr com.apple.quarantine Your/SystemPath/Contents/MacOS/ExManBridgeTalkCmd`
     * My favorite method of doing this is to drag the `ExManBridgeTalk` file directly onto the Terminal after pasting in the command, so you don't have to navigate through your file system:

![](https://raw.githubusercontent.com/Adobe-CEP/Getting-Started-guides/master/.meta/readme-assets/filepathdrag_drop.small.gif)

  * Hit return to run the command.

6. Double click ExManCmd Tool (from within `/Contents/MacOS/ExManBridgeTalkCmd`)

7. You will still see a warning from macOS:
![](https://raw.githubusercontent.com/Adobe-CEP/Getting-Started-guides/master/.meta/readme-assets/ExManCantBeOpenedOpen.png "")

8. You will need to confirm in `System Preferences -> Security` that ExManCmd is OK by clicking "Open Anyway": 

![](https://raw.githubusercontent.com/Adobe-CEP/Getting-Started-guides/master/.meta/readme-assets/catalinaSysPrefError.jpg "")

8. ExManCmd should now run properly... unless you rely on BridgeTalk components. Let us know if this doesn't work! 
9. Use ExManCmd to install/remove addons as usual.
    * We recommend running ExManCmd using `sudo`

