#/bin/bash

jupyter notebook --config=./config.py &

flask run --host 0.0.0.0 --reload