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

### 1. show all rows in a collection named 'students'

```
db.students.find();
```

### 2. show all rows in a collection named 'students' in prettified format

```
db.students.find().pretty();
```

### 3. find the first row matching the object

```
db.students.findOne({name: 'Mayank'})
```

### 4. insert one row/document in a collection named 'students'

```
db.students.insert({
  'name':'Mayank',
  'language':"JavaScript",
  'member_since': 5
});
```

### 5. insert many row/document in a collection named 'students'

```
db.comments.insertMany([{
    'name': 'Harry',
    'lang': 'JavaScript',
    'member_since': 5
    },
    {'name': 'Rohan',
    'lang': 'Python',
    'member_since': 3
    },
    {'name': 'Lovish',
    'lang': 'Java',
    'member_since': 4
}]);
```

### 6. Search in mongoDb database

```
db.students.find(language: 'Python');
```

### 7. Limit the number of rows in output

```
db.students.find().limit(2);
```

### 8. Count the number of rows in the output

```
db.students.find().count();
```

### 9. Sort the number of rows in the output on the basis of something like member_since:1 in asc order

```
db.students.find().sort({'member_since' : 1});
```

### 10. Sort the number of rows in the output on the basis of something like member_since:1 in desc order

```
db.students.find().sort({'member_since' : -1});
```

Updating a row

```
db.students.update({name: 'Shubham'},
{'name': 'Harry',
    'lang': 'JavaScript',
    'member_since': 51
})
```

or

```
db.students.update({name: 'Shubham'},
{'name': 'Harry',
    'lang': 'JavaScript',
    'member_since': 51
}, {upsert: true})
```
