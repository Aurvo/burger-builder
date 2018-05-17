This project is currently a work in progress. It is the main project of Udemy's 'React 16 
- The Complete Guide (incl. React Router 4 & Redux)' course that I'm making along with the 
instructor (with some personal adjustments) in order to better understand React. While I 
did not make this by myself, I still believe it demonstrates a considerable understanding 
of React and general web development related knowledge.

Important: The firebase backend I had for the project may not exist at the time you view this.
Making your own is super easy, though: create a google account, google "Firebase", on the Google
Firebase site that shows up, start the free plan and create a Firebase project.

When you have a project, follow these instructions to configure it and this burger bilder
app to properly use it:
1. In the database section, create an array "Ingredients" that looks like this (order matters):
Ingredients:
    0
        count: 0
        name: "Salad"
        price: ".6"
    1
        count: 0
        name: "Bacon"
        price: ".5"
    2
        count: 0
        name: "Cheese"
        price: ".4"
    3
        count: 0
        name: "Meat"
        price: "1"
2. In the database section under the "Rules" tab, make the rules look like this:
{
  "rules": {
    "Ingredients": {
    	".read": "true",
    	".write": "true",
    },
    "orders": {
    	".read": "auth != null",
    	".write": "auth != null",
        ".indexOn": ["userId"]
    }
  }
}
3. Todo
4. Todo


Bbootstrapped with Create React App.