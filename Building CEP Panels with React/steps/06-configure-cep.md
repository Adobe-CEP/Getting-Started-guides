### CEP-specific configuration

#### Adding `CSInterface.js`

*   Download the `CSInterface.js` version you need from https://github.com/Adobe-CEP/CEP-Resources/
    *   Look under the `CEP_#.x` folder for the actual `CSInterface.js` file
    *   **Note**: This project was built using CEP 8
*   Copy `CSInterface.js` to `react-panel/src/client/CSInterface.js`
    *   This location is purely arbitrary; the build scripts we describe later on will expect it in this location, but you can always change it later.

#### Configuring `manifest.xml`

As noted in the [Getting Started guide](), the `manifest.xml` file is where, among other things, you indicate which Creative Cloud host apps and version numbers your extension supports. In the sample, `manifest.xml` is located at [`react-panel/src/CSXS/manifest.xml`](./react-panel/src/CSXS/manifest.xml).

For this guide, we'll make an extension that supports Photoshop. So in the `manifest.xml`, make sure you list the supported host apps within the `<HostList>` element:

```xml
<!-- ...  -->
<ExecutionEnvironment>
  <HostList>
    <Host Name="PHSP" Version="19" /> <!-- Photoshop -->
    <Host Name="PHXS" Version="19" /> <!-- Photoshop -->
  </HostList>

  <!-- // ... -->
</ExecutionEnvironment>

<!-- // ... -->
```

Note that the versions indicted in the example code above only target a single version of each host app, for the sake of demo simplicity. Most extension developers will want to target a range of host app versions. To learn how to support ranges of host app versions, see the [CEP cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md).

#### Configuring .debug

As noted in the [Debugging Guide](), if you want to debug your panel, you'll need to configure `.debug` (in [`react-panel/src/.debug`](./react-panel/src/.debug)):

```xml
<?xml version='1.0' encoding='UTF-8'?>
<ExtensionList>
  <Extension Id="com.adobe.guides.react.panel">
    <HostList>
      <Host Name="PHXS" Port="8088" />
      <!-- // other hosts as needed -->
    </HostList>
  </Extension>
</ExtensionList>
```