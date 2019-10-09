# yoti-share-react

Welcome to the Yoti Web Share React component.  This repo contains the tools and step by step instructions you need to integrate
the Yoti Web Share QR Modal into your React application, so that your users can share their identity details with your
appliction in a secure and trusted way.

## Supported React Versions

TODO

## Getting Started

### Installation

Install the library into your application using a package manager: 

```bash
npm install yoti-share-react -S -E
```

or

```bash
yarn add yoti-share-react
```

### Usage

```javascript
import YotiShare from 'yoti-share-react';

<YotiShare
    domId="yoti_1"
    clientSdkId="my_client_sdk_id_from_hub"
    scenarioId="my_scenario_id_from_hub" />
```

The library will automatically include the required script on the webpage, and supports multiple buttons 
with different configurations on one page (i.e one for a new user, and another for an existing user to login).s


## Support

For any questions or support please email [sdksupport@yoti.com](mailto:sdksupport@yoti.com).
Please provide the following to get you up and working as quickly as possible:

* Computer type
* OS version
* Version of Node being used
* Screenshot

Once we have answered your question we may contact you again to discuss Yoti products and services. If you’d prefer us not to do this, please let us know when you e-mail.
