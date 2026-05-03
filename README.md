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
- Frontend: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
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

The `MONGODB_URI` is read from an **environment variable** at runtime. If the variable is not set, it falls back to the hardcoded default in `RegisterServlet.java`.

- **Local development**: Set the `MONGODB_URI` environment variable on your machine, or edit the fallback value in `RegisterServlet.java`.
- **Render / Production**: Set `MONGODB_URI` as an environment variable in your Render dashboard (see below).

The backend will automatically create a database named `registrationDB` and a collection named `users`.

## Deploy to Render

This project includes a `Dockerfile` for one-click deployment to [Render](https://render.com).

### Steps

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add Dockerfile for Render deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render:**
   - Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**
   - Connect your GitHub repository
   - Render will automatically detect the `Dockerfile`

3. **Set environment variables:**
   - In the Render service settings, go to **Environment** → **Add Environment Variable**
   - Add:
     | Key | Value |
     |-----|-------|
     | `MONGODB_URI` | `mongodb+srv://<user>:<pass>@cluster.mongodb.net/?appName=register` |

4. **Deploy!**
   - Click **Create Web Service** — Render will build the Docker image and start your Tomcat server
   - Your form will be available at `https://your-service-name.onrender.com/`

### Important Notes
- Make sure your **MongoDB Atlas Network Access** allows connections from `0.0.0.0/0` (or Render's IP ranges)
- Render automatically sets the `PORT` environment variable; the Dockerfile is pre-configured to use it

## Submission to GitHub

The local repository is already initialized. To submit this as your assignment:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```
