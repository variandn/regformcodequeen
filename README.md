# Premium Registration Form

A modern, responsive, and aesthetically pleasing registration form built with HTML5, CSS3, JavaScript, and Java Servlets.

## Features Included
- **Real-Time Validation**: Instant feedback for all form fields with clear error styling.
- **Password Strength Indicator**: Dynamic visual progress bar indicating password complexity.
- **Glassmorphism & Gradient Aesthetics**: Modern premium design optimized for all screen sizes.
- **Form Fields Handled**: Name, Email, Password, Confirm Password, Mobile (Pattern validated), Language Dropdown, File Upload with extension limits, Gender Radios, and Terms of Use Checkbox.
- **Interactive UI**: Micro-animations on submit, hover states, shake animation for invalid submissions, and spinner during processing.
- **Java Servlet Backend**: A sample servlet ready to handle the multipart form-data submission and echo back the results in a success page.

## Result Screenshot
![Registration Form Demo](images/demo.png)

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript
- Backend: Java Servlets (Java EE), Maven

## Steps to Run the Project

1. **Clone the repository:**
   ```bash
   git clone <YOUR-GITHUB-REPO-LINK>
   cd codequeenRegform
   ```

2. **Deploy via Maven or IDE:**
   - If using **Tomcat / TomEE**, you can deploy this directory using Eclipse, IntelliJ IDEA, or NetBeans by setting up a Tomcat Server configuration and adding this project as an exploded WAR.
   - Alternatively, build with Maven:
     ```bash
     mvn clean package
     ```
   - Then deploy the `.war` file generated in the `target` directory into the `webapps` folder of your running Tomcat server.

3. **View the Form:**
   - Once deployed and the server is running, navigate to:
     ```
     http://localhost:8080/registration-form/index.html
     ```
     *(The URL context path depends on how you configure your server)*

## Database Configuration

This application connects to a **MongoDB Atlas** cluster to save user registration data. 

To configure your database:
1. Open `src/main/java/com/codequeen/registration/RegisterServlet.java`.
2. Locate the `MONGODB_URI` constant:
   ```java
   private static final String MONGODB_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
   ```
3. Replace the placeholder URI with your actual MongoDB Atlas connection string.
4. The backend will automatically create a database named `registrationDB` and a collection named `users` to store the submitted data.

## Submission to GitHub

The local repository is already initialized. To submit this as your assignment:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```
