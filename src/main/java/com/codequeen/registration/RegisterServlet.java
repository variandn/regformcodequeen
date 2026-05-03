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
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
        maxFileSize = 1024 * 1024 * 10, // 10MB
        maxRequestSize = 1024 * 1024 * 50 // 50MB
)
public class RegisterServlet extends HttpServlet {

    // Reads MONGODB_URI from environment variable (set this on Render).
    // Falls back to hardcoded value for local development.
    private static final String MONGODB_URI = System.getenv("MONGODB_URI") != null
            ? System.getenv("MONGODB_URI")
            : "mongodb+srv://variandn04_db_user:dncodequeen@register.usfthdf.mongodb.net/?appName=register";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
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
                    .append("password", password)
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
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("<meta charset='UTF-8'>");
            out.println("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            out.println("<title>Registration Result</title>");
            out.println("<link href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500&display=swap' rel='stylesheet'>");
            out.println("<link rel='stylesheet' href='css/style.css'>");
            out.println("</head>");
            out.println("<body>");
            out.println("<div class='card'>");
            
            if (dbSuccess) {
                out.println("<h1 class='result-h1-success'>Successful</h1>");
                out.println("<p>Your registration has been processed and saved securely.</p>");
            } else {
                out.println("<h1 class='result-h1-error'>Partially Successful</h1>");
                out.println("<p>We received your request, but encountered a database error.</p>");
                out.println("<div class='error-box'><strong>MongoDB Error:</strong><br>" + dbError + "</div>");
            }

            out.println("<div class='details'>");
            out.println("<div class='detail-row'><span class='detail-label'>Name</span><span class='detail-value'>" + name + "</span></div>");
            out.println("<div class='detail-row'><span class='detail-label'>Email</span><span class='detail-value'>" + email + "</span></div>");
            out.println("<div class='detail-row'><span class='detail-label'>Mobile</span><span class='detail-value'>" + mobile + "</span></div>");
            out.println("<div class='detail-row'><span class='detail-label'>Language</span><span class='detail-value'>" + language + "</span></div>");
            out.println("<div class='detail-row'><span class='detail-label'>Gender</span><span class='detail-value'>" + gender + "</span></div>");
            out.println("<div class='detail-row'><span class='detail-label'>File</span><span class='detail-value'>" + fileName + "</span></div>");
            out.println("</div>");
            
            out.println("<a href='index.html' class='btn-back'>Back to Home</a>");
            out.println("</div>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}
