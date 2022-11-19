# -*- coding: utf-8 -*-


import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import pymysql

def main() :
    
    conn = pymysql.connect(
        host = '13.125.223.194',
        user = 'dummy1',
        password = 'dummy1234',
        db = 'jejuDB',
        charset = 'utf8',
        port = 54304
    )
    
    sql = "INSERT INTO jejuareadb (areaName,createdAt,updatedAt,deletedAt) values (%s , %s , %s , %s)"

    datas = pd.read_csv('./data.csv',encoding='cp949')
    dataArr = datas['종전주소']
    
    cursor = conn.cursor()

    for i in range( len(dataArr) ) :
        try:
            cursor.execute(sql, (dataArr[ i ],'2022-11-11','2022-11-11','2022-11-11'))
            print( i )
        except:
            conn.commit()
            conn.close()
    conn.commit()
    conn.close()
if (__name__) == "__main__" :
    main()
