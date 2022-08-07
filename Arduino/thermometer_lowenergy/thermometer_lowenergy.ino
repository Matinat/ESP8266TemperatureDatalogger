/**
   Developed by Matias Natal - 2022  
 */

#include <FirebaseESP8266.h>
#include<ESP8266WiFi.h>
#include <DHT12.h>
#include <Wire.h>

#define FIREBASE_HOST "ENTER_FIREBASE_HOST"
#define FIREBASE_AUTH "ENTER_FIREBASE_AUTH"
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

uint8_t sda = 0;
uint8_t scl = 2;

const int SAMPLES = 5;
const long SLEEP_TIME = 2400e6;

FirebaseData firebaseData;

DHT12 dht12(sda, scl);

//If you want to speedup the connection, uncomment and fill with your router data (Static IP)
/**
  IPAddress subnet(255, 255, 255, 0);    // Subnet Mask
  IPAddress gateway(192, 168, 100, 1);   // Default Gateway
  IPAddress local_IP(192, 168, 100, 33); // Static IP Address
  IPAddress primaryDNS(8, 8, 8, 8);      // this is optional
  IPAddress secondaryDNS(8, 8, 4, 4);    // this is optional 
 */


void setup()
{
  Serial.begin(115200);
  if (!wifiConnect())
    sleep(SLEEP_TIME);

  dht12.begin();
  delay(2000);

  readData();
  sleep(SLEEP_TIME);
}

void sleep(long time) {
  WiFi.disconnect(true);
  ESP.deepSleep(time);
}


//Trato de eliminar outliers
void readData() {
  float temps[SAMPLES];
  float hums[SAMPLES];
  float temp_sum = 0;
  float hum_sum = 0;

  for (int i = 0; i < SAMPLES; ++i) {
    float temp = dht12.readTemperature();
    float hum = dht12.readHumidity();

    if (isnan(temp) || isnan(hum)) {
      --i;
    } else {
      temps[i] = temp;
      hums[i] = hum;
      temp_sum += temp;
      hum_sum += hum;
    }
    delay(400);
  }

  float avg_temp = temp_sum / SAMPLES;
  float avg_hum = hum_sum / SAMPLES;

  float temp_deviation_sum = 0;
  float hum_deviation_sum = 0;

  for (int i = 0; i < SAMPLES; ++i) {
    float temp_deviation = temps[i] - avg_temp;
    if (temp_deviation < 0)
      temp_deviation = -temp_deviation;

    float hum_deviation = hums[i] - avg_hum;
    if (hum_deviation < 0)
      hum_deviation = -hum_deviation;

    temp_deviation_sum += temp_deviation;
    hum_deviation_sum += hum_deviation;
  }

  float avg_temp_deviation = temp_deviation_sum / SAMPLES;
  float avg_hum_deviation = hum_deviation_sum / SAMPLES;

  int selected_temp_samples = 0;
  int selected_hum_samples = 0;

  float total_temp = 0;
  float total_hum = 0;

  //Si el desvio es mayor al desvio promedio, descarto el dato
  for (int i = 0; i < SAMPLES; ++i) {
    float temp_deviation = temps[i] - avg_temp;
    if (temp_deviation < 0)
      temp_deviation = -temp_deviation;

    float hum_deviation = hums[i] - avg_hum;
    if (hum_deviation < 0)
      hum_deviation = -hum_deviation;

    if (temp_deviation <= avg_temp_deviation) {
      total_temp += temps[i];
      ++selected_temp_samples;
    }

    if (hum_deviation <= avg_hum_deviation) {
      total_hum += hums[i];
      ++selected_hum_samples;
    }
  }

  if (selected_hum_samples > 0 && selected_temp_samples > 0) {
    total_temp = total_temp / selected_temp_samples;
    total_hum = total_hum / selected_hum_samples;
    updateFirebase(total_temp, total_hum);
  }
}

void loop() {
}

void updateFirebase(float temp, float hum) {
  FirebaseJson obj;
  obj.set("t", (double)temp);
  obj.set("h", (double)hum);
  String path = "hist";
  Firebase.push(firebaseData, path, obj);
  Serial.println("REASON: " + firebaseData.errorReason());
}

bool wifiConnect()
{
  WiFi.mode(WIFI_STA);
  //If you want to speedup the connection, uncomment (Static IP)
 // WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int teller = 0;
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(200);
    if (teller > 80)
      return false;
    teller++;
  }
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  return true;
}
