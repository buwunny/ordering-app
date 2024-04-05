import csv
import querier
from io import StringIO

def file_validation(file):
    # # Check the file type
    # if file.mimetype != 'text/csv':
    #     return False

    # # Check the file size (max 1MB)
    # if file.content_length > 1 * 1024 * 1024:
    #     return False

    required_columns = ['Description', 'Vendor', 'Part Number', 'Unit Price', 'Quantity', 'Link', 'Notes', 'Purpose', 'Priority'] # Specify the required columns here

    file_stream = file.stream.read().decode('utf-8')
    csv_file = StringIO(file_stream)

    reader = csv.DictReader(csv_file)
    columns = reader.fieldnames

    for column in required_columns:
        if column not in columns:
            return "Invalid file: missing column " + column + ".", False

    return "Success", True

def csv_to_db(file, requester):
    file.stream.seek(0)
    file_stream = file.stream.read().decode('utf-8')
    csv_file = StringIO(file_stream)
    
    reader = csv.DictReader(csv_file)
    print(requester)
    for row in reader:
        querier.create_request({
            'description': row['Description'],
            'vendor': row['Vendor'],
            'partNumber': row['Part Number'],
            'unitPrice': row['Unit Price'],
            'quantity': row['Quantity'],
            'link': row['Link'],
            'notes': row['Notes'],
            'requester': requester,
            'purpose': row['Purpose'],
            'priority': row['Priority']
        })
