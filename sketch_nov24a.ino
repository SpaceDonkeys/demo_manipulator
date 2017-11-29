char input[6];
char state[6];
char target[6];
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
  state[0] = target[0] = 90;
  state[1] = target[1] = 90;
  state[2] = target[2] = 90;
  state[3] = target[3] = 90;
  state[4] = target[4] = 90;
  state[5] = target[5] = 75;
  Serial.begin(9600);
}

void loop() {
  state[0] = target[0];
  state[1] = target[1];
  state[2] = target[2];
  state[3] = target[3];
  state[4] = target[4];
  state[5] = target[5];
  Braccio.ServoMovement(0, state[0], state[1], state[2], state[3], state[4], state[5]);
  delay(100);
}

void serialEvent() {
  if(Serial.available())
  {
    Serial.readBytes(input, 6);
    while (Serial.available())
      Serial.read();
  }
  input[0] -= 16;
  if(!(input[0] >= 0 && input[0] <= 180))
    return;
  input[1] -= 16;
  if(!(input[1] >= 15 && input[1] <= 165))
    return;
  input[2] -= 16;
  if(!(input[2] >= 0 && input[2] <= 180))
    return;
  input[3] -= 16;
  if(!(input[3] >= 0 && input[3] <= 180))
    return;
  input[4] -= 16;
  if(!(input[4] >= 0 && input[4] <= 180))
    return;
  input[5] -= 16;
  if(!(input[5] >= 10 && input[5] <= 73))
    return;
  target[0] = input[0];
  target[1] = input[1];
  target[2] = input[2];
  target[3] = input[3];
  target[4] = input[4];
  target[5] = input[5];
}
