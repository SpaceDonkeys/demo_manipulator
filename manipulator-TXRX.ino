unsigned char input[6];
int state[6];
int target[6];
unsigned int servoSpeed = 50;
const int soft_start_level = 70;
#include <Servo.h>
#include <Arduino.h>
Servo servo[6];

void softwarePWM(int high_time, int low_time){
  digitalWrite(12/*SOFT_START_CONTROL_PIN*/,HIGH);
  delayMicroseconds(high_time);
  digitalWrite(12/*SOFT_START_CONTROL_PIN*/,LOW);
  delayMicroseconds(low_time); 
}

void setup() {
  pinMode(12/*SOFT_START_CONTROL_PIN*/,OUTPUT);
  digitalWrite(12/*SOFT_START_CONTROL_PIN*/,LOW);
    
  servo[0].attach(11); // base
  servo[1].attach(10); // shoulder
  servo[2].attach(9);  // elbow
  servo[3].attach(6);  // wrist_ver
  servo[4].attach(5);  // wrist_rot
  servo[5].attach(3);  // gripper

  state[0] = 90;
  state[1] = 90;
  state[2] = 90;
  state[3] = 90;
  state[4] = 90;
  state[5] = 75;
  
  for(int i = 6; i--;)
    target[i] = state[i];

  servo[0].write(state[0]);
  servo[1].write(state[1]);
  servo[2].write(state[2]);
  servo[3].write(state[3]);
  servo[4].write(state[4]);
  servo[5].write(state[5]);
  
  Serial.begin(9600);

  long int tmp = millis();
  while(millis() - tmp < 2000 )
    softwarePWM(80 + soft_start_level, 450 - soft_start_level);   //the sum should be 530usec  

  while(millis() - tmp < 6000)
    softwarePWM(75 + soft_start_level, 430 - soft_start_level); //the sum should be 505usec

  digitalWrite(12/*SOFT_START_CONTROL_PIN*/,HIGH);
}

void loop() {
  for(int i = 6; i--;)
  {
    if(state[i] < target[i])
      state[i]++;
    else if(state[i] > target[i])
      state[i]--;
    servo[i].write(state[i]);
  }
  delay(servoSpeed);
}

bool inrange(int a, int min, int max)
{
  return a >= min && a <= max;
}

void serialEvent() {
  char a = Serial.read(); 
  char b = Serial.read();
  char c = Serial.read();
  if(!(a == 'p' && b == 'o' && c == 's') && !(a == 'd' && b == 'e' && c == 'l'))
  {
    while (Serial.available())
      Serial.read();
    return;
  }
  if(a == 'd' && b == 'e' && c == 'l')
  {
    if(Serial.available() > 1)
    {
      int temp = 0;
      char c = Serial.read();
      while(inrange(c, 48, 57) && Serial.available())
      {
        temp *= 10;
        temp += c - 48;
        c = Serial.read();
      }
      servoSpeed = temp;
    }
    if(servoSpeed < 0 || servoSpeed > 1000)
      servoSpeed = 50;
    Serial.println("servo speed");
    Serial.println(servoSpeed, DEC);
  }
  else if(Serial.available() >= 7)
  {
    Serial.readBytes(input, 6);
    input[0] -= 20;
    if(!(input[0] >= 0 && input[0] <= 180))
      input[0] = target[0];
    input[1] -= 20;
    if(!(input[1] >= 15 && input[1] <= 165))
      input[1] = target[1];
    input[2] -= 20;
    if(!(input[2] >= 0 && input[2] <= 180))
      input[2] = target[2];
    input[3] -= 20;
    if(!(input[3] >= 0 && input[3] <= 180))
      input[3] = target[3];
    input[4] -= 20;
    if(!(input[4] >= 0 && input[4] <= 180))
      input[4] = target[4];
    input[5] -= 20;
    if(!(input[5] >= 10 && input[5] <= 73))
      input[5] = target[5];
    target[0] = input[0];
    target[1] = input[1];
    target[2] = input[2];
    target[3] = input[3];
    target[4] = input[4];
    target[5] = input[5];
    Serial.println("new target");
    Serial.println(target[0],DEC);
    Serial.println(target[1],DEC);
    Serial.println(target[2],DEC);
    Serial.println(target[3],DEC);
    Serial.println(target[4],DEC);
    Serial.println(target[5],DEC);
  }else{
    Serial.println("position");
    Serial.println(state[0],DEC);
    Serial.println(state[1],DEC);
    Serial.println(state[2],DEC);
    Serial.println(state[3],DEC);
    Serial.println(state[4],DEC);
    Serial.println(state[5],DEC);
  }
  while (Serial.available())
    Serial.read();
}
