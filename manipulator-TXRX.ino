char input[6];
char state[6];
const int speed = 10;
#include <Servo.h>
#include <Braccio.h>
Servo base;
Servo shoulder;
Servo elbow;
Servo wrist_rot;
Servo wrist_ver;
Servo gripper;

void setup() {
  Braccio.begin();
  state[0] = 90;
  state[1] = 90;
  state[2] = 90;
  state[3] = 90;
  state[4] = 90;
  state[5] = 75;
  Serial.begin(9600);
}

void loop() {
  Braccio.ServoMovement(20, state[0], state[1], state[2], state[3], state[4], state[5]);
  delay(100);
}

void serialEvent() {
  if(Serial.available())
  {
    Serial.readBytes(input, 6);
    while (Serial.available())
      Serial.read();
  }
  input[0] -= 17;
  if(!(input[0] >= 0 && input[0] <= 180))
    input[0] = state[0];
  input[1] -= 17;
  if(!(input[1] >= 15 && input[1] <= 165))
    input[1] = state[1];
  input[2] -= 17;
  if(!(input[2] >= 0 && input[2] <= 180))
    input[2] = state[2];
  input[3] -= 17;
  if(!(input[3] >= 0 && input[3] <= 180))
    input[3] = state[3];
  input[4] -= 17;
  if(!(input[4] >= 0 && input[4] <= 180))
    input[4] = state[4];
  input[5] -= 17;
  if(!(input[5] >= 10 && input[5] <= 73))
    input[5] = state[5];
  Serial.println(input[0],DEC);
  Serial.println(input[1],DEC);
  Serial.println(input[2],DEC);
  Serial.println(input[3],DEC);
  Serial.println(input[4],DEC);
  Serial.println(input[5],DEC);
  state[0] = input[0];
  state[1] = input[1];
  state[2] = input[2];
  state[3] = input[3];
  state[4] = input[4];
  state[5] = input[5];
}
