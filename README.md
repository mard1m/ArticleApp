# ArticleApp

# Installation instructions
## Prerequisites
1. Java: Install Java Development Kit (JDK) 17 or higher.
- [Download JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- To check if Java is installed, run:
  ### `java -version`

2. Maven: Install Apache Maven for building the Spring Boot project.
- [Download Maven](https://maven.apache.org/download.cgi)
- Verify Maven installation:
  ### `mvn -version`

 3. PostgreSQL: Install PostgreSQL and set up a database for the application.
- [Download PostgreSQL](https://www.postgresql.org/download/)
- Create a database for the project:
  ### `CREATE DATABASE article_platform;`
  
4. Node.js: Install Node.js and npm (Node Package Manager)
- [Download Node.js](https://nodejs.org/en)
- Verify Node installation:
  ### `node -v`
  ### `npm -v`

## Backend and Frontend Installations
1. Clone the repository:
   ### `git clone https://github.com/mard1m/ArticleApp.git`
2. Configure pplication.properties
- Navigate to src/main/resources/application.properties and configure the database settings: 
    ### `spring.datasource.url=jdbc:postgresql://localhost:5432/article_platform spring.datasource.username=app_user                   spring.datasource.password=yourpassword`
3. Build and run Spring Boot application
    ### `mvn clean install`
    ### `mvn spring-boot:run`
4. Install dependecies
    ### `npm install`
5. Start the React development server
    ### `npm start`
- The frontend will be available at http://localhost:3000.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
