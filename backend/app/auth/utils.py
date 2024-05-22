import re
import bcrypt

def isInputSanitized(input):
    """
    Sanitize user inputs (e.g., username, email, phone number) to prevent potential injection attacks like SQL injection or XSS (Cross-Site Scripting).
    """
    return re.sub(r'[^a-zA-Z0-9@\._+\-\(\) ]', '', input)


def isPhonenumberValid(phone_number):
    """
    This regular expression will match Kenyan phone numbers in the following formats:

    7XXXXXXXX (local format without leading zero)

    07XXXXXXXX (local format with leading zero)
    
    +2547XXXXXXXX (international format with country code)

    """
    phone_regex = r'^(\+?254|0)?(7(?:[12389][0-9]|0[0-7])|(?:11[01]))[0-9]{6}$'
    return bool(re.match(phone_regex, phone_number))


def isEmailValid(email):
    """
    Validate the email format before storing it in the database to ensure its correctness.
    """
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(email_regex, email))



def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))