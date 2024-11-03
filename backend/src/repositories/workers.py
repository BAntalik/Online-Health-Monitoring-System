from typing import List
from repositories.user import User, Role, UserInfo
from repositories.db_service import DBService

class Worker(User):

    def __init__(self, worker_id: int, image: int, name: str, email: str, phone_number: int, role: Role):
        self.worker_id = worker_id
        self.image = image
        self.name = name
        self.email = email
        self.phone_number = phone_number
        self.role = role

    def create_worker(self, worker: 'Worker'):
        """
        Creates a new worker record.
        """
        # Implementation for creating a worker
        pass

    def create_worker_instance(self) -> 'Worker':
        """
        Creates and returns a new instance of Worker.
        """
        # Implementation for creating a new Worker instance
        return Worker(0, 0, "", "", 0, Role.STAF)  # Placeholder, replace with actual logic
    
    @staticmethod
    def get_user_record(email: str, password: str) -> UserInfo:
        checkWork = """SELECT COUNT(usertype) FROM workers WHERE email = %s AND staffpassword = %s"""
        fetchWork = """SELECT usertype FROM workers WHERE email = %s AND staffpassword = %s"""
        strRole = ""
        
        db = DBService()
        conn = db.get_db_connection()

        cursor = conn.cursor()
        cursor.execute(checkWork, (email, password))
        check = cursor.fetchone()
        if check is None:
            userRole = Role.NONE
        else:  
            cursor.execute(fetchWork, (email, password))
            strRole = cursor.fetchone()

            if check is not None:
                if strRole:
                    strRole = strRole[0]
        
        cursor.close()
        del cursor
        conn.close()

        for role in Role:
            if role.value == strRole:
                info = UserInfo()
                info.setRole(role)
                info.setEmail(email)
                info.setPassword(password)
                return info

        info = UserInfo()
        info.setRole(Role.NONE)
        return info

    @staticmethod
    def get_doctors_list() -> List:
        fetchEmailNId = """SELECT workersID, email FROM workers WHERE userType = 'Doctor';"""
        
        db = DBService()
        conn = db.get_db_connection()

        cursor = conn.cursor()
        cursor.execute(fetchEmailNId)
        doctors = cursor.fetchall()

        doctors_info_list = []

        if doctors:
            for doc in doctors:
                info = UserInfo()
                info.setId(doc[0])
                info.setEmail(doc[1])
                doctors_info_list.append(info)

        cursor.close()
        del cursor
        conn.close()

        return doctors_info_list

        

