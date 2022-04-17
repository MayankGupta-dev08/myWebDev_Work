# MongoDB Commands

## A. Database Commands

### 1. View all databases

```
show dbs
```

### 2. Create a new database 'DBName' & switch to it

```
use DBName
```

### 3. View current database

```
db
```

### 4. Delete current Database

```
db.dropDatabase()
```

---

---

<br>

## B. Collection Commands

### 1. Show Collections

```
show collections
```

### 2. Create a collection named 'students'

```
db.createCollection('students');
```

### 3. Drop the collection named 'students'

```
db.students.drop();
```

---

---

<br>

## C. Row/Document Commands
