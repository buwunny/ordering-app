import mysql.connector
import json

credentials = json.load(open('/home/bunny/repos/ordering-app/backend/myflaskapp/credentials.json'))
cnx = mysql.connector.connect(user=credentials['user'], password=credentials['password'], host=credentials['host'], database=credentials['database'])
cursor = cnx.cursor()
dictCursor = cnx.cursor(dictionary=True)   
cursor.execute("SELECT * FROM Requests")
results = cursor.fetchall()

vendors = [
    "Amazon",
    "Andy Mark",
    "Automation Direct",
    "Bimba",
    "Bolt Depot",
    "CTRE",
    "Del City",
    "Digikey",
    "Ferrules Direct",
    "Home Depot",
    "Local Vendor",
    "McMaster",
    "Powerx",
    "REV Robotics",
    "Robo Promo",
    "SDS",
    "Thrifty Bot",
    "VEX Robotics",
    "Vbelt Guys",
    "WCP",
]

purposes = [
    "Robot Parts",
    "Tools",
]

# REQUESTS FUNCTIONS
def create_request(data):
    query = "INSERT INTO Requests (Description, Vendor, Part_Num, Unit_Price, Quantity, Link, Notes, Requester, Purpose, Priority) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = tuple(data[key] for key in ['description', 'vendor', 'partNumber', 'unitPrice', 'quantity', 'link', 'notes', 'requester', 'purpose', 'priority'])
    cursor.execute(query, values)
    cnx.commit()

def read_requests():
    dictCursor.execute("SELECT * FROM Requests")
    results = dictCursor.fetchall()
    return results[::-1]

def read_request(id):  
    query = "SELECT * FROM Requests WHERE ID = %s"
    dictCursor.execute(query, (id,))
    result = dictCursor.fetchone()
    return result

def update_request_status(id, status):
    query = "UPDATE Requests SET Status = %s WHERE ID = %s"
    cursor.execute(query, (status, id))
    cnx.commit()


def delete_request(id):
    query = "DELETE FROM Requests WHERE ID = %s"
    cursor.execute(query, (id,))
    cnx.commit()

def request_to_order(id):
    create_order(read_request(id))

# ORDERS FUNCTIONS
def create_order(data):
    query = "INSERT INTO Orders (Description, Vendor, Part_Num, Unit_Price, Quantity, Link, Notes, Requester, Purpose, Priority) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = tuple(data[key] for key in ['Description', 'Vendor', 'Part_Num', 'Unit_Price', 'Quantity', 'Link', 'Notes', 'Requester', 'Purpose', 'Priority'])
    cursor.execute(query, values)
    cnx.commit()

def read_orders():
    dictCursor.execute("SELECT * FROM Orders")
    results = dictCursor.fetchall()
    return results[::-1]

def read_filtered_orders(field, value, other=False):
    if other:
        values = vendors if field == 'Vendor' else purposes
        placeholders = ', '.join('%s' for _ in values)
        query = "SELECT * FROM Orders WHERE `{}` NOT IN ({})".format(field, placeholders)
        dictCursor.execute(query, values)
    else:
        query = "SELECT * FROM Orders WHERE `{}` = %s".format(field)
        dictCursor.execute(query, (value,))
    results = dictCursor.fetchall()
    return results

def update_order(id, data):
    query = """
    UPDATE Orders 
    SET Description = %s, Notes = %s, Order_Date = %s, Payee = %s, Invoice_Num = %s, Carted = %s, Ordered = %s, Received = %s 
    WHERE ID = %s
    """
    values = (data['Description'], data['Notes'], data['Order_Date'], data['Payee'], data['Invoice_Num'], data['Carted'], data['Ordered'], data['Received'], id)
    cursor.execute(query, values)
    cnx.commit()