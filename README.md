Metigy Technical Test

Tech used: React.js, Material UI, Node.js, Express, Mysql.

## Get Started

### 1. Environment Setup

To build images, run:
``` 
 $ docker-compose build
 ```
 
Before bring up the project, run:
``` 
 $ cd server
 $ npm install
 ```

To bring the project up, run:
``` 
 $ docker-compose up
 ```
Go to http://localhost:3000/ to check the front-end

To bring the project down, run:
``` 
 $ docker-compose down
 ```

### 2. Usage

- Front-end : http://localhost:3000/
- phpMyAdmin : http://localhost:8080/ (username: root; password: password)

### 3. To Do List

- Error handling: back-end sends back error message to front-end and display with a popup window;
- Code refactoring: create components for input field, checkbox etc. to DRY front-end code;
- Data structure: create a more effective and meaningful data structure;
- Responsive: improve responsive layout for some breakpoints to improve user experience;
- Fix flash of uncompleted layout before getting data;