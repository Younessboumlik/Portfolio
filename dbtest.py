import mysql.connector

try:
    cnx = mysql.connector.connect(user='sql11692837',
                                  password='ESZ2YTvzKy',
                                  host='sql11.freesqldatabase.com',
                                  database='sql11692837')
    print("Connection established")
except mysql.connector.Error as err:
    print("An error occurred: {}".format(err))

