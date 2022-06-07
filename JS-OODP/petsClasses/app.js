// below we can see some repeating code. We can create parent class to help us make the code more efficient.
// class Cat {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   eat() {
//     return `${this.name} is eating, nom nom nom`;
//   }
//   meow() {
//     return "MEOUUW";
//   }
// }

// class Dog {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   eat() {
//     return `${this.name} is eating, nom nom nom`;
//   }
//   bark() {
//     "WOOOF!";
//   }
// }

// parent class
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating, nom nom nom`;
  }
}

// then to use Pet class for Dog and Cat, we can use keyword extend
class Dog extends Pet {
  bark() {
    return "WOOOF!";
  }
  // before this line this class would take eat() from the Pet class. But if we have a method with the same name declared in the extended class, it will overwrite the parent class's method.
  eat() {
    return `${this.name} is devouring their food`;
  }
}

class Cat extends Pet {
  // we use the constructor from the parent class. but if we need to change something in the constructor
  constructor(name, age, color) {
    // to reuse all we had in the original constructor call super()
    super(name, age);
    this.color = color;
  }
  meow() {
    return "MEOUUW";
  }
}

const maska = new Dog("Maska", 9);
const yasya = new Cat("Yasya", 10, "grey");
