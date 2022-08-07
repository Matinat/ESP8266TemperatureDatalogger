# Firebase Temperature data logger | ESP8266 Wifi thermometer

If you liked the project, please buy me a coffee: [Buy me a coffee](https://www.buymeacoffee.com/matiasnatal)

External Libraries used in this project:
[Firebase ESP8266](https://github.com/mobizt/Firebase-ESP8266)
[DHT12](https://github.com/xreef/DHT12_sensor_library)

Other libraries:
Wire and ESP8266WiFi

![](/Resources/thermometer1.jpg)

![](/Resources/thermometer2.jpg)

# Schematics

![](/Resources/Schematic.png)


# Enabling deep sleep in ESP-01

[Enable deep sleep ESP-01](https://www.tech-spy.co.uk/2019/04/enable-deep-sleep-esp-01)


# Configuration

**Arduino file**

```cpp
	#define FIREBASE_HOST "ENTER_FIREBASE_HOST"
	#define FIREBASE_AUTH "ENTER_FIREBASE_AUTH"
	#define WIFI_SSID "YOUR_WIFI_SSID"
	#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
```

**Controller file** (Located in Web Site/public/Controllers/FirebaseController)
```
	apiKey: "YOUR_FIREBASE_API_KEY",
	authDomain: "YOUR_FIREBASE_DOMAIN",
	databaseURL: "YOUR_FIREBASE_DATABSE_URL",
	projectId: "YOUR_FIREBASE_PROJECT_ID",
	storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
	messagingSenderId: "YOUR_FIREBASE_SENDER_ID",
	appId: "YOUR_FIREBASE_APP_ID"
```

# Web site screenshot

![](/Resources/website.png)



If you liked the project, please buy me a coffee: [Buy me a coffee](https://www.buymeacoffee.com/matiasnatal)

