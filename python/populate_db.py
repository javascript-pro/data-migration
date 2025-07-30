import sqlite3
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

DB_PATH = "../data-migration.db"

def create_table(conn):
    conn.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            applicant_name TEXT,
            applicant_age INTEGER,
            income REAL,
            address TEXT,
            application_date TEXT,
            status TEXT,
            notes TEXT
        )
    ''')
    conn.commit()

def random_status():
    base = ["pending", "approved", "rejected"]
    # Introduce typos and variants
    variants = base + ["pendng", "apprved", "rejectd", "pending ", "approved ", None]
    return random.choice(variants)

def random_age():
    choices = [random.randint(18, 90), None, -1, 0, 150]
    return random.choice(choices)

def random_income():
    # Mostly normal incomes, but some outliers or null
    choices = [round(random.uniform(10000, 100000), 2), None, -5000, 9999999]
    return random.choice(choices)

def random_date():
    # Random date in last 2 years, some as strings in different formats, some invalid
    base_date = fake.date_between(start_date='-2y', end_date='today')
    formats = [
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%m-%d-%Y",
        "%Y/%m/%d",
        None,  # Null date
        "not a date"
    ]
    fmt = random.choice(formats)
    if fmt is None:
        return None
    elif fmt == "not a date":
        return "not a date"
    else:
        return base_date.strftime(fmt)

def random_notes():
    notes = [fake.sentence(), None, "", "N/A", "###@@@!!!", fake.text(max_nb_chars=100)]
    return random.choice(notes)

def insert_data(conn, count=500):
    create_table(conn)
    cursor = conn.cursor()

    for _ in range(count):
        cursor.execute('''
            INSERT INTO applications 
            (applicant_name, applicant_age, income, address, application_date, status, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            fake.name(),
            random_age(),
            random_income(),
            fake.address().replace("\n", ", "),
            random_date(),
            random_status(),
            random_notes()
        ))

    conn.commit()
    print(f"Inserted {count} records")

if __name__ == "__main__":
    conn = sqlite3.connect(DB_PATH)
    insert_data(conn)
    conn.close()
