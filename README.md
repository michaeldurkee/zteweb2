# ZTE Web UI v2

A web-based user interface for ZTE mobile routers and modems. This application provides a comprehensive management interface for controlling and monitoring ZTE network devices through a web browser.

## Overview

This is a responsive web application built for managing ZTE mobile broadband devices. It provides both desktop and mobile interfaces for device configuration, network management, and monitoring.

## Features

### Network Management
- **Network Selection** - Choose and configure network connections
- **Dial-up Settings** - Configure connection parameters
- **APN Settings** - Manage Access Point Names
- **Connection Status** - Monitor real-time connection status and speeds

### Wi-Fi Configuration
- **Basic Settings** - Configure SSID, password, and basic Wi-Fi parameters
- **Advanced Settings** - Advanced Wi-Fi configuration options
- **WPS Support** - Wi-Fi Protected Setup functionality
- **WLAN MAC Filter** - Control device access via MAC address filtering

### Communication Features
- **SMS Management** - Send, receive, and manage text messages
- **Phonebook** - Store and manage contacts

### System Management
- **Traffic Statistics** - Monitor data usage
- **Data Management** - Set alerts and limits for data consumption
- **Device Information** - View device status and system information
- **Firewall** - Configure firewall rules and security settings
- **Port Forwarding** - Manage port forwarding rules
- **Port Filtering** - Control port access
- **System Security** - Password management and security settings

### Additional Features
- **SD Card Support** - Manage SD card functionality (if supported)
- **Parental Control** - Control and monitor internet access
- **Power Save Mode** - Configure power-saving options
- **LAN Settings** - Configure local area network settings
- **Quick Settings** - Fast access to common configurations
- **Fast Boot** - Quick device startup options

## Technology Stack

### Frontend
- **JavaScript Framework**: RequireJS for modular JavaScript
- **UI Framework**: Bootstrap for responsive design
- **Data Binding**: Knockout.js (v3.4.2)
- **Templating**: jQuery Templates
- **Validation**: jQuery Validate
- **Charts**: ECharts for data visualization
- **UI Components**: jQuery UI, SimpleModal

### Internationalization
- Supports multiple languages
- English (en)
- Chinese Simplified (zh-cn)

## Directory Structure

```
.
├── index.html          # Main desktop interface
├── mobile.html         # Mobile interface redirect
├── app.build.js        # Build configuration
├── js/                 # JavaScript source files
│   ├── lib/           # Third-party libraries
│   ├── config/        # Configuration files
│   └── ...            # Application modules
├── tmpl/              # HTML templates
│   ├── home.html
│   ├── network/
│   ├── wifi/
│   └── ...
├── m/                 # Mobile-specific files
│   ├── views/
│   └── js/
├── i18n/              # Internationalization files
├── theme/             # CSS stylesheets
├── img/               # Images and icons
└── fonts/             # Font files
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/michaeldurkee/zteweb2.git
   cd zteweb2
   ```

2. Serve the application using a web server. You can use any static file server, for example:
   
   Using Python:
   ```bash
   python -m http.server 8080
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server -p 8080
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Build

The project uses RequireJS optimizer for building. To build the application:

```bash
# Requires Node.js and r.js
r.js -o app.build.js
```

This will create an optimized build in the `../webapp-build` directory.

## Usage

1. **Access the Interface**: Open the web application in your browser
2. **Login**: Enter your device credentials (default credentials are typically on the device label)
3. **Configure**: Use the menu to navigate to different sections and configure your device
4. **Monitor**: View real-time statistics and connection status on the home page

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 9+ (with HTML5 shiv and respond.js polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

The application follows a modular architecture using RequireJS:

- **Main Entry**: `js/main.js`
- **Configuration**: `js/config/config.js`
- **Services**: API communication layer
- **Views**: Template-based views with Knockout.js bindings
- **Router**: Client-side routing for navigation

## Notes

- This is a web interface for ZTE hardware devices
- Requires connection to a compatible ZTE router/modem to function
- Some features may vary depending on the specific device model and firmware

## License

Please check with the repository owner for licensing information.

## Contributing

Contributions, issues, and feature requests are welcome. Please check the issues page for known issues or to report new ones.
