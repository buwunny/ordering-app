import mysql.connector
import json

credentials = json.load(open('/home/bunny/repos/ordering-app/backend/myflaskapp/credentials.json'))
cnx = mysql.connector.connect(user=credentials['user'], password=credentials['password'], host=credentials['host'], database=credentials['database'])
cursor = cnx.cursor()
dictCursor = cnx.cursor(dictionary=True)   
cursor.execute("SELECT * FROM Requests")
results = cursor.fetchall()


def create_request(data):
    query = "INSERT INTO Requests (Description, Vendor, Part_Num, Unit_Price, Quantity, Link, Notes) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    values = tuple(data[key] for key in ['description', 'vendor', 'partNumber', 'unitPrice', 'quantity', 'link', 'notes'])
    cursor.execute(query, values)
    cnx.commit()

def read_requests():
    dictCursor.execute("SELECT * FROM Requests")
    results = dictCursor.fetchall()
    # print(json.dumps(results))
    return results

def delete_employee(id):
    query = "DELETE FROM Employees WHERE ID = %s"
    cursor.execute(query, (id,))
    cnx.commit()

# create_employee({'description': 'New Employee', 'vendor': 'ACME', 'partNumber': '123', 'unitPrice': 10.99, 'quantity': 5, 'link': 'https://example.com', 'notes': 'Some notes'})
# create_employee({'description': 'Another Employee', 'vendor': 'XYZ Corp', 'partNumber': '456', 'unitPrice': 19.99, 'quantity': 3, 'link': 'https://example.com', 'notes': 'More notes'})
# create_employee({'description': 'Third Employee', 'vendor': 'ABC Inc', 'partNumber': '789', 'unitPrice': 7.99, 'quantity': 10, 'link': 'https://example.com', 'notes': 'Additional notes'})
read_requests()