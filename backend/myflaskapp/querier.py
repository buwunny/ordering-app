import mysql.connector

cnx = mysql.connector.connect(user='bunny', password='', host='localhost', database='mydatabase')

cursor = cnx.cursor()
cursor.execute("SELECT * FROM Employees")
results = cursor.fetchall()


def create_employee(first_name, last_name, birth_date):
    query = "INSERT INTO Employees (FirstName, LastName, BirthDate) VALUES (%s, %s, %s)"
    values = (first_name, last_name, birth_date)
    cursor.execute(query, values)
    cnx.commit()

def read_employees():
    cursor.execute("SELECT * FROM Employees")
    results = cursor.fetchall()
    for row in results:
        print(row)

def delete_employee(id):
    query = "DELETE FROM Employees WHERE ID = %s"
    cursor.execute(query, (id,))
    cnx.commit()
# create_employee("John", "Doe", "1990-01-01")
# create_employee("Jane", "Doe", "1990-01-01")
# create_employee("John", "Smith", "1990-01-01")
read_employees()