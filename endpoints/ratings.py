from silence.decorators import endpoint

@endpoint(
    route="/ratings/$photoId",
    method="GET",
    sql="SELECT AVG(rating) rate FROM Ratings WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO Ratings (userId, photoId, rating) VALUES ($userId, $photoId, $rating)",
    description="Creates a new rating",
    auth_required=True,
)
def create(userId, photoId, rating):
    pass

###############################################################################

@endpoint(
    route="/ratings/$userId/$photoId",
    method="PUT",
    sql="UPDATE Ratings SET rating = $rating WHERE userId = $userId and photoId = $photoId",
    description="Updates the rating of an existing photo",
    auth_required=True,
)
def update(rating):
    pass