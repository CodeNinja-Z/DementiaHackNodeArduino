// constants won't change. They're used here to
// set pin numbers:
const int buttonPin = 2;     // the number of the pushbutton pin
const int buttonPin2 = 3;
const int ledPin =  13;      // the number of the LED pin

// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status
int buttonState2 = 0;

void setup() {
  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  buttonState2 = digitalRead(buttonPin2);
  
  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPin, LOW);
  }
  else {
    // turn LED off:
    digitalWrite(ledPin, HIGH);
    Serial.println("[id=1]");
    Serial.println("|end|");
    Serial.println("      ");
    delay(1000);
  }
  
  if (buttonState2 == HIGH) {
     digitalWrite(ledPin, LOW); 
  } else {
     digitalWrite(ledPin, HIGH);
    Serial.println("[id=2]");
    Serial.println("|end|");
    Serial.println("      ");
    delay(1000);
  }
}
