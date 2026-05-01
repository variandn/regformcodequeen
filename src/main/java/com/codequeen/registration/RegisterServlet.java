package com.codequeen.registration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@WebServlet("/register")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024 * 2, // 2MB
    maxFileSize = 1024 * 1024 * 10,      // 10MB
    maxRequestSize = 1024 * 1024 * 50    // 50MB
)
public class RegisterServlet extends HttpServlet {

    // Replace with your MongoDB Atlas connection string
    // Best practice is to load this from an environment variable: System.getenv("MONGODB_URI")
    private static final String MONGODB_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String mobile = request.getParameter("mobile");
        String language = request.getParameter("language");
        String gender = request.getParameter("gender");
        Part attachmentPart = request.getPart("attachment");

        String fileName = "";
        if (attachmentPart != null) {
            fileName = attachmentPart.getSubmittedFileName();
        }

        boolean dbSuccess = false;
        String dbError = "";

        // Connect to MongoDB and insert the record
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
            MongoDatabase database = mongoClient.getDatabase("registrationDB");
            MongoCollection<Document> collection = database.getCollection("users");

            Document userDoc = new Document("name", name)
                    .append("email", email)
                    .append("mobile", mobile)
                    .append("language", language)
                    .append("gender", gender)
                    .append("attachmentName", fileName)
                    .append("registrationDate", new Date());

            collection.insertOne(userDoc);
            dbSuccess = true;
        } catch (Exception e) {
            e.printStackTrace();
            dbError = e.getMessage();
        }

        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Registration Success</title>");
            out.println("<style>");
            out.println("body { font-family: 'Inter', sans-serif; background: #f0f4ff; color: #1f2937; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }");
            out.println(".card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 500px; width: 100%; }");
            out.println("h1 { color: #10b981; }");
            out.println(".error-msg { color: #ef4444; background: #fef2f2; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: left; font-size: 0.9rem; }");
            out.println("ul { text-align: left; background: #f9fafb; padding: 1rem 2rem; border-radius: 8px; list-style-type: none; }");
            out.println("li { margin-bottom: 0.5rem; }");
            out.println("a { display: inline-block; margin-top: 1rem; color: white; background: #6366f1; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 8px; transition: background 0.3s; }");
            out.println("a:hover { background: #4f46e5; }");
            out.println("</style>");
            out.println("</head>");
            out.println("<body>");
            out.println("<div class='card'>");
            
            if (dbSuccess) {
                out.println("<h1>Registration Successful!</h1>");
                out.println("<p>Thank you for registering. Your details have been saved to MongoDB.</p>");
            } else {
                out.println("<h1 style='color: #ef4444;'>Registration Partially Successful</h1>");
                out.println("<p>We received your request, but failed to save it to the database.</p>");
                out.println("<div class='error-msg'><strong>MongoDB Error:</strong><br>" + dbError + "<br><br><em>(Did you remember to update the MONGODB_URI in RegisterServlet.java?)</em></div>");
            }
            
            out.println("<ul>");
            out.println("<li><strong>Name:</strong> " + name + "</li>");
            out.println("<li><strong>Email:</strong> " + email + "</li>");
            out.println("<li><strong>Mobile:</strong> " + mobile + "</li>");
            out.println("<li><strong>Language:</strong> " + language + "</li>");
            out.println("<li><strong>Gender:</strong> " + gender + "</li>");
            out.println("<li><strong>Attachment:</strong> " + fileName + "</li>");
            out.println("</ul>");
            out.println("<a href='index.html'>Back to Home</a>");
            out.println("</div>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}
