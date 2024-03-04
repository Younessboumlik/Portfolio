
-- Create the portfolio database and use it
CREATE DATABASE portfolio;
USE portfolio;

-- Create the Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    status ENUM('professor', 'student') NOT NULL
);

-- Create the Services table
CREATE TABLE Services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL
);

-- Create the Courses table
CREATE TABLE Courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

-- Create the Groups table
CREATE TABLE Groupes (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    num_students INT NOT NULL DEFAULT 0,
    max_students INT DEFAULT 20,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- Create the StudentEnrollments table
CREATE TABLE StudentEnrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    num_months INT NOT NULL,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES Groupes(group_id)
);

-- Create the ProfessorEnrollments table
CREATE TABLE ProfessorEnrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    num_months INT NOT NULL,
    enrollment_date DATE NOT NULL,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES Groupes(group_id)
);

-- Create the ProfessorWaitingLists table
CREATE TABLE ProfessorWaitingLists (
    waiting_list_id INT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id INT NOT NULL,
    group_id INT NOT NULL,
    wait_date DATE NOT NULL,
    FOREIGN KEY (enrollment_id) REFERENCES ProfessorEnrollments(enrollment_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES Groupes(group_id)
);
