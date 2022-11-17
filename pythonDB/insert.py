import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import pymysql

def main() :

    conn = pymysql.connect(
        host = 'localhost',
        user = 'dummy1',
        password = 'dummy1234',
        db = 'jejuDB',
        charset = 'utf8'
    )

    sql = "INSERT INTO user (areaName) values (%s)"

    datas = pd.read_csv('./data.csv',encoding='cp949')
    dataArr = datas['종전주소']

    for i in range( len(dataArr) ) :
        with conn:
            with conn.cursor() as cur:
                cur.execute(sql, (dataArr[ i ]))
                conn.commit()
                    
if (__name__) == "__main__" :
    main()
