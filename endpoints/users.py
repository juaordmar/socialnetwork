from silence.decorators import endpoint

#un endpoint es el punto por el que se accede a la bbdd
#el endpoint de la universidad cuando vas a sacar la matrícula sería la ventanilla

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)

def get_by_id():
    pass
