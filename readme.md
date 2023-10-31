# RENT A CAR API

### ERD:

![ERD](./erdRentCarAPI.png)

### Installation:

```sh
    $ mkdir logs
    $ cp .env-sample .env
    $ npm i
```

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    readme.md
    src/
        config/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            car.js
            reservation.js
            user.js
        helpers/
            passwordEncrypt.js
            setToken.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
        models/
            car.js
            reservation.js
            user.js
        routes/
            auth.js
            car.js
            document.js
            index.js
            reservation.js
            user.js
```
