import json

class Person:
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address

    def display_person_info(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Address: {self.address}")


class Student(Person):
    def __init__(self, name, age, address, student_id):
        super().__init__(name, age, address)
        self.student_id = student_id
        self.grades = {}
        self.courses = []

    def add_grade(self, subject, grade):
        if subject in self.courses:
            self.grades[subject] = grade
            print(f"Grade {grade} added for {self.name} in {subject}.")
        else:
            print(f"{self.name} is not enrolled in {subject}.")

    def enroll_course(self, course):
        if course not in self.courses:
            self.courses.append(course)
            print(f"{self.name} enrolled in {course}.")
        else:
            print(f"{self.name} is already enrolled in {course}.")

    def display_student_info(self):
        self.display_person_info()
        print(f"ID: {self.student_id}")
        print(f"Enrolled Courses: {', '.join(self.courses)}")
        print(f"Grades: {self.grades}")


class Course:
    def __init__(self, course_name, course_code, instructor):
        self.course_name = course_name
        self.course_code = course_code
        self.instructor = instructor
        self.students = []

    def add_student(self, student):
        if student.student_id not in [s.student_id for s in self.students]:
            self.students.append(student)
            student.enroll_course(self.course_name)
            print(f"Student {student.name} enrolled in {self.course_name} (Code: {self.course_code}).")
        else:
            print(f"Student {student.name} is already enrolled in {self.course_name}.")

    def display_course_info(self):
        print(f"Course Name: {self.course_name}")
        print(f"Code: {self.course_code}")
        print(f"Instructor: {self.instructor}")
        print("Enrolled Students:", ", ".join([s.name for s in self.students]))


students = {}
courses = {}


def add_new_student():
    name = input("Enter Name: ")
    age = int(input("Enter Age: "))
    address = input("Enter Address: ")
    student_id = input("Enter Student ID: ")

    if student_id in students:
        print("Student ID already exists.")
        return
    student = Student(name, age, address, student_id)
    students[student_id] = student
    print(f"Student {name} (ID: {student_id}) added successfully.")


def add_new_course():
    course_name = input("Enter Course Name: ")
    course_code = input("Enter Course Code: ")
    instructor = input("Enter Instructor: ")

    if course_code in courses:
        print("Course code already exists.")
        return
    course = Course(course_name, course_code, instructor)
    courses[course_code] = course
    print(f"Course {course_code} created with instructor {instructor}.")


def enroll_student_in_course():
    student_id = input("Enter Student ID: ")
    course_code = input("Enter Course Code: ")

    if student_id not in students:
        print("Student ID not found.")
        return
    if course_code not in courses:
        print("Course code not found.")
        return

    student = students[student_id]
    course = courses[course_code]
    course.add_student(student)


def add_grade_for_student():
    student_id = input("Enter Student ID: ")
    course_code = input("Enter Course Code: ")
    grade = input("Enter Grade: ")

    if student_id not in students:
        print("Student ID not found.")
        return
    if course_code not in courses:
        print("Course code not found.")
        return
    student = students[student_id]
    course = courses[course_code]
    if course.course_name in student.courses:
        student.add_grade(course.course_name, grade)
    else:
        print(f"{student.name} is not enrolled in {course.course_name}.")


def display_student_details():
    student_id = input("Enter Student ID: ")
    if student_id in students:
        students[student_id].display_student_info()
    else:
        print("Student ID not found.")


def display_course_details():
    course_code = input("Enter Course Code: ")
    if course_code in courses:
        courses[course_code].display_course_info()
    else:
        print("Course code not found.")


def save_data():
    data = {
        "students": {
            sid: {
                "name": s.name,
                "age": s.age,
                "address": s.address,
                "student_id": s.student_id,
                "grades": s.grades,
                "courses": s.courses,
            } for sid, s in students.items()
        },
        "courses": {
            cc: {
                "course_name": c.course_name,
                "course_code": c.course_code,
                "instructor": c.instructor,
                "students": [s.student_id for s in c.students]
            } for cc, c in courses.items()
        }
    }
    with open("student_management_data.json", "w") as file:
        json.dump(data, file)
        print("Data saved successfully.")


def load_data():
    global students, courses
    try:
        with open("student_management_data.json", "r") as file:
            data = json.load(file)
            students = {}
            for sid, student_data in data["students"].items():
                student = Student(
                    student_data["name"],
                    student_data["age"],
                    student_data["address"],
                    student_data["student_id"]
                )
                student.grades = student_data["grades"]
                student.courses = student_data["courses"]
                students[sid] = student
            
            courses = {}
            for cc, course_data in data["courses"].items():
                course = Course(
                    course_data["course_name"],
                    course_data["course_code"],
                    course_data["instructor"]
                )
                course.students = [students[sid] for sid in course_data["students"]]
                courses[cc] = course
                
        print("Data loaded successfully.")
    except FileNotFoundError:
        print("No data file found.")


def main():
    menu = """
==== Student Management System ====
1. Add New Student
2. Add New Course
3. Enroll Student in Course
4. Add Grade for Student
5. Display Student Details
6. Display Course Details
7. Save Data to File
8. Load Data from File
0. Exit
    """
    while True:
        print(menu)
        choice = input("Select Option: ")
        if choice == "1":
            add_new_student()
        elif choice == "2":
            add_new_course()
        elif choice == "3":
            enroll_student_in_course()
        elif choice == "4":
            add_grade_for_student()
        elif choice == "5":
            display_student_details()
        elif choice == "6":
            display_course_details()
        elif choice == "7":
            save_data()
        elif choice == "8":
            load_data()
        elif choice == "0":
            print("Exiting Student Management System. Goodbye!")
            break
        else:
            print("Invalid option. Please try again.")

if __name__ == "__main__":
    main()
