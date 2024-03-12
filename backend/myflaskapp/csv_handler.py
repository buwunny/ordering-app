import csv, querier

def file_validation(file_path):
    required_columns = ['column1', 'column2', 'column3']  # Specify the required columns here

    with open(file_path, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        columns = reader.fieldnames

        for column in required_columns:
            if column not in columns:
                return False

    return True

def csv_to_db(file_path):
    with open(file_path, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            querier.create_request(row['column1'], row['column2'], row['column3'])
    return True