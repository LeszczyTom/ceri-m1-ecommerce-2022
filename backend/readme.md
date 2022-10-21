# Backend

Made with love by [EL HAJOUI Mohamed](https://github.com/MohamedEHJ)

## :wrench: Setup 

#### Create virtual environment
```bash
# On Windows
python -m venv your_venv_folder_name

# Activate your environment
.\your_venv_folder_name\Scripts\activate
```

```bash
# On Linux
python3 -m venv your_venv_folder_name

# Activate your environment
source your_venv_folder_name/bin/activate
```

#### Install packages using ``pip``
```bash
pip install -r requirements.txt
```

## :closed_lock_with_key: .env configuration 
```dockerfile
DB_USER='root'
DB_PWD='YOUR_PWD'
DB_HOSTNAME='localhost'
DB_PORT=3306
DB_SCHEMA='mydb'

```

## :rocket: Start 

``` bash
# On Windows 
PS C:\...\ceri-m1-ecommerce-2022\backend >> python -m uvicorn main:app --reload 
```

``` bash
# On Linux 
mohamed@ubuntu:~/ceri-m1-ecommerce-2022\backend python -m uvicorn main:app --reload
```




## Dependencies

- [FastAPI](https://github.com/tiangolo/fastapi)
- [SQLModel](https://github.com/tiangolo/sqlmodel)
- [Uvicorn](https://github.com/encode/uvicorn)
- [pytest](https://github.com/pytest-dev/pytest)
- [black](https://github.com/psf/black)
- [isort](https://github.com/PyCQA/isort)
- [mypy](https://github.com/python/mypy)
- [mysqlclient](https://github.com/PyMySQL/mysqlclient) (that also requires mysql installed)
- [Poetry Dotenv Plugin](https://github.com/mpeteuil/poetry-dotenv-plugin)
