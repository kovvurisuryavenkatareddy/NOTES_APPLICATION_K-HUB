from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from motor.motor_asyncio import AsyncIOMotorClient
import jwt
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId

# Secret key and algorithm for JWT
SECRET_KEY = "VIr{sQMa[`6[/86vb}rN)F|3By|n~~"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

# FastAPI app instance
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["http://localhost:3000"]
)

# MongoDB client and database
client = AsyncIOMotorClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
db = client["userdb"]  # Replace with your database name
collection = db["users"]  # Replace with your collection name
notes_collection = db["notes"]

# Pydantic model for login data
class LoginClass(BaseModel):
    username: str
    password: str

# Pydantic model for note data
class NoteClass(BaseModel):
    title: str
    content: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency function to get current user from token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("username")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# Root route
@app.get("/")
def read_root():
    return {"BACKDEND": "SERVER RUNNING!"}

# Login route
@app.post("/login")
async def login_user(login_item: LoginClass):
    data = jsonable_encoder(login_item)
    user = await collection.find_one({"username": data["username"]})
    
    if user and user['password'] == data['password']:
        encoded_jwt = jwt.encode({"username": data["username"]}, SECRET_KEY, algorithm=ALGORITHM)
        return {'token': encoded_jwt}
    else:
        raise HTTPException(status_code=401, detail="Login failed")

# Register route
@app.post("/register")
async def register_user(login_item: LoginClass):
    data = jsonable_encoder(login_item)
    existing_user = await collection.find_one({"username": data["username"]})
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    new_user = {"username": data["username"], "password": data["password"]}
    await collection.insert_one(new_user)
    return {"message": "User registered successfully"}

# CRUD operations for notes


# Create note
@app.post("/notes")
async def create_note(note: NoteClass, current_user: str = Depends(get_current_user)):
    note_data = jsonable_encoder(note)
    note_data["username"] = current_user
    result = await notes_collection.insert_one(note_data)
    return {"message": "Note created successfully", "note_id": str(result.inserted_id)}

# Read notes
@app.get("/notes")
async def read_notes(current_user: str = Depends(get_current_user)):
    try:
        notes = await notes_collection.find({"username": current_user}).to_list(length=None)
        # Convert ObjectId to string for JSON serialization
        for note in notes:
            note["_id"] = str(note["_id"])  # Convert ObjectId to string

        return jsonable_encoder(notes)
    except Exception as e:
        print(f"Error fetching notes: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Read a specific note
@app.get("/notes/{note_id}")
async def read_note(note_id: str, current_user: str = Depends(get_current_user)):
    note = await notes_collection.find_one({"_id": ObjectId(note_id), "username": current_user})
    if note:
        note["_id"] = str(note["_id"])
        return note
    else:
        raise HTTPException(status_code=404, detail="Note not found")

# Update note
@app.put("/notes/{note_id}")
async def update_note(note_id: str, note: NoteClass, current_user: str = Depends(get_current_user)):
    note_data = jsonable_encoder(note)
    result = await notes_collection.update_one({"_id": ObjectId(note_id), "username": current_user}, {"$set": note_data})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note updated successfully"}

# Delete note
@app.delete("/notes/{note_id}")
async def delete_note(note_id: str, current_user: str = Depends(get_current_user)):
    try:
        # Convert note_id to ObjectId for MongoDB query
        obj_id = ObjectId(note_id)
        
        # Check if the note exists for the current user
        result = await notes_collection.delete_one({"_id": obj_id, "username": current_user})
        
        if result.deleted_count == 1:
            return {"message": "Note deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Note not found")
    except Exception as e:
        print(f"Error deleting note: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)