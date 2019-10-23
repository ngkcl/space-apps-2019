#/bin/bash

jupyter notebook --config=./jupyter_notebook_config.py --allow-root &


if [[ -z $PORT ]]; then
  export PORT=80
fi

flask run --host 0.0.0.0 --port $PORT --reload
